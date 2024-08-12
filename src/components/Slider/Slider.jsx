import React from "react";
import { Carousel } from "@material-tailwind/react";
import slider1 from "../../assets/slider-1.jpg";
import slider2 from "../../assets/slider-2.jpg";
import slider3 from "../../assets/slider-3.jpg";
export default function Slider() {
  return (
    <Carousel className=" w-full mx-auto h-full slider overflow-hidden" loop={true} autoplay={true} navigation={false} prevArrow={false} nextArrow={false} autoplayDelay={10000} >
      <img loading="lazy" src={slider1} alt="image 1" className=" bg-contain " />
      <img loading="lazy" src={slider2} alt="image 2" className=" bg-contain  " />
      <img loading="lazy" src={slider3} alt="image 3" className=" bg-contain  " />
    </Carousel>
  );
}
