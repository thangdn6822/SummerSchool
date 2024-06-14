"use client";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Image from "next/image";
import image1 from "@/assets/images/nam.png";
import image2 from "@/assets/images/coso.png";
import image3 from "@/assets/images/tienbo.png";
import image4 from "@/assets/images/phuhuynh.png";
import stroke from "@/assets/icons/stroke-at-home.png";
const AboutUs = () => {
  useEffect(() => {
    AOS.init({});
  }, []);
  return (
    <div className="about-container bg-[#f4f4f4] mb-12 mt-[150px]">
      <div className="wrapper-about-us container mx-auto">
        <div className="wrapper-about-us-text lg:relative h-[473px] bg-[#f4f4f4] px-4 lg:px-0">
          <div className="about-us-custom w-full lg:w-[345px] my-auto mx-auto">
            <h1 data-aos="fade-right" data-aos-duration="1000" className="mt-[35px] lg:mt-[0px] mb-[23px] lg:mb-4 text-[#161D25] text-[26px] lg:text-[36px] text-center lg:text-left font-semibold aos-init">
                    VỀ CHÚNG TÔI
            </h1>
            <span data-aos="fade-right" data-aos-duration="1500" className="block text-center tracking-widest lg:text-left text-[#161D25] text-[16px] font-medium aos-init">
            Chúng tôi cam kết mang đến cho học sinh, sinh viên và người đi làm những thông tin đầy đủ, chính xác và cập nhật về các hoạt động và khóa học mùa hè tại CodeCamp của Trường Đại Học Công Nghệ. Chúng tôi tin rằng việc thông tin rõ ràng và kịp thời sẽ giúp người học chuẩn bị tốt hơn và tận hưởng trải nghiệm học tập mùa hè một cách trọn vẹn.
            </span>
            <Image src={stroke} alt="TLDExpress - Giao hàng Chuyển phát nhanh" className="mt-16 hidden lg:block"/>
          </div>
          <div className="bg-white lg:block hidden"></div>
        </div>
      </div>
      <div className="wrapper-about-us-items lg:mt-0 mt-8 px-[50px] gap-[40px] bg-white">
        <div data-aos="fade-left" data-aos-duration="500" className="flex flex-col items-center lg:items-start justify-center mt-[41px] lg:mt-0 aos-init aos-animate">
                <Image className="mb-6" src={image1} alt="TLDExpress - Giao hàng Chuyển phát nhanh" />
                <h5 className="text-[16px] mb-1 font-semibold">
                    PHÁT TRIỂN
                </h5>
                <span className="text-center text-[14px] font-[350] lg:text-left">Giúp người học có kỹ năng chuyên sâu hơn</span>
          </div>
          <div data-aos="fade-left" data-aos-duration="1000" className="flex flex-col items-center lg:items-start justify-center aos-init aos-animate" >
                <Image className="mb-6" src={image2} alt="TLDExpress - 1000xe" />
                <h5 className="text-[16px] mb-1 font-semibold">
                    CƠ SỞ VẬT CHẤT
                </h5>
                <span className="text-center text-[14px] font-[350] lg:text-left">Đa dạng về cơ sở và chỗ học tập cho người học</span>
          </div>
          <div data-aos="fade-left" data-aos-duration="500" className="flex flex-col items-center lg:items-start justify-center aos-init aos-animate" >
                <Image className="mb-6" src={image3} alt="TLDExpress - Giao hàng Chuyển phát nhanh" />
                <h5 className="text-[16px] mb-1 font-semibold">
                    MỤC TIÊU ĐẦU RA
                </h5>
                <span className="text-center text-[14px] font-[350] lg:text-left">
                    Người học có định hướng rõ ràng &amp; chuyên môn
                </span>
          </div>
          <div data-aos="fade-left" data-aos-duration="1000" className="flex flex-col items-center lg:items-start justify-center aos-init aos-animate">
                <Image className="mb-6" src={image4} alt="TLDExpress - Giao hàng Chuyển phát nhanh" />
                <h5 className="text-[16px] mb-1 font-semibold">
                    SỰ TIN TƯỞNG
                </h5>
                <span className="text-center text-[14px] font-[350] lg:text-left">
                    Sự tin tưởng &amp; đồng hành của người học
                </span>
          </div>
      </div>
    </div>
  );
};

export default AboutUs;
