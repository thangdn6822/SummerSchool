'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import partner1 from '@/assets/images/partner1.png'
import partner2 from '@/assets/images/partner2.png'
import partner3 from '@/assets/images/partner3.png'
import partner4 from '@/assets/images/partner4.png'
import partner5 from '@/assets/images/partner5.jpg'
import partner6 from '@/assets/images/partner6.jpg'
import partner7 from '@/assets/images/partner7.png'
import partner8 from '@/assets/images/partner8.png'


const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true
          }
        },
      ]
  };


const images = [
    {
        url: partner1
    },
    {
        url: partner2
    },
    {
        url: partner3
    },
    {
        url: partner4
    },
    {
        url: partner5
    },
    {
        url: partner6
    },
    {
        url: partner7
    },
    {
        url: partner8
    }
   
]
const MyPartner = () => {
  return (
    <div className="my-partner-container container overflow-hidden w-[70%] mx-auto mb-10 mt-20 px-4">
        <div className="wrapper-people-says-title">
            <h5 className='text-[#002157] text-center text-[24px] lg:text-[30px] font-semibold mb-8 pl-4 lg:pl-0'>Đối tác</h5>
        </div>
       <div className="wrapper-content">
       <Slider {...settings}>
                {images.map((image, index) => {
                    return (
                        <div key={index} className=''>
                            <Image  src={image.url} alt='CodeCamp - By Như Thắng' className='object-scale-down w-[120px] h-[100px] md:w-[220px] md:h-[100px]'/>
                        </div>
                    )
                })}
        </Slider>
       </div>
    </div>
  )
}

export default MyPartner