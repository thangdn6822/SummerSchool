'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import user from '@/assets/icons/users.png'

const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}

const PostCard = ({post}) => {
  return (
    <div className="popular-card">
                    <Link href={`post/${post.slug}`}>
                    <div className="popular-image">
                        <img src={post.image} alt='CodeCamp - By Như Thắng'/>
                    </div>
                    </Link>
                    <Link href={`/post/${post.slug}`}>
                    <div className="popular-content p-4 shadow-lg">
                        <div className="popular-card-header">
                            <h4 className='font-medium text-[18px]'>{post.title}</h4>
                        </div>
                        <div className="popular-card-content">
                        <p className='text-sm mb-2'><span className='text-[#333] font-medium'>Giảng viên:  </span> <span className='text-[#2c31cf]'>{post.lecturer}</span></p>
                        <p className='text-sm font-[400] mb-2'>{truncateText(post.desc, 50)}</p>
                        <div className='flex gap-2 text-sm items-center'>
                            <div className="">
                                <Image src={user} alt='CodeCamp - By Như Thắng' className='w-[22px] h-[22px]'/>
                            </div>
                            <div className='font-[400] text-gray-900'>32.320</div>
                        </div>
                        <div className='flex gap-3 items-center mt-3'>
                        <div class=" text-sm h-[21px] font-medium w-fit rounded-[5px] flex justify-center items-center px-3 bg-[#FDC7C7] text-[#FF0000]">Nổi bật</div>
                        <div class="text-sm h-[21px] font-medium w-fit rounded-[5px] flex justify-center items-center px-3 bg-[#FFF177]">{post.price} VND</div>
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
  )
}

export default PostCard