'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import software from '@/assets/images/software.png'
import hardware from '@/assets/images/hardware.png'
import social from '@/assets/images/social.png'
import c from '@/assets/images/c++.jpg'
import python from '@/assets/images/python.jpg'
import user from '@/assets/icons/users.png'
import PostCard from '../PostCard'

const Popular = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
          const res = await fetch('http://localhost:5000/v1/posts/getposts');
          const data = await res.json();
          setPosts(data.posts);
        };
        fetchPosts();
      }, []);
  return (
    <div className="popular-container max-w-[1200px] mx-auto px-[1rem] py-[5rem]">
        <div className="popular-wrapper">
            {/* <div className='popular-header'>
                <h2 className='popular-title text-[2.2rem] font-[900] mr-auto mt-[60px]'>Tất cả khóa học</h2>
            </div> */}
            <div>
            {posts && posts.length > 0 && (
            <div className='flex flex-col gap-6 mt-[60px]'>
            <h2 className='text-[2.2rem] font-semibold text-center text-[#002157]'>Tất cả khóa học</h2>
            <div className="popular-list-card max-w-[1200px] mx-auto mt-[64px] grid gap-[32px]" style={{gridTemplateColumns: 'repeat(3, 1fr'}}>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
              <Link href='/search' className='text-lg text-teal-500 hover:underline text-center mt-6'>
                View all posts
              </Link>
          </div>
        )}
            </div>
        </div>
    </div>
  )
}

export default Popular