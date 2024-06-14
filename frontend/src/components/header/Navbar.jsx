"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import logo from '@/assets/icons/logo.png'
import vi from '@/assets/icons/vi.png'
import en from '@/assets/icons/en.png'
import mail from '@/assets/icons/mail.png'
import help from '@/assets/icons/help.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SignIn from '../SignIn'

const Navbar = () => {
    const pathname = usePathname()
    const isActive = (path) => path === pathname
    const NavLinks = [
        {id: 1, name: "Trang chủ", path: "/"},
        {id: 2, name: "Giới thiệu", path: "/about"},
        {id: 3, name: "Đào tạo", path: "/trainning"},
        {id: 4, name: "Tin tức", path: "/news"},
        {id: 5, name: "Người học", path: "/learner"}
    ]
    const [signin, setSignin] = useState(false)
    const handleSignin = () => {
        setSignin(true);
    }
    const handleForm = () => {
        setSignin(false)
    }

  
  return (
    <>
        <div className="navbar-container w-[95%] max-w-[1200px] fixed z-10 py-2 px-8 flex justify-between items-center left-2/4 translate-x-[-50%] bg-white top-[8px] rounded-[16px]" style={{boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.2)"}}>
        <div className="navbar-logo flex gap-2 items-center justify-center">
            <Image src={logo} alt='CodeCamp - By Như Thắng' className='w-[60px] h-[60px] object-cover rounded-[16px]'/>
            <span className='font-semibold text-[#2c31cf]'>Code<span>Camp</span></span>
        </div>
        <div className="nav-links">
            <ul className="nav-menu md:flex hidden items-center gap-8">
                {NavLinks.map((link) => {
                    return (
                        <li key={link.id} className='nav-item'>
                            <Link href={link.path} className={isActive(link.path) ? "active" : "nav-links"}>
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
        <div className='nav-infos flex h-full items-center gap-4'>
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
            <button className='help w-[32px] cursor-pointer text-left rounded-[4px] p-0 flex items-center h-[28px]'>
                <div>
                    <Image src={help} alt='CodeCamp - By Như Thắng'/>
                </div>
            </button>
            <button className='mail-question w-[32px] cursor-pointer text-left rounded-[4px] p-0 flex items-center h-[28px]'>
                <div>
                    <Image src={mail} alt='CodeCamp - By Như Thắng'/>
                </div>
            </button>
            <button class="flex items-center btn-login text-[15px] font-[600] bg-[#4d96ff] transition-all text-white px-[12px] py-[6px] rounded-[4px]" type="button" data-button="true" onClick={handleSignin}><span class="btn-label">Đăng nhập</span></button>
            
        </div>
    </div>
    {signin && <SignIn closeForm={handleForm}/>}
    </>
  )
}

export default Navbar