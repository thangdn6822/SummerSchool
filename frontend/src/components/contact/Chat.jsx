"use client"
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import chat from '@/assets/icons/chat.png';
import cskh from '@/assets/icons/cskh.png';
import { FaMinus } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import { LuSendHorizonal } from "react-icons/lu";


const Chat = () => {
    const [hidden, setHidden] = useState(true)
    const [popUp, setPopUp] = useState(false)
  return (
    <div className="contact-container ">
        <div className="w-[45px] fixed bottom-0 right-0 mb-[85px] mr-[22px] z-50" onClick={() => {setPopUp(true), setHidden(true)}}>
          <div className="append-chat-plusion" >
              <div className={`cursor-pointer flex items-center justify-center w-[50px] h-[50px] bg-[#2c31cf] rounded-full`}>
                <Image src={chat} alt='CodeCamp - By Như Thắng' className='w-[28px] h-[28px] object-scale-down'/>
              </div>
          </div>
        </div>
        {popUp && (
            <div className={`chat-plusion-container bg-white fixed bottom-0 right-[-170px] w-[350px] h-auto mr-[250px] shadow-xl border border-[#ced4de] rounded-t-lg z-10 ${hidden ? "block" : "hidden"}`} >
                <div className="warapper">
                <div className="inner h-auto  w-full">
                    <div className="user-form">
                        <div className="user-form-header bg-[#2c31cf] rounded-t-lg py-2 flex justify-between items-center">
                            <div className='user-form-header-title text-[15px] text-white pl-2'>
                                <div className='flex items-center gap-2'>
                                <Image src={cskh} alt='CodeCamp - By Như Thắng' className='w-[36px] h-[36px] object-scale-down bg-white rounded-full'/>
                                <span className='font-medium'>support@codecamp.vn</span>
                                </div>
                            </div>
                        <div className=' flex items-center gap-3 mr-2' onClick={() => setHidden(!hidden)}>
                            <span className='text-white cursor-pointer hover:scale-x-125 text-[18px]'><PiDotsThreeOutlineFill /></span>
                            <span className='text-white cursor-pointer hover:scale-x-125'><FaMinus /></span>
                            <span className='text-white cursor-pointer hover:scale-x-125 text-[20px]'><MdOutlineCancelPresentation  /></span>
                        </div>
                        </div>
                    <div className="user-form-content p-2 h-[330px] bg-[#f9f9f9] ">
                        {/* <div className="form form-inputname flex flex-col my-2">
                            <label htmlFor="name" className='font-semibold text-[15px] text-[#495057]'>Tên của bạn <span className='text-red-500'>*</span></label>
                            <input type="text" id='name' placeholder='Tên của bạn' className='text-[#495057] border border-[#ced4da] focus:outline-none p-1 italic text-[14px] rounded-[4px] hover:ring-2 ring-[#ced4da] focus:ring-2'/>
                        </div>
                        <div className="form form-inputphone flex flex-col my-2">
                            <label htmlFor="phone" className='font-semibold text-[15px] text-[#495057]'>Số điện thoại <span className='text-red-500'>*</span></label>
                            <input type="text" id='phone' name='phone' placeholder='Số điện thoại' className='text-[#495057] border border-[#ced4da] focus:outline-none p-1 italic text-[14px] rounded-[4px] hover:ring-2 ring-[#ced4da] focus:ring-2'/>
                        </div>
                        <div className="form form-inputemail flex flex-col my-2">
                            <label htmlFor="email" className='font-semibold text-[15px] text-[#495057]'>Địa chỉ email <span className='text-red-500'>*</span></label>
                            <input type="text" id='email' placeholder='your@email.com' className='text-[#495057] border border-[#ced4da] focus:outline-none p-1 italic text-[14px] rounded-[4px] hover:ring-2 ring-[#ced4da] focus:ring-2'/>
                        </div>
                        <div className="form form-inputsupport flex flex-col my-2">
                            <label htmlFor="support" className='font-semibold text-[15px] text-[#495057]'>Xin chào, chúng tôi có thể giúp gì cho bạn? <span className='text-red-500'>*</span></label>
                            <textarea id='support' placeholder='Bắt đầu trò chuyện tại đây...' className='min-h-[100px] text-[#495057] border border-[#ced4da] focus:outline-none p-1 italic text-[14px] rounded-[4px] hover:ring-2 ring-[#ced4da] focus:ring-2'/>
                        </div> */}
                        </div>
                    </div>
                    <div className="form-action w-auto h-[60px] border-t-[1px] border-[#e9ebed] flex gap-2 items-center justify-center px-2">
                        <div className="uploadFile flex-none items-center">
                            <span className=''>
                                <label htmlFor="chooseFile" className='cursor-pointer'>
                                    <GoPaperclip className='w-[24px] h-[24px] text-gray-500'/>
                                </label>
                                <input type="file" name='chooseFile' id='chooseFile' className='hidden'/>
                            </span>
                        </div>
                        <div className="grow">
                            <div className='input-wrapper rounded-[16px] grow'>
                                <textarea name="" id="" placeholder='Aa' className='bg-[#e5e7eb] w-full border border-[#ccc] rounded-xl overflow-hidden h-[38px] py-2 px-[8px] focus:outline-none resize-none'></textarea>
                            </div>
                        </div>
                        <div className='btn flex-none'>
                            <button className='' type='submit'><LuSendHorizonal className='text-[#adb5bd] w-[1.5rem] h-[2.5rem]'/></button>
                        </div>
                    </div>
                </div>
                </div>
        </div>
        )}
    </div>
    
  )
}

export default Chat