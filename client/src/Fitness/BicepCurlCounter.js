import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BicepCurlCounter = ({ exercise }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseLandmarker, setPoseLandmarker] = useState(null);
  const navigate = useNavigate();

  const exerciseValue = parseFloat(exercise.done);
  const [curlCount, setCurlCount] = useState(exerciseValue);
  const curlCountRef = useRef(exerciseValue);

  const [curlStage, setCurlStage] = useState("up");
  const curlStageRef = useRef("up");

  const lastVideoTime = useRef(-1);

  const shoulderIndex = 11; // Left shoulder
  const elbowIndex = 13; // Left elbow
  const wristIndex = 15; // Left wrist

  const minAngleThreshold = 40;
  const maxAngleThreshold = 170;

  useEffect(() => {
    const loadPoseLandmarker = async () => {
      const vision = await window.FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );

      const landmarker = await window.PoseLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numPoses: 1,
        }
      );

      setPoseLandmarker(landmarker);
    };

    loadPoseLandmarker();
  }, []);

  useEffect(() => {
    if (poseLandmarker) {
      startWebcam();
    }
  }, [poseLandmarker]);

  const startWebcam = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Webcam not supported");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadeddata = () => {
      video.play();
      predictWebcam();
    };
  };

  const calculateAngle = (p1, p2, p3) => {
    const angle =
      Math.atan2(p3.y - p2.y, p3.x - p2.x) -
      Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let deg = (angle * 180) / Math.PI;
    if (deg < 0) deg += 360;
    return deg > 180 ? 360 - deg : deg;
  };

  const predictWebcam = () => {
    const video = videoRef.current;
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

          if (!result.landmarks || result.landmarks.length === 0) return;

          const landmarks = result.landmarks[0];

          drawingUtils.drawLandmarks(landmarks);
          drawingUtils.drawConnectors(
            landmarks,
            window.PoseLandmarker.POSE_CONNECTIONS
          );

          const shoulder = landmarks[shoulderIndex];
          const elbow = landmarks[elbowIndex];
          const wrist = landmarks[wristIndex];

          if (shoulder && elbow && wrist) {
            const angle = calculateAngle(shoulder, elbow, wrist);

            // Count curls
            if (angle < minAngleThreshold && curlStageRef.current === "up") {
              curlStageRef.current = "down";
              console.log("Down")
              setCurlStage("down");
            }
            if (angle > maxAngleThreshold && curlStageRef.current === "down") {
              curlStageRef.current = "up";
              curlCountRef.current += 1;
              console.log("Up")
              setCurlStage("up");
              setCurlCount(curlCountRef.current);
            }

            // Draw angle near elbow
            const x = elbow.x * canvas.width;
            const y = elbow.y * canvas.height;

            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fill();

            ctx.font = "20px Arial";
            ctx.fillStyle = "blue";
            ctx.fillText(`Angle: ${angle.toFixed(1)}°`, x + 10, y - 10);
          }

          // Draw curl count
          ctx.font = "30px Arial";
          ctx.fillStyle = "red";
          ctx.fillText(`Biceps Curls: ${curlCountRef.current}`, 10, 40);
        });
      }

      requestAnimationFrame(detectFrame);
    };

    detectFrame();
  };

  const handleStop = () => {
    exercise.done = curlCountRef.current;

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
        playsInline
        muted
        autoPlay
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      <button
        onClick={handleStop}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold shadow-md"
      >
        Stop
      </button>
    </div>

  );
};

export default BicepCurlCounter;
