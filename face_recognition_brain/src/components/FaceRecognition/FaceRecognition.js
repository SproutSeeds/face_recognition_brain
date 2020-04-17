import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img alt="picture" src={imageUrl} width="500px" height="auto"></img>
      </div>
    </div>
  );
};

export default FaceRecognition;
