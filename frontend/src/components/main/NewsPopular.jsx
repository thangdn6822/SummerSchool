'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import NewCard from '../NewCard'

const NewsPopular = () => {
    const [postsNews, setPostsNews] = useState([])
  useEffect(() => {
      const fetchNews = async () => {
        const res = await fetch('http://localhost:5000/v1/news/getnews');
        const data = await res.json();
        setPostsNews(data.news);
      };
      fetchNews();
    }, []);
  return (
    <div className="news-body max-w-[1200px] mx-auto px-[1rem] pt-0 pb-[5rem]">
    <div className="news-body-content">
        <div>
        {postsNews && postsNews.length > 0 && (
        <div className='flex flex-col gap-6'>
        <div className="popular-list-card max-w-[1200px] mx-auto mt-[64px] grid gap-[32px]" style={{gridTemplateColumns: 'repeat(1, 1fr'}}>
          {postsNews.map((postNews) => (
            <NewCard key={postNews._id} postNews={postNews} />
          ))}
        </div>
          <Link href='/search' className='text-lg text-teal-500 hover:underline text-center mt-6'>
            View all news
          </Link>
      </div>
    )}
        </div>
    </div>
    </div>
  )
}

export default NewsPopular