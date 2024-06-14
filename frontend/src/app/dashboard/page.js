'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import DashPost from '@/components/dashboard/DashPost'
import DashHeader from '@/components/dashboard/DashHeader'
import DashSidebar from '@/components/dashboard/DashSidebar';
import CreatePost from '@/components/CreatePost';
import DashboardComp from '@/components/dashboard/DashboardComp';
import DashUsers from '@/components/dashboard/DashUsers';
import DashStudents from '@/components/dashboard/DashStudents';
import DashComment from '@/components/dashboard/DashComment';
import DashMessage from '@/components/dashboard/DashMessage';
import DashProfile from '@/components/dashboard/DashProfile';
import CreateNews from '@/components/CreateNews';

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "dash";
  const [activeTab, setActiveTab] = useState(initialTab);


  useEffect(() => {
    setActiveTab(searchParams.get("tab") || "dash");
  }, [searchParams]);
  console.log(activeTab)

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
    {activeTab === 'dash' && <DashboardComp />}
      <DashHeader />
      {/* profile... */}
      {activeTab === 'staffs' && <DashUsers />}
      {/* posts... */}
      {activeTab === 'students' && <DashStudents />}
      {/* users */}
      {activeTab === 'createpost' && <CreatePost />}

      {activeTab === 'createnews' && <CreateNews />}
      {/* comments  */}
      {activeTab === 'posts' && <DashPost />}
      {/* dashboard comp */}
      {activeTab === 'comments' && <DashComment />}
      {activeTab === 'message' && <DashMessage />}
      {activeTab === 'profile' && <DashProfile />}
    </div>
  );
}

export default page


