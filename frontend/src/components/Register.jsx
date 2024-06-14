"use client"
import React, { useState } from 'react'
import axios from 'axios'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef } from 'react'
import { Modal, Spinner } from 'flowbite-react';
import Image from 'next/image'
import logo from '@/assets/icons/logo.png'
import success from '@/assets/icons/success.png'
import { BiChevronDown } from "react-icons/bi";
import { MdCancelPresentation } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { createNewStudentAPI } from '@/apis';

const Register = ({closeForm}) => {
    useEffect(() => {
        AOS.init({});
      }, []);
    const [isOccupationOpen, setOccupationOpen] = useState(false)
    const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false)
    const [selectedOccupation, setSelectedOccupation] = useState("Vui lòng chọn")
    const [selectedKnowledge, setSelectedKnowledge] = useState("Vui lòng chọn")
    const [info, setInfo] = useState(false)
    const [outForm, setOutForm] = useState(false)
    const [studentId, setStudentId] = useState("")
    const [fullname, setFullname] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [office, setOffice] = useState("")
    const [output, setOutput] = useState("")
    const [errors, setErrors] = useState({})
    const occupationList = [
        {id: 1, name: "Sinh viên"},
        {id: 2, name: "Học sinh"},
        {id: 3, name: "Người đi làm"}

    ]
    const knowledgeLevelList = [
        {id: 1, name: "Chưa biết gì"},
        {id: 2, name: "Tương đối hiểu biết"},
        {id: 3, name: "Hiểu biết"},
        {id: 4, name: "Chuyên gia"}

    ]
    const refForm = useRef()
    useEffect(() => {
        const handleClickOutForm = (e) => {
            if (refForm.current && !refForm.current.contains(e.target)) {
                closeForm();
                setOutForm(true)
            }
            
        }
        document.addEventListener("mousedown", handleClickOutForm)

        return () => {
            document.removeEventListener("mousedown", handleClickOutForm)
        }
    }, [closeForm])

    const handleClickInForm = (e) => {
        e.stopPropagation();
    }

    const handleCancelClick = () => {
        closeForm();
        setOutForm(true)
    }

    const valideForm = () => {
        const validationErrors = {}

        if (!fullname.trim()) {
            validationErrors.fullname = "Tên không được để trống"
        }
        const phonePattern = /^((\+84)|0)[1-9](\d{8,9})$/;
        if (!phonenumber.trim()) {
            validationErrors.phonenumber = "Số điện thoại không được để trống"
        } else if (!phonePattern.test(phonenumber)) {
            validationErrors.phonenumber = "Số điện thoại không hợp lệ"
        }

        if (!office.trim()) {
            validationErrors.office = "Trường/Công ty không được bỏ trống";
        }

        if (selectedOccupation === "Vui lòng chọn") {
            validationErrors.selectedOccupation = "Vui lòng chọn đối tượng"
        }
        if (selectedKnowledge === "Vui lòng chọn") {
            validationErrors.selectedKnowledge = "Vui lòng chọn mức độ hiểu biết"
        }
        if (!output.trim()) {
            validationErrors.output = "Mong muốn đầu ra không được bỏ trống"
        }

        setErrors(validationErrors)

        return Object.keys(validationErrors).length === 0;
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!valideForm()) {
            return;
        }
        setInfo(true);  
        try {
            const response = await axios.post('http://localhost:5000/v1/students', {
                studentName: fullname.trim(),
                studentPhone: phonenumber,
                studentWorkplace: office.trim(),
                studentObject: selectedOccupation,
                studentLevel: selectedKnowledge,
                studentOutput: output
            });

             setStudentId(response.data.studentId);
            
    
        } catch (error) {
        console.error('Error message:', error.message);
            
        }
    }
    console.log(studentId)


  return (
    <div className="register-container before:fixed before:top-0 before:left-0 before:w-full before:h-full before:bg-[#000] before:bg-opacity-40 before:z-10" ref={refForm} onClick={closeForm}>
        <div className="register-wrapper fixed lg:bottom-[20px] bottom-[80px] rounded-[1rem] flex left-2/4 translate-x-[-50%] bg-white overflow-hidden z-10" onClick={handleClickInForm} >
        <div  className="signin-background">       
        </div>
            <div  className={`register-content px-8 py-2 lg:w-[560px] lg:h-[660px] h-[560px] overflow-y-auto ${info ? "hidden" : "block"}`}>
                <div className='flex justify-end '>
                <button class="text-[#999] text-[30px]" onClick={handleCancelClick}><span>×</span></button>
                </div>
                <div className="register-header text-center max-w-[400px] mx-auto mt-5">
                    <span className=' flex justify-center'>
                    <a href="/" className=''>
                        <Image src={logo} alt='CodeCamp - By Như Thắng' className='w-[42px] h-[42px] object-cover rounded-[5px]'/>
                    </a>
                    </span>
                    <h1 className='register-header-title my-[12px] text-[1.8rem] font-[600] text-[#2c31cf]'>Đăng ký Khóa Học Hè</h1>
                    <p className='register-header-desc text-[#ff0000] text-[13px]'>Mỗi người có thể đăng ký một hoặc nhiều khóa học cùng lúc, và tránh trùng lặp thời gian học của các khóa học.</p>
                </div>
                <div className="register-body">
                    <div className="form-body flex flex-col gap-y-4">
                        <div className='form-name flex flex-col'>
                            <label htmlFor="name" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Tên của bạn <span className='text-[#ff0000]'>*</span></label>
                            <div className={` rounded-[44px] h-[44px] border-[1.5px] flex justify-between items-center ${errors.fullname ? "bg-[#ff00001a] border-[#f33a58]" : "bg-[#1618230f] border-[#1618230f]"}`}>
                            <input type="text" placeholder='Họ và tên của bạn' className='custom-input outline-none border-none py-3 px-5  bg-transparent text-[14px] text-gray-500' onChange={(e) => setFullname(e.target.value)}/>
                            <span>{errors.fullname ? <IoIosWarning className='warning-icon text-[20px] text-[#ff0000] mr-4'/> : ""}</span>
                            </div>
                            {errors.fullname && <span className='text-[#f33a58] text-[12px] font-medium mt-2 ml-2'>{errors.fullname}</span>}
                        </div>
                        <div className='flex flex-row gap-4 justify-between item-center w-full'>
                            <div className='form-phonenumber flex flex-col w-full'>
                            <label htmlFor="phonenumber" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Số điện thoại <span className='text-[#ff0000]'>*</span></label>
                            <div className={` rounded-[44px] h-[44px] border-[1.5px] flex justify-between items-center ${errors.phonenumber ? "bg-[#ff00001a] border-[#f33a58]" : "bg-[#1618230f] border-[#1618230f]"}`}>
                            <input type="text" placeholder='Số điện thoại của bạn' className='custom-input outline-none border-none py-3 px-5 bg-transparent text-[14px] text-gray-500' onChange={(e) => setPhonenumber(e.target.value)}/>
                            <span>{errors.phonenumber ? <IoIosWarning className='warning-icon text-[20px] text-[#ff0000] mr-4'/> : ""}</span>
                            </div>
                            {errors.phonenumber && <span className='text-[#f33a58] text-[12px] font-medium mt-2 ml-2'>{errors.phonenumber}</span>}
                            </div>
                            <div className='form-office flex flex-col w-full'>
                            <label htmlFor="office" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Trường/Công ty <span className='text-[#ff0000]'>*</span></label>
                            <div className={` rounded-[44px] h-[44px] border-[1.5px] flex justify-between items-center ${errors.office ? "bg-[#ff00001a] border-[#f33a58]" : "bg-[#1618230f] border-[#1618230f]"}`}>
                            <input type="text" placeholder='Trường/Công ty của bạn' className='custom-input outline-none border-none py-3 px-5  bg-transparent text-[14px] text-gray-500' onChange={(e) => setOffice(e.target.value)}/>
                            <span>{errors.office ? <IoIosWarning className='warning-icon text-[20px] text-[#ff0000] mr-4'/> : ""}</span>
                            </div>
                            {errors.office && <span className='text-[#f33a58] text-[12px] font-medium mt-2 ml-2'>{errors.office}</span>}
                            </div>
                        </div>
                        <div className='flex flex-row gap-4 justify-between item-center w-full'>
                            <div className='form-phonenumber flex flex-col w-full'>
                            <label htmlFor="phonenumber" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Đối tượng  <span className='text-[#ff0000]'>*</span></label>
                            <div className='bg-[#1618230f] rounded-[44px] h-[44px] border-[1.5px] border-[#1618230f] flex justify-between px-2 items-center relative cursor-pointer' onClick={() => setOccupationOpen(!isOccupationOpen)}>
                                <span className='outline-none px-5 focus:outline-none bg-transparent text-[14px] text-gray-500'>{selectedOccupation}</span>
                                <span><BiChevronDown size={20} className={`${isOccupationOpen && "rotate-180"} text-gray-500`} /></span>
                                <div className='absolute top-[44px] right-[10px] w-[215px] '>
                                <ul className={`bg-white overflow-y-auto  shadow-lg ${isOccupationOpen ? "max-h-[220px]" : "max-h-0"}`}>
                                    {occupationList?.map((occupation) => {
                                        return (
                                            <li key={occupation.id} className={`p-2 text-sm hover:bg-sky-600 hover:text-white hover:font-semibold ${occupation.name === selectedOccupation && "bg-sky-500 text-white font-semibold"}`}
                                            onClick={() => {
                                                setSelectedOccupation(occupation.name);
                                                setOccupationOpen(false)
                                            }}
                                            >
                                                {occupation.name}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            </div>
                            {errors.selectedOccupation && <span className='text-[#f33a58] text-[12px] font-semibold mt-2 ml-2'>{errors.selectedOccupation}</span>}
                            </div>
                            <div className='form-phonenumber flex flex-col w-full'>
                            <label htmlFor="phonenumber" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Mức độ hiểu biết hiện tại <span className='text-[#ff0000]'>*</span></label>
                            <div className='bg-[#1618230f] rounded-[44px] h-[44px] border-[1.5px] border-[#1618230f] flex justify-between px-2 items-center relative cursor-pointer' onClick={() => setIsKnowledgeOpen(!isKnowledgeOpen)}>
                                <span className='outline-none px-5 focus:outline-none bg-transparent text-[14px] text-gray-500'>{selectedKnowledge}</span>
                                <span><BiChevronDown size={20} className={`${isKnowledgeOpen && "rotate-180"} text-gray-500`} /></span>
                                <div className='absolute top-[44px] right-[10px] w-[215px] '>
                                <ul className={`bg-white overflow-y-auto  shadow-lg ${isKnowledgeOpen ? "max-h-[220px]" : "max-h-0"}`}>
                                    {knowledgeLevelList?.map((level) => {
                                        return (
                                            <li key={level.id} className={`p-2 text-sm hover:bg-sky-600 hover:text-white hover:font-semibold ${level.name === selectedKnowledge && "bg-sky-500 text-white font-semibold"}`}
                                            onClick={() => {
                                                setSelectedKnowledge(level.name);
                                                setIsKnowledgeOpen(false)
                                            }}
                                            >
                                                {level.name}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            </div>
                            {errors.selectedKnowledge && <span className='text-[#f33a58] text-[12px] font-semibold mt-2 ml-2'>{errors.selectedKnowledge}</span>}
                            </div>
                        </div>
                    
                        <div className='form-output flex flex-col w-full'>
                            <label htmlFor="output" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Mong muốn đầu ra <span className='text-[#ff0000]'>*</span></label>
                            <div className='w-full'>
                            <textarea type="text" placeholder='Mong muốn đầu ra của bạn...' className='min-h-[100px] pl-2 bg-[#1618230f]  text-[#495057] border border-[#ced4da] focus:outline-none p-1 italic text-[14px] rounded-[4px] hover:ring-2 ring-[#ced4da] focus:ring-2 resize-none w-full' onChange={(e) => setOutput(e.target.value)}></textarea>
                            </div>
                            {errors.output && <span className='text-[#f33a58] text-[12px] font-semibold mt-2 ml-2'>{errors.output}</span>}
                        </div>
                        <div className='form-submit mt-6 mb-4'>
                            <div className='bg-[#1dbfaf] rounded-[44px] h-[44px] flex justify-center'>
                            <button type="submit" className='outline-none py-[8px] px-5  bg-transparent text-[18px]  text-white font-semibold' onClick={handleRegister}>Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {info && (
                <div  className="register-content-success px-8 py-4 lg:w-[560px] lg:h-[660px] h-[560px] overflow-hidden">
                <div className="register-header-success text-center max-w-[400px] mx-auto">
                    <span className=' flex justify-center'>
                    <a href="/" className=''>
                        <Image src={success} alt='CodeCamp - By Như Thắng' className='w-[80px] h-[80px] object-cover rounded-full border-[2px] border-[#ccc]'/>
                    </a>
                    </span>
                    <h1 className='register-header-title-success my-[8px] text-[1.8rem] font-[600] text-[#32CD32]'>Đăng ký Thành Công</h1>
                    <p className='register-header-desc text-[#f33a58] text-[14px] font-[450]'>Xin vui lòng ghi nhớ mã đăng ký để có thể tra cứu thông tin đăng ký khóa học!</p>
                </div>
                <div className="register-body-success">
                    <div className="form-body flex flex-col gap-y-3">
                        <div className='form-name flex gap-2 border-b-[1px] border-[#f2f2f2] bg-[#fff2f4] items-center'>
                            <label htmlFor="name" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Mã đăng ký: </label>
                            <span className='text-[14px]'>【<span className="text-[#1F8DDC] font-medium">DNT123456789</span>】</span>
                        </div>
                        <div className='form-name flex gap-2 border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="name" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Tên của bạn:</label>
                            <span className='text-[14px]'>{fullname}</span>
                        </div>
                
                            <div className='form-phonenumber flex w-full gap-2 border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="phonenumber" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Số điện thoại:</label>
                            <span className='text-[14px]'>{phonenumber}</span>
                            </div>
                            <div className='form-office flex gap-2 w-full border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="office" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Trường/Công ty:</label>
                            <span className="text-[14px]">{office}</span>
                            </div>
                        
                            <div className='form-object flex gap-2 w-full border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="object" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Đối tượng: </label>
                            <span className="text-[14px]">{selectedOccupation}</span>
                             </div>
                             <div className='form-knowledge flex gap-2 w-full border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="knowledge" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Mức độ hiểu biết hiện tại: </label>
                            <span className="text-[14px]">{selectedKnowledge}</span>
                             </div>
                    
                        <div className='form-output flex gap-2 w-full border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="output" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Mong muốn đầu ra:</label>
                            <span className="text-[14px]">{output}</span>
                        </div>
                        <div className='flex justify-end mt-5'>
                            <span type="submit" className='py-1 px-6 text-[16px] bg-[#ff0000]  text-white font-semibold rounded-[8px] cursor-pointer' onClick={handleCancelClick}>Đồng ý</span>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default Register