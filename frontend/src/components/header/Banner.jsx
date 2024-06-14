"use client"
import React, { useState } from 'react'
import Image from 'next/image'
// import banner from '@/assets/images/header.jpg'
import banner from '@/assets/images/banner.png'
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Button, Spinner } from 'flowbite-react'
import { AiOutlineSearch } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { fetchStudentsAPI } from '@/apis';
import { IoIosWarning } from "react-icons/io";
import { TextInput } from 'flowbite-react';
const Banner = () => {
    const [studentId, setStudentId] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [resultSearch, setResultSearch] = useState([])
    const [error, setError] = useState("")

    const valideInput = () => {
        const validationError = {}
        if (!studentId.trim()) {
            validationError.studentId = "Vui lòng nhập mã đăng ký!"
        }
        setError(validationError)
        return Object.keys(validationError).length === 0;
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!valideInput()) {
            return;
        }
        setIsOpen(true)
        try {
            const dataStudent = await fetchStudentsAPI(studentId)
            setResultSearch(dataStudent)
        }
        catch (error) {
            console.log(error)
            
        }
    }

  return (
    <div className="banner-container max-w-[1200px] px-[1rem] mx-auto">
        <div className="banner-wrapper">
            <div className="content">
                <div className="img relative overflow-hidden max-w-full h-[500px] mt-[7rem] mx-auto">
                    <Image src={banner} alt='CodeCamp - By Như Thắng' fill className='object-cover h-full w-full rounded-[32px] bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_81.44%)]'/>
                    <div className='absolute w-full h-full bg-[linear-gradient(360deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_81.44%)] rounded-[32px]'></div>
                </div>
            </div>
        </div>
        <div className="search-wrapper absolute w-[68%] bottom-[20px] left-2/4 translate-x-[-50%] flex items-center gap-4 px-8 py-10 bg-white backdrop-blur-md rounded-[32px]" style={{boxShadow: "5px 5px 30px rgba(0, 0, 0, 0.2)"}}>
                <div className="flex-col w-full mx-2">
                <div className="form-group flex flex-col lg:flex-row items-center justify-between w-full">
                        <div className={`form-input flex items-center border px-4  w-full lg:mr-4 rounded-[8px] ${error.studentId ? "bg-[#ff00001a] border-[#f33a58] items-center" : "bg-[#e8e8e8] border-[#b2b2b2]"}`}>
                            <HiOutlineMagnifyingGlass className="icon" />
                            <input
                                type="text"
                                id='search'
                                name='search'
                                placeholder='Nhập mã đăng ký của bạn để tra cứu thông tin'
                                className="custom-input bg-transparent ml-2 w-full h-[48px] border-none text-[14px]"
                                onChange={(e) => setStudentId(e.target.value)}
                            />
                            <span>{error.studentId ? <IoIosWarning className='warning-icon text-[24px] text-[#ff0000] mr-4'/> : ""}</span>
                            {/* <label htmlFor="seacrh" className='absolute top-2/4 left-[100px] translate-y-[-50%] text-[16px]
                            font-[400] text-gray-500 transition-all pb-1'>Nhập mã đăng ký của bạn để tra cứu thông tin</label> */}
                        </div>
                    <div className="btn flex flex-row items-center lg:w-[180px] w-full lg:mt-0 mt-4">
                    <button className="btn-search lg:w-[180px] w-full mr-0 lg:mr-2 bg-[#4d96ff] h-[48px] rounded-[5px] text-white font-semibold text-[16px]" onClick={handleSearch}>
                        Tra cứu
                    </button>
                    </div>
                </div>
                {error.studentId && <span className='text-[#f33a58] text-[14px] font-medium mt-2 ml-2'>{error.studentId}</span>}
                </div>
                
        </div>
        {isOpen && (resultSearch ? (
        <div className="result-student mt-[100px] w-[90%] mx-auto border border-[#f2f2f2] rounded-t-[8px] ">
        <div className="border-l-2 border-transparent ">
          <div className="result-shipment-header bg-[#fff2f4] py-2 pl-4 rounded-t-[8px]">
            <p className="text-[22px] text-[#444] font-bold">Mã đăng ký: 【<span className="text-[#1F8DDC]">{studentId}</span>】</p>
          </div>
          <div className="result-shipment-content">
             <div className="result-shipment-item border-b-[1px] border-[#f2f2f2] flex flex-col lg:flex-row lg:items-center p-4">
              <div className="flex flex-col min-w-[180px]">
                <div className="flex items-center">
                    <span className="text-[16px] text-[#ff0000] ml-2 font-bold">Tên của bạn:</span>
                </div>
              </div>
              <div>
                  {resultSearch.studentName} Nguyễn Thùy Dương
              </div>
             </div>
             <div className="result-shipment-item border-b-[1px] border-[#f2f2f2] flex flex-col lg:flex-row lg:items-center p-4">
              <div className="flex flex-col min-w-[180px]">
                <div className="flex items-center">
                    <span className="text-[16px] text-[#ff0000] ml-2 font-bold">Số điện thoại:</span>
                </div>
              </div>
              <div>
                  {resultSearch.studentPhone} 0942988256
              </div>
             </div>
             <div className="result-shipment-item border-b-[1px] border-[#f2f2f2] flex flex-col lg:flex-row lg:items-center p-4">
              <div className="flex flex-col min-w-[180px]">
                <div className="flex items-center">
                    <span className="text-[16px] text-[#ff0000] ml-2 font-bold">Nơi làm việc:</span>
                </div>
              </div>
              <div>
                  {resultSearch.studentWorkplace} Công Ty TNHH Thắng Dương
              </div>
             </div>
             <div className="result-shipment-item border-b-[1px] border-[#f2f2f2] flex flex-col lg:flex-row lg:items-center p-4">
              <div className="flex flex-col min-w-[180px]">
                <div className="flex items-center">
                    <span className="text-[16px] text-[#ff0000] ml-2 font-bold">Đối tượng:</span>
                </div>
              </div>
              <div>
                  {resultSearch.studentObject} Người đi làm
              </div>
            </div>
            {/* <div className="result-shipment-item border-b-[1px] border-[#f2f2f2] flex flex-col lg:flex-row lg:items-center p-4">
              <div className="flex flex-col min-w-[180px]">
                <div className="flex items-center">
                    <span className="text-[16px] text-[#ff0000] ml-2 font-bold">Đối tượng:</span>
                </div>
              </div>
              <div>
                  {resultSearch.studentObject} Người đi làm
              </div>
            </div> */}
            <div className="result-shipment-item border-b-[1px] border-[#f2f2f2] flex flex-col lg:flex-row lg:items-center p-4">
              <div className="flex flex-col min-w-[180px]">
                <div className="flex items-center">
                    <span className="text-[16px] text-[#ff0000] ml-2 font-bold">Mức độ hiểu biết:</span>
                </div>
              </div>
              <div>
                  {resultSearch.studentLevel} Chưa biết gì
              </div>
            </div>
            <div className="result-shipment-item border-b-[1px] border-[#f2f2f2] flex flex-col lg:flex-row lg:items-center p-4">
              <div className="flex flex-col min-w-[180px]">
                <div className="flex items-center">
                    <span className="text-[16px] text-[#ff0000] ml-2 font-bold">Mục tiêu đầu ra:</span>
                </div>
              </div>
              <div>
                  {resultSearch.studentOutput} Cố gắng được thành tích để giúp được trong công việc
              </div>
            </div>
          
        </div>
      </div>
      </div>
      ) : (
        <div className="result-shipment mt-14 border border-[#f2f2f2]">
          <div className="border-l-2 border-transparent">
            <div className="result-shipment-header bg-[#f9f9f9] py-2 pl-4">
              <p className="text-[28px] text-[#444] font-bold">Mã vận đơn: <span>{studentId}</span></p>
            </div>
          <div className="result-shipment-content">
             <div className="result-shipment-item border-b-[1px] border-[#f2f2f2] flex flex-col lg:flex-row lg:items-center p-4">
                  <div className="flex flex-row">
                    <div className="w-[28px] h-[28px] rounded-full bg-[#f2f2f2] flex items-center justify-center mr-2">
                      <AiOutlineSearch className="text-black"/>
                    </div>
                    <div>
                      <p className="text-[#ff0000] font-medium">Không tìm thấy dữ liệu về vận đơn!</p>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        </div>
      )
    )
    }
    </div>
  )
}

export default Banner