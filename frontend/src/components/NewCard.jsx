'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}

const NewCard = ({postNews}) => {
  return (
    <div className="news-card ">
                    <Link href={`postNews/${postNews.slug}`} className='border-[2px] border-[#e8e8e8] p-6 rounded-[16px] flex flex-row gap-4'>
                    <div className="news-image flex items-center">
                        <img src={postNews.image} className='max-h-[120px] max-w-[240px] rounded-[16px] object-cover' alt='CodeCamp - By Như Thắng'/>
                    </div>
                    <div className="news-content ">
                        <div className="news-card-header">
                            <h4 className='font-medium text-[18px] mb-4'>{postNews.title}</h4>
                        </div>
                        <div className="news-card-content">
                        <p className='text-sm font-[400] mb-2' dangerouslySetInnerHTML={{ __html: truncateText(postNews.content, 340)}}></p>
                        <button className='font-medium mt-2 hover:text-teal-500 hover:underline'>Xem thêm</button>
                        </div>
                    </div>
                    </Link>

                    
    </div>
  )
}

export default NewCard