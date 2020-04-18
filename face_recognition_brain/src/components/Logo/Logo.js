import React from "react";
import Tilt from "react-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma5 mat2 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{
          max: 60,
          reverse: false,
          speed: 2000,
          scale: 1.2,
          transition: true,
          easing: "cubic-bezier(.03,.98,.52,.99)",
        }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: "5px" }} src={brain} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
