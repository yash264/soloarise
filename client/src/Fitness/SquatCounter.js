import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SquatCounter = ({ exercise }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseLandmarker, setPoseLandmarker] = useState(null);
  const navigate = useNavigate();

  const exerciseValue = parseFloat(exercise.done);
  const squatCountRef = useRef(exerciseValue);
  const squatStageRef = useRef("up");
  const lastVideoTime = useRef(-1);
  const [squatCountDisplay, setSquatCountDisplay] = useState(0);

  const rightHip = 24;
  const rightKnee = 26;

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

          const hipY = landmarks[rightHip].y;
          const kneeY = landmarks[rightKnee].y;

          const isSquatting = hipY > kneeY + 0.02;

          if (isSquatting && squatStageRef.current === "up") {
            console.log("up");
            squatStageRef.current = "down";
          }

          if (!isSquatting && squatStageRef.current === "down") {
            console.log("down");
            squatStageRef.current = "up";
            squatCountRef.current += 1;
            setSquatCountDisplay(squatCountRef.current); // Update display count
          }

          ctx.font = "30px Arial";
          ctx.fillStyle = "blue";
          ctx.fillText(`Squats: ${squatCountRef.current}`, 10, 40);
        }
      });

      requestAnimationFrame(detectFrame);
    };

    detectFrame();
  };

  const handleStop = () => {

    exercise.done = squatCountRef.current;

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
    <div style={{ position: "relative", width: 640, height: 480 }}>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <div style={{ marginTop: 10, fontSize: 24 }}>Total Squats: {squatCountDisplay}</div>
      <button
        onClick={handleStop}
        className="mt-6 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold shadow-md"
      >
        Stop
      </button>
    </div>
  );
};

export default SquatCounter;


