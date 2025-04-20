import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PushupCounter = ({ exercise }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseLandmarker, setPoseLandmarker] = useState(null);
  const exerciseValue = parseFloat(exercise.done);
  const pushupCount = useRef(exerciseValue);
  const form = useRef(0);
  const feedback = useRef("Fix Form");
  const lastVideoTime = useRef(-1);
  const direction = useRef(0);
  const [mode, setMode] = useState("webcam");
  const navigate = useNavigate();

  const calculateAngle = (a, b, c) => {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) -
      Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
  };

  const interp = (x, rangeIn, rangeOut) => {
    const [xMin, xMax] = rangeIn;
    const [yMin, yMax] = rangeOut;
    if (x <= xMin) return yMin;
    if (x >= xMax) return yMax;
    return yMin + ((x - xMin) * (yMax - yMin)) / (xMax - xMin);
  }

  useEffect(() => {
    const loadPoseLandmarker = async () => {
      const vision = await window.FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const landmarker = await window.PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });
      setPoseLandmarker(landmarker);
    };
    loadPoseLandmarker();
  }, [mode]);

  useEffect(() => {
    if (poseLandmarker) {
      if (mode === "webcam") {
        startWebcam();
      } else if (mode === "video") {
        setupVideoPrediction();
      }
    }
  }, [poseLandmarker, mode]);

  const resetState = () => {
    pushupCount.current = 0;
    direction.current = 0;
    form.current = 0;
    feedback.current = "Fix Form";
  };

  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = videoRef.current;
    video.srcObject = stream;
    video.onloadeddata = () => {
      video.play();
      predictWebcam(video);
    };
  };

  const setupVideoPrediction = () => {
    const video = videoRef.current;
    video.onloadeddata = () => {
      video.play();
      predictWebcam(video);
    };
  };

  const predictWebcam = (video) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const drawingUtils = new window.DrawingUtils(ctx);

    const detectFrame = () => {
      if (lastVideoTime.current !== video.currentTime) {
        lastVideoTime.current = video.currentTime;

        const now = performance.now();
        poseLandmarker.detectForVideo(video, now, (result) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          for (const landmarks of result.landmarks) {
            drawingUtils.drawLandmarks(landmarks);
            drawingUtils.drawConnectors(
              landmarks,
              window.PoseLandmarker.POSE_CONNECTIONS
            );

            const leftShoulder = landmarks[11];
            const rightShoulder = landmarks[12];
            const leftElbow = landmarks[13];
            const leftWrist = landmarks[15];
            const leftHip = landmarks[23];
            const leftKnee = landmarks[25];

            const shoulderWidth = Math.abs(leftShoulder.z - rightShoulder.z);
            const elbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
            const shoulderAngle = calculateAngle(leftElbow, leftShoulder, leftHip);
            const hipAngle = calculateAngle(leftShoulder, leftHip, leftKnee);

            const per = interp(elbowAngle, [90, 160], [0, 100]);
            const bar = interp(elbowAngle, [90, 160], [380, 50]);

            if (elbowAngle > 160 && shoulderAngle > 40 && hipAngle > 160 && shoulderWidth > 0.15) {
              form.current = 1;
            }

            if (form.current === 1) {
              if (per <= 0) {
                if (elbowAngle <= 90 && hipAngle > 160 && shoulderWidth > 0.15) {
                  feedback.current = "Up";

                  if (direction.current === 0) {
                    pushupCount.current += 0.5;
                    direction.current = 1;
                  }
                } else {
                  feedback.current = "Fix Form";
                }
              }

              if (per >= 100) {
                if (elbowAngle > 160 && shoulderAngle > 40 && hipAngle > 160 && shoulderWidth > 0.15) {
                  feedback.current = "Down";

                  if (direction.current === 1 && shoulderWidth > 0.15) {
                    pushupCount.current += 0.5;
                    direction.current = 0;
                  }
                } else {
                  feedback.current = "Fix Form";
                }
              }
            }

            // Set font styles
            ctx.font = "bold 28px 'Helvetica Neue', sans-serif";
            ctx.textBaseline = "top";

            // Shadow for better visibility on video background
            ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
            ctx.shadowBlur = 4;

            // Push-up Count
            ctx.fillStyle = "#faff00";
            ctx.fillText(`Push-ups: ${pushupCount.current}`, 24, 24);

            // Feedback
            ctx.fillStyle = "#ff6f61";
            ctx.fillText(`Feedback: ${feedback.current}`, 24, 64);

            if (form.current === 1) {
              ctx.strokeStyle = "green";
              ctx.lineWidth = 3;
              ctx.strokeRect(580, 50, 20, 330);
              ctx.fillStyle = "green";
              ctx.fillRect(580, bar, 20, 380 - bar);
              ctx.fillStyle = "blue";
              ctx.font = "20px Arial";
              ctx.fillText(`${Math.round(per)}%`, 560, 430);
            }
          }
        });
      }

      requestAnimationFrame(detectFrame);
    };

    detectFrame();
  };

  const handleStop = () => {

      exercise.done = pushupCount.current;

      const updateQuest = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.patch(
              "http://localhost:4000/api/quest",
              { exercise },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
           );
           console.log(response.data);
            
           //navigate("/hunter");
        } catch (err) {
            console.log(err);
        }
    };

    updateQuest();
  }


  return (
    <div className="flex mt-12 justify-center items-center w-full py-8 px-4">
      <div className="relative w-full max-w-[640px] aspect-video">
        {(mode === "webcam" || mode === "video") && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-2xl shadow-xl border-2 border-cyan-300 bg-black"
            muted
            playsInline
            controls={mode === "video"}
          />
        )}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <button
        onClick={handleStop}
        className="mt-6 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold shadow-md"
      >
        Stop
      </button>
    </div>
  );
};

export default PushupCounter;
