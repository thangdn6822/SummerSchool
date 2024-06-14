"use client"
import React from 'react'
import Link from 'next/link';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { FaBell } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import Image from 'next/image';
import vi from '@/assets/icons/vi.png'
import en from '@/assets/icons/en.png'

const DashHeader = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="dashheader-container absolute bg-[#f9f9f9] top-0 transition-all ease-in-out w-[calc(100%-224px)]">
        <div className="dashheader-wrapper flex justify-between items-center h-[60px] bg-[#e9e9e9] py-[20px] w-full px-6">
        <div className="left flex justify-center items-center gap-5">
                    <IoMdMenu className='icon-menu'/>
                    <div className="search-box bg-[#fff] rounded-[5px] flex items-center gap-[5px] py-1 px-3">
                        <PiMagnifyingGlassBold className='icon-glass'/>
                        <input type="text" 
                        placeholder='Search'
                        className='bg-transparent p-[5px] w-[340px] h-[30px] outline-none border-none'
                        />
                    </div>
                </div>
                <div className="right flex items-center justify-center gap-4">
                    <div className="logo-country">
                    <div className='hidden lg:flex'>
                <div className=''>
                    <Image src={vi} alt='CodeCamp - By Như Thắng' className='w-[1.75rem] h-[1.75rem] object-cover'/>
                </div>
                <div className='hidden menu-dropdown absolute z-30 top-[60px] right-[40px]  w-[9.875rem] bg-white border border-[#f2f2f2]' style={{boxShadow: "rgba(0, 0, 0, 0.05) 0px 0.0625rem 0.1875rem, rgba(0, 0, 0, 0.05) 0px 1.75rem 1.4375rem -0.4375rem, rgba(0, 0, 0, 0.04) 0px 0.75rem 0.75rem -0.4375rem"}}>
                    <div className='flex flex-col p-1'>
                        <button className='px-3 py-[0.5rem] font-[600] flex items-center gap-4 rounded-[4px] hover:bg-[#e5e7eb]'>
                            <div className='menu-icon'>
                                <div className='menu-image rounded-full w-[1.5625rem]'>
                                    <Image src={en} alt='CodeCamp - By Như Thắng'/>
                                </div>
                            </div>
                            <div className='menu-label font-[400] text-[14px]'>English</div>
                        </button>
                        <button className='px-3 py-[0.5rem] font-[600] flex items-center gap-4 rounded-[4px] hover:bg-[#e5e7eb]'>
                            <div className='menu-icon'>
                                <div className='menu-image rounded-full w-[1.5625rem]'>
                                    <Image src={vi} alt='CodeCamp - By Như Thắng'/>
                                </div>
                            </div>
                            <div className='menu-label font-[400] text-[14px]'>Tiếng Việt</div>
                        </button>
                    </div>
                </div>
            </div>
                    </div>
                    <div className="notification">
                        <a href="#"><FaBell className='icon-notify'/></a>
                    </div>
                    <div className="user-info">
                      
                            <Dropdown arrowIcon={false}
                            inline
                            label={
                                <Avatar alt='user' img={currentUser.profilePicture} rounded/>
                            }
                            >
                                <Dropdown.Header>
                                <span className='block text-sm font-medium bg-[#f2f3f4] py-1 px-2 rounded-[2px]'>{currentUser.userId}</span>
                                <span className='block text-sm font-medium truncate'>
                                    {currentUser.email}
                                </span>
                                </Dropdown.Header>
                                <Link href='/dashboard?tab=profile' passHref>
                                <Dropdown.Item>Profile</Dropdown.Item>
                                </Link>
                                <Dropdown.Divider />
                                <Dropdown.Item>Đăng xuất</Dropdown.Item>
                            </Dropdown>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default DashHeader