import React from "react";
import sampleGif from "./assets/Sample.gif"; 
import "./logo.css";

const GifComponent = () => {
  return (
    <div class="gif-container">
      <img src={sampleGif} alt="Loading..." class="GifComponent" />
    </div>
  );
};

export default GifComponent;
