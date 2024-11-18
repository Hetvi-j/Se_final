import React, { useRef } from 'react';
import './slider.css';
import img1 from './assets/1.png';
import img2 from './assets/2.png';
import img3 from './assets/3.png';
import img4 from './assets/4.png';
import img5 from './assets/5.png';

const Slider = () => {
  const marqueeRef = useRef(null);

  const handleMouseOver = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMouseOut = () => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = 'running';
    }
  };

  return (
    <div className="container">
     

      <div className="followOnInstaMarqueeContainer">
        <div
          id="marquee-container"
          className="marquee"
          ref={marqueeRef}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <a href="https://www.instagram.com/reel/Ck6akcopA_F/" target="_blank" rel="noopener noreferrer">
            <img src={img1} alt="Instagram Post 1" className="carouselImg" />
          </a>
          <a href="https://www.instagram.com/reel/Ck9DOsWLEdw/" target="_blank" rel="noopener noreferrer">
            <img src={img2} alt="Instagram Post 2" className="carouselImg" />
          </a>
          <a href="https://www.instagram.com/reel/Ck_u9AjOJFh/" target="_blank" rel="noopener noreferrer">
            <img src={img3} alt="Instagram Post 3" className="carouselImg" />
          </a>
          <a href="https://www.instagram.com/reel/CkgnyuWu_u7/" target="_blank" rel="noopener noreferrer">
            <img src={img4} alt="Instagram Post 4" className="carouselImg" />
          </a>
          <a href="https://www.instagram.com/p/CkeOeuMvliW/" target="_blank" rel="noopener noreferrer">
            <img src={img5} alt="Instagram Post 5" className="carouselImg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Slider;
