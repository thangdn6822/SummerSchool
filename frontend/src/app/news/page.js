
import React from 'react'
import Navbar from '@/components/header/Navbar'
import Footer from '@/components/footer/Footer'
import Image from 'next/image'
import banner from '@/assets/images/banner.png'
import NewsPopular from '@/components/main/NewsPopular'
const page = () => {
  return (
    <div className="news-container">
        <Navbar />
        <div className="news-wrapper">
        <div className="banner-container max-w-[1200px] px-[1rem] mx-auto">
          <div className="banner-wrapper">
            <div className="content">
              <div className="img relative overflow-hidden max-w-full h-[500px] mt-[7rem] mx-auto">
                <Image
                  src={banner}
                  alt="CodeCamp - By Như Thắng"
                  fill
                  className="object-cover h-full w-full rounded-[32px] bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_81.44%)]"
                />
                <div className="absolute w-full h-full bg-[linear-gradient(360deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_81.44%)] rounded-[32px]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="trainning-title mt-[60px]">
            <h5 className='text-[#002157] text-center text-[26px] lg:text-[34px] font-semibold mb-8 pl-4 lg:pl-0'>Tin tức</h5>
        </div>
        <NewsPopular />
        </div>
        <Footer />
    </div>
  )
}

export default page