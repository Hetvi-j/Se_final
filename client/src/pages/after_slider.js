import React from 'react';
import "./HeroSection.css";
import one from "../assets/1.png";
import two from "../assets/2.png";
import three from "../assets/3.png";

const HeroSection = () => {
    return (
        <div className='heroSecMainParent'>
            <p className='text-4xl mt-20 text-center welcomStore'>
                WELCOME TO OUR STORE
            </p>
            <br />
            <br />

            <p className='heroDescription relative text-xl flex flex-wrap'>
                The fashion brand redefining trends. Premium fabrics, crafted to make you feel confident in your own style.
            </p>

            <div className='heroPicHold flex'>
                <div className='heroPicWithText'>
                    <img src={one} className="heroImage" id="imageOne" alt="Product One" />
                    <p className="heroImageText" id="text1">Powered by Fashion</p>
                </div>
                <div className='heroPicWithText'>
                    <img src={two} className="heroImage" alt="Product Two" />
                    <p className="heroImageText">Exceptional Quality</p>
                </div>
                <div className='heroPicWithText'>
                    <img src={three} className="heroImage" alt="Product Three" />
                    <p className="heroImageText">Crafted with Precision</p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
