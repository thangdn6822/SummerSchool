"use client"
import React from "react";
import logo from "@/assets/icons/logo.png";
import { useState } from "react";
import Image from "next/image";
import Register from "../Register";
import {
  FaSquareFacebook,
  FaSquareTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { AiFillMail } from "react-icons/ai";
export default function Footer() {
//   const t = useTranslations("Footer");

  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  }

  const handleForm = () => {
    setIsRegisterOpen(false)
  }

  return (
  
      <footer className="">
        <div className="footer bg-[#f5f5f5] border-t-[2px]">
          <div className="menu w-[100%] lg:flex shink items-start justify-around gap-4 pt-6 px-6">
            <div className="left-footer h-[252px] w-auto">
              <div className="mb-[12px] flex items-center gap-2">
              <Image
                src={logo}
                alt="CodeCamp - By Như Thắng"
                className="logo-img h-[80px] w-[80px] object-contain rounded-[16px]"
              />
              <h2 className="text-[18px] text-[#2c31cf] font-[650]">
                CODECAMP - UET
              </h2>
              </div>
              <div class="text-sm my-[10px] max-w-[368px]">CodeCamp của Trường đại học Công Nghệ - Đại Học quốc gia Hà Nội cung cấp các khóa học đa dạng, từ các môn học cơ bản đến các chuyên ngành nâng cao, phù hợp với nhiều đối tượng sinh viên và người có nhu cầu học khác nhau.</div>
              <ul className="sci mt-[20px] flex gap-[20px]">
                <li>
                  <a href="#123">
                    <FaSquareFacebook className="bg-[#37599e] text-white w-[32px] h-[32px]"></FaSquareFacebook>
                  </a>
                </li>
                <li>
                  <a href="#456">
                    <FaSquareTwitter className="bg-[#00a2f9] text-white w-[32px] h-[32px]"></FaSquareTwitter>
                  </a>
                </li>
                <li>
                  <a href="#789">
                    <FaSquareInstagram className="bg-[#bf1c8f] text-white w-[32px] h-[32px]"></FaSquareInstagram>
                  </a>
                </li>
                <li>
                  <a href="#7289">
                    <AiFillTikTok className="bg-[#333] text-white w-[32px] h-[32px]"></AiFillTikTok>
                  </a>
                </li>
              </ul>
            </div>
            <div className="box link lg:mt-0 mt-10">
              <h3 className="box-link-title">Về CodeCamp</h3>
              <ul>
                <li>
                  <a href="/" className="link-tab">
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="/register" className="link-tab">
                    Đăng ký môn học
                  </a>
                </li>
                <li>
                  <a href="/hotro" className="link-tab">
                    Hỗ trợ/FAQ
                  </a>
                </li>
                <li>
                  <a href="/tuyendung" className="link-tab">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="/" className="link-tab">
                    Lịch học và sự kiện
                  </a>
                </li>
              </ul>
            </div>
            <div className="box link">
              <h3 className="box-link-title">Điều khoản sử dụng</h3>
              <ul>
                <li>
                  <a href="#" className="link-tab">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" className="link-tab">
                    Hướng dẫn đăng ký
                  </a>
                </li>
                <li>
                  <a href="#" className="link-tab">
                    Hướng dẫn thanh toán
                  </a>
                </li>
                <li>
                  <a href="#" className="link-tab">
                    Hướng dẫn người học
                  </a>
                </li>
                <li>
                  <a href="#" className="link-tab">
                    Quy định sử dụng
                  </a>
                </li>
              </ul>
            </div>
            <div className="box contact">
              <h3 className="box-link-title">Địa chỉ và Thông tin liên hệ</h3>
              <ul className="info">
                <li>
                  <div className="info-detail">
                    <span>
                      <FaMapMarkerAlt className="icon"></FaMapMarkerAlt>
                    </span>
                    <span className="link-tab">
                        <span className="font-semibold text-[16px]">Địa chỉ: </span>
                      144 Xuân Thủy, Cầu Giấy
                      , Hà Nội
                    </span>
                  </div>
                </li>
                <li>
                  <div className="info-detail">
                    <span>
                      <FaPhoneAlt className="icon"></FaPhoneAlt>
                    </span>
                    <p>
                      <a href="/0385257118" className="link-tab">
                      <span className="font-semibold text-[16px]">Điện thoại: </span>
                        038-525-7118
                      </a>
                    </p>
                  </div>
                </li>
                <li>
                  <div className="info-detail">
                    <span>
                      <AiFillMail className="icon mt-1"></AiFillMail>
                    </span>
                    <p>
                      <a href="/mailto" className="link-tab">
                      <span className="font-semibold text-[16px]">Email: </span>
                        thangnt@vnu.edu.vn
                      </a>
                    </p>
                  </div>
                </li>
                <li>
                  <div className="">
                    <button className="px-[25px] py-[10px] bg-[#4d96ff] text-white font-semibold rounded-[5px]" onClick={handleRegisterClick}>Đăng ký</button>
                    {isRegisterOpen && <Register closeForm={handleForm}/>}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="border w-[60%] lg:w-[700px] h-[2px] bg-[#1c1d31] mx-auto mt-[22px] mb-[10px]"></div> */}
          <div className="legal w-full py-[10px] px-0 text-white text-center text-[14px] bg-[#1c1d31] mt-[28px]">
            <p>
              Copyright ©2024 TLD Express | All rights reserved.{" "}
              <i className="fa fa-heart"></i> by Như Thắng
            </p>
          </div>
        </div>
      </footer>
    
  );
}
