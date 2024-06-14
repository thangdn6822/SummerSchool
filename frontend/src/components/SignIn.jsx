"use client"
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInStart, signInSuccess, signInFailure } from '@/redux/user/userSlice';
import { Button, Checkbox, Label, Modal, TextInput, Alert, Spinner } from "flowbite-react";
import logo from '@/assets/icons/logo.png'
import Image from 'next/image';
import { IoIosWarning } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const SignIn = ({closeForm}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const {loading, error: errorMessage} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()
    const [outForm, setOutForm] = useState(false)
    const [errors, setErrors] = useState({})
    const valideForm = () => {
        const validationErrors = {}
        if(!username.trim()) {
            validationErrors.username = "Tên đăng nhập không được bỏ trống"
        }
        if (!password.trim()) {
            validationErrors.password = "Mật khẩu không được để trống"
        }
        setErrors(validationErrors)
        return Object.keys(validationErrors).length === 0;
    }
    
    const refForm = useRef();
    useEffect(() => {
        const handleClickOutForm = (e) => {
            if (refForm.current && !refForm.current.contains(e.target)) {
                closeForm();
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

    const handleSignIn = async (e) => {
        e.preventDefault()
        if(!valideForm()) {
            return;
        }
        try {
            dispatch(signInStart());
            const res = await fetch('http://localhost:5000/v1/users/signin', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({username, password}),
            });
            const data = await res.json();
            if (data.success === false) {
              dispatch(signInFailure(data.message));
            }
      
            if (res.ok) {
              dispatch(signInSuccess(data));
              router.push('/dashboard');
            }
        }
        catch(error) {
            dispatch(signInFailure(error.message))
        }
    }
    const handleCancelClick = () => {
        closeForm();
        setOutForm(true)
    }
  return (
    <div className="signin-container before:fixed before:top-0 before:left-0 before:w-full before:h-full before:bg-[#000] before:bg-opacity-40 before:z-10" ref={refForm} onClick={closeForm}>
        <div className="signin-wrapper fixed lg:bottom-[70px] bottom-[100px] rounded-[1rem] flex left-2/4 translate-x-[-50%] bg-white overflow-hidden z-10" onClick={handleClickInForm}>
        <div  className="signin-background">       
        </div>
        <div className='signin-content px-8 py-4 lg:w-[500px] lg:h-[560px] h-[540px] w-[440px] overflow-hidden'>
        <div className='flex justify-end '>
        <button class="text-[#999] text-[28px]" onClick={handleCancelClick}><span>×</span></button>
        </div>
                <div className="signin-header-success text-center max-w-[400px] mx-auto">
                    <span className=' flex justify-center'>
                    <a href="/" className=''>
                        <Image src={logo} alt='CodeCamp - By Như Thắng' className='w-[42px] h-[42px] object-cover rounded-[8px]'/>
                    </a>
                    </span>
                    <h1 className='signin-header-title-success my-[8px] text-[1.8rem] font-[600] text-[#000]'>Đăng nhập CodeCamp</h1>
                    <p className='signin-header-desc text-[#f33a58] text-[13px] font-[420]'>Mỗi người có thể đăng ký một hoặc nhiều khóa học cùng lúc, và tránh trùng lặp thời gian học của các khóa học.</p>
                </div>
                <div className="signin-body-success max-w-[360px] mt-4 mx-auto">
                    <div className="form-body flex flex-col gap-y-1">
                        <div className='form-username flex flex-col'>
                            <label htmlFor="username" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Tên đăng nhập</label>
                            <div className={` rounded-[44px] h-[44px] border-[1.5px] flex justify-between items-center ${errors.username ? "bg-[#ff00001a] border-[#f33a58]" : "bg-[#1618230f] border-[#1618230f]"}`}>
                            <input type="text" placeholder='Tên đăng nhập' className='custom-input outline-none py-3 px-5 w-full bg-transparent text-[14px] text-gray-500 border-none' onChange={(e) => setUsername(e.target.value)}/>
                            <span>{errors.username ? <IoIosWarning className='warning-icon text-[20px] text-[#ff0000] mr-4'/> : ""}</span>
                            </div>
                            {errors.username && <span className='text-[#f33a58] text-[12px] font-medium ml-2'>{errors.username}</span>}
                        </div>
                        <div className='form-password flex flex-col'>
                            <label htmlFor="password" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Mật khẩu</label>
                            <div className={` rounded-[44px] h-[44px] border-[1.5px] flex justify-between items-center ${errors.password ? "bg-[#ff00001a] border-[#f33a58]" : "bg-[#1618230f] border-[#1618230f]"}`}>
                            <input type={showPassword ? 'text' : 'password'} placeholder='Mật khẩu' className='custom-input border-none py-3 px-5 w-full  bg-transparent text-[14px] text-gray-500' onChange={(e) => setPassword(e.target.value)}/>
                            <span className="mr-4" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
                            </span>
                            </div>
                            {errors.password && <span className='text-[#f33a58] text-[12px] font-medium ml-2'>{errors.password}</span>}
                        </div>
                        <div className="flex mt-4">
                            <div className="flex items-center ml-2 gap-2">
                                <Checkbox id="remember" className='border-[2px] border-[#1dbfaf] text-[20px]'/>
                                <Label htmlFor="remember">Ghi nhớ mật khẩu</Label>
                            </div>
                        </div>
                        <div className='form-submit mt-6 mb-4'>
                            <div className='bg-[#1dbfaf] rounded-[44px] h-[44px] flex justify-center'>
                            <button type="submit" className='outline-none py-[8px] px-5  bg-transparent text-[18px]  text-white font-semibold' onClick={handleSignIn}>
                            {loading ? (
                                            <div className='flex items-center'>
                                                <Spinner size="sm" />
                                                <span className='pl-3'>Loading...</span>
                                            </div>
                                        ) : (
                                            'Đăng nhập'
                                        )}
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                )} */}
        </div>
        </div>
    </div>
  )
}

export default SignIn