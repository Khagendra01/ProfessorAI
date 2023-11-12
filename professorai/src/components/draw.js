import React, { useRef, useState, useEffect } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const startDrawing = (e) => {
      setIsDrawing(true);
      draw(e);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
      context.beginPath();
    };

    const draw = (e) => {
      if (!isDrawing) return;

      context.lineWidth = 2;
      context.lineCap = "round";
      context.strokeStyle = "#000";

      context.lineTo(
        e.clientX - canvas.offsetLeft,
        e.clientY - canvas.offsetTop
      );
      context.stroke();
      context.beginPath();
      context.moveTo(
        e.clientX - canvas.offsetLeft,
        e.clientY - canvas.offsetTop
      );
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [isDrawing]);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL(); // Get the image data URL
    console.log(dataURL); // You can send this dataURL to your server or use it as needed
  };

  const [height, setheight] = useState(400);

  return (
    <>
      <button className="note-submit" onClick={captureImage}>
        capture
      </button>
      <canvas
        ref={canvasRef}
        width={800}
        height={height}
        style={{ border: "1px solid #000" }}
      ></canvas>
      <button
        onClick={() => {
          setheight(height + 200);
        }}
      >
        Add +
      </button>
    </>
  );
};

export default DrawingCanvas;
