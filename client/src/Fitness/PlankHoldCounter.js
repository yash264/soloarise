import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlankHoldTimer = ({ exercise }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseLandmarker, setPoseLandmarker] = useState(null);
  const navigate = useNavigate();

  const exerciseValue = parseFloat(exercise.done);
  const plankTimeRef = useRef(exerciseValue);
  const lastUpdateTimeRef = useRef(null);
  const plankStartTimeRef = useRef(null);
  const [inPlank, setInPlank] = useState(false);

  const lastVideoTime = useRef(-1);

  const rightShoulder = 12;
  const rightElbow = 14;
  const rightHip = 24;
  const rightKnee = 26;
  const rightAnkle = 28;

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
  }, []);

  useEffect(() => {
    if (poseLandmarker) startWebcam();
  }, [poseLandmarker]);

  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadeddata = () => {
      video.play();
      predictWebcam();
    };
  };

  const getAngle = (a, b, c) => {
    const ab = { x: b.x - a.x, y: b.y - a.y };
    const cb = { x: b.x - c.x, y: b.y - c.y };
    const dot = ab.x * cb.x + ab.y * cb.y;
    const magAB = Math.sqrt(ab.x ** 2 + ab.y ** 2);
    const magCB = Math.sqrt(cb.x ** 2 + cb.y ** 2);
    const cosineAngle = dot / (magAB * magCB);
    return (Math.acos(cosineAngle) * 180) / Math.PI;
  };

  const predictWebcam = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const drawingUtils = new window.DrawingUtils(ctx);

    const detectFrame = () => {
      if (lastVideoTime.current === video.currentTime) {
        requestAnimationFrame(detectFrame);
        return;
      }

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

          const s = landmarks[rightShoulder];
          const e = landmarks[rightElbow];
          const h = landmarks[rightHip];
          const k = landmarks[rightKnee];
          const a = landmarks[rightAnkle];

          const shoulderHipDiff = Math.abs(s.y - h.y);

          const elbowAngle = getAngle(s, e, h); // Shoulder-Elbow-Hip
          const legAngle = getAngle(h, k, a);   // Hip-Knee-Ankle

          const isPlankForm =
            shoulderHipDiff < 0.30 &&         // torso flat
            elbowAngle > 50 && elbowAngle < 140 &&  // arms straight or bent
            legAngle > 150;                   // legs straight


          if (isPlankForm) {
            const now = Date.now();
            const elapsedSinceLastUpdate = now - lastUpdateTimeRef.current;

            if (elapsedSinceLastUpdate >= 1000) {
              plankTimeRef.current += 1;
              lastUpdateTimeRef.current = now;
            }
          } else {
            plankTimeRef.current = 0;
            setInPlank(false);
          }

          ctx.font = "30px Arial";
          ctx.fillStyle = inPlank ? "green" : "red";
          ctx.fillText(`Plank Time: ${plankTimeRef.current}s`, 10, 40);
        }
      });

      requestAnimationFrame(detectFrame);
    };

    detectFrame();
  };

  const handleStop = () => {

    exercise.done = plankTimeRef.current;

    const updateQuest = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.patch(
          "https://soloariseserver.onrender.com/api/quest",
          { exercise },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.message == "Complete your task") {
          alert("Please, Complete your task !!")
        }
        else if (response.data.message == "Quest updated successfully") {
          alert("Task Completed Successfully !!")
          navigate("/hunter");
        }

      } catch (err) {
        console.log(err);
      }
    };

    updateQuest();
  }

  return (
    <div className="relative w-full max-w-3xl aspect-video mx-auto">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      <button
        onClick={handleStop}
        className="mt-4 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold shadow-md block mx-auto"
      >
        Stop
      </button>
    </div>

  );
};

export default PlankHoldTimer;

