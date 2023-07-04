import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.scss'

export default function SimpleSlider() {
   const settings = {
      dots: true,
      fade: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed:2000,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
   };
   return (
      <div className="slider_wrap">
         <Slider {...settings}>
            <div>
               <h3>
                  <img className='pc' src="./images/Group 1.jpg" alt="pc" />
                  <img className='mobile' src="./images/banner_m3.jpg" alt="mobile" />
               </h3>
            </div>
            <div>
               <h3>
                  <img className='pc' src="./images/Group 2.jpg" alt="pc" />
                  <img className='mobile' src="./images/banner_m4.jpg" alt="mobile" />
               </h3>
            </div>
            <div>
               <h3>
                  <img className='pc' src="./images/Group 3.jpg" alt="pc" />
                  <img className='mobile' src="./images/banner_m5.jpg" alt="mobile" />
               </h3>
            </div>
            <div>
               <h3>
                  <img className='pc' src="./images/Group 4.jpg" alt="pc" />
                  <img className='mobile' src="./images/banner_m6.jpg" alt="mobile" />
               </h3>
            </div>
            <div>
               <h3>
                  <img className='pc' src="./images/Group 5.jpg" alt="pc" />
                  <img className='mobile' src="./images/banner_m7.jpg" alt="mobile" />
               </h3>
            </div>
            <div>
               <h3>               
                  <img className='pc' src="./images/Group 6.jpg" alt="pc" />
                  <img className='mobile' src="./images/banner_m8.jpg" alt="mobile" /></h3>
            </div>
         </Slider>
         <div className='absolute top-1/2 m-auto md:top-1/2 w-full text-center' >
            {/* <img className='w-3/1 m-auto' src="./images/wooyoungmi-logo.png" alt="" /> */}
            <p className='text-white'></p>
         </div>
      </div>
   );
}