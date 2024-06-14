"use client";
import React, { useState, useEffect } from 'react';
import { Sidebar } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { MdOutlineLogout, MdOutlineCreateNewFolder } from "react-icons/md";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaNewspaper, FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from '@/assets/icons/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signoutSuccess } from '@/redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const DashSidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('dash');

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(router.query); 
    const activeTabFromUrl = urlSearchParams.get('tab');
    if (activeTabFromUrl) {
      setTab(activeTabFromUrl);
    }
  }, [router.query]);

  const handleSignOut = async () => {
    try {
      const res = await fetch('http://localhost:5000/v1/users/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        router.push('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLinkClasses = (currentTab) => {
    return currentTab === tab ? 'bg-gray-100 text-white shadow-lg' : 'bg-transparent text-gray-800 hover:bg-gray-100 hover:text-gray-900 hover:shadow-lg';
  };

  return (
    <Sidebar className='w-full md:w-56 bg-[#f2f3f4] min-h-screen shadow-lg'>
      <div className="logo-name flex flex-col justify-center gap-y-2 mx-auto pb-4 w-full">
        <Link href='/'>
          <Image src={logo} alt="CodeCamp - By Như Thắng" className='w-[56px] h-[56px] rounded-[16px] mx-auto' />
        </Link>
        <h1 className='font-bold text-center mt-2'>CodeCamp - <span>UET</span></h1>
      </div>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {currentUser && (
            <Link href={{ pathname: '/dashboard', query: { tab: 'dash' } }}
              onClick={() => setTab('dash')} className={`flex items-center ${getLinkClasses('dash')}`}>
              <Sidebar.Item 
                active={tab === 'dash'}
                icon={HiChartPie} aria-label="Dashboard" labelColor="dark" as="div"
                
              >
                <h3 className="text-base font-medium">
                  Dashboard
                </h3>
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.role === 'god' && (
            <Link href={{ pathname: '/dashboard', query: { tab: 'staffs' } }}
              onClick={() => setTab('staffs')} className={`flex items-center ${getLinkClasses('staffs')}`}>
              <Sidebar.Item icon={HiOutlineUserGroup} active={tab === 'staffs'} aria-label="Staff Management" labelColor="dark" as="div" >
                <h3 className="text-base font-medium">
                  Nhân viên
                </h3>
              </Sidebar.Item>
            </Link>
          )}
          <Link href={{ pathname: '/dashboard', query: { tab: 'students' } }}
            onClick={() => setTab('students')}
            className={`flex items-center ${getLinkClasses('students')}`}>
            <Sidebar.Item icon={HiOutlineUserGroup} aria-label="Students" labelColor="dark" as="div">
              <h3 className="text-base font-medium">
                Người học
              </h3>
            </Sidebar.Item>
          </Link>
          <Link href={{ pathname: '/dashboard', query: { tab: 'createpost' } }}
            onClick={() => setTab('createpost')}
            className={`flex items-center ${getLinkClasses('createpost')}`}>
            <Sidebar.Item icon={MdOutlineCreateNewFolder} aria-label="Create Post" labelColor="dark" as="div">
              <h3 className="text-base font-medium">
                Tạo bài viết
              </h3>
            </Sidebar.Item>
          </Link>
          <Link href={{ pathname: '/dashboard', query: { tab: 'createnews' } }}
            onClick={() => setTab('createnews')}
            className={`flex items-center ${getLinkClasses('createnews')}`}>
            <Sidebar.Item icon={HiDocumentText} as='div'>
              <h3 className="text-base font-medium">
                Tạo tin tức
              </h3>
            </Sidebar.Item>
          </Link>
          <Link href={{ pathname: '/dashboard', query: { tab: 'posts' } }}
            onClick={() => setTab('posts')}
            className={`flex items-center ${getLinkClasses('posts')}`}>
            <Sidebar.Item icon={HiDocumentText} as='div'>
              <h3 className="text-base font-medium">
                Bài viết
              </h3>
            </Sidebar.Item>
          </Link>
          <Link href={{ pathname: '/dashboard', query: { tab: 'comments' } }}
            onClick={() => setTab('comments')}
            className={`flex items-center ${getLinkClasses('comments')}`}>
            <Sidebar.Item icon={HiAnnotation} as='div'>
              <h3 className="text-base font-medium">
                Bình luận
              </h3>
            </Sidebar.Item>
          </Link>
          <Link href={{ pathname: '/dashboard', query: { tab: 'message' } }}
            onClick={() => setTab('message')}
            className={`flex items-center ${getLinkClasses('message')}`}>
            <Sidebar.Item icon={BiMessageRoundedDetail} as='div'>
              <h3 className="text-base font-medium">
                Tin nhắn
              </h3>
            </Sidebar.Item>
          </Link>
          <Link href={{ pathname: '/dashboard', query: { tab: 'profile' } }}
            onClick={() => setTab('profile')}
            className={`flex items-center ${getLinkClasses('profile')}`}>
            <Sidebar.Item icon={FaRegUserCircle} as='div'>
              <h3 className="text-base font-medium">
                Thông tin cá nhân
              </h3>
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            icon={MdOutlineLogout}
            className='flex mb-2 justify-start items-center gap-4 border border-gray-200 hover:bg-gray-900 p-2 rounded-md cursor-pointer hover:shadow-lg mt-[120px]'
            onClick={handleSignOut}
          >
            <h3 className="text-base text-gray-800 group-hover:text-white font-medium">
              Đăng xuất
            </h3>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
