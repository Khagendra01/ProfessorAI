import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { addNoteToSubject, getNote } from "../api/noteApi";

import { AuthContext } from "../App";

const DrawingCanvas = ({ noteValue, courseId, canvasValue }) => {
  const { user } = useContext(AuthContext);

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if(canvasValue != null){
      const image = new Image();
      image.src = canvasValue;
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    }

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
  }, [isDrawing, canvasValue]);

  const addANote = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL(); // Get the image data URL

    addNoteToSubject({
      userId: `${user.id}`,
      subjectId: `${courseId}`,
      noteValue: `${noteValue}`,
      noteCanvas: `${dataURL}`,
    })
      .then(() => {
        alert("note added")
        navigate("/noteMenu");
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };

  const [height, setheight] = useState(400);

  return (
    <div className="canvas-area">
      <button className="note-submit" onClick={addANote}>
        Add Note
      </button>
      <h2> Draw your note</h2>
      <canvas
        ref={canvasRef}
        width={800}
        height={height}
        style={{ border: "1px solid #000" }}
      ></canvas>
    <br></br>
      <button
        onClick={() => {
          setheight(height + 200);
        }}
      >
        +
      </button>
    </div>
  );
};

export default DrawingCanvas;
