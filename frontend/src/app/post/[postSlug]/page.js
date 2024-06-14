'use client';
import Navbar from '@/components/header/Navbar';
import Footer from '@/components/footer/Footer';
import CommentSection from '@/components/CommentSection';
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PostCard from '@/components/PostCard';
import { usePathname } from 'next/navigation';
import { PiChalkboardTeacher } from "react-icons/pi";
import { LiaGripfire } from "react-icons/lia";
import { RiChatCheckFill } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlinePriceChange } from "react-icons/md";
import { FaGaugeHigh } from "react-icons/fa6";
import { FaBatteryFull } from "react-icons/fa";



export default function PostPage() {
  const router = useRouter();
  const pathname = usePathname();
  const postSlug = pathname.split('/').pop();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  console.log(postSlug)


  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/v1/posts/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [pathname]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/v1/posts/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p>Error loading post</p>
      </div>
    );
  }

  return (

    <>
    <Navbar />
    <main className='p-3 flex flex-col max-w-[1200px] mx-auto min-h-screen mt-[100px] '>
      <div className='flex lg:flex-row flex-col py-[52px] pb-20 border-b bg-[#0E2643] text-white rounded-[16px]'>
      <div className='flex flex-col gap-y-4'>
      <h1 className='text-3xl mt-2 pl-10 max-w-2xl lg:text-4xl font-medium'>
        {post && post.title}
      </h1>
      <span class="h-[30px] py-1 rounded-[4px] ml-10 flex gap-2 items-center"><span className='font-medium flex items-center gap-1'>
      <PiChalkboardTeacher className='text-[20px]'/>Giảng viên:</span>{post && post.lecturer}</span>
      <p className='pl-10 text-[14px]'>{post && post.desc}</p>
      <div class="flex flex-col gap-4 mt-4"><button class=" bg-yellow-300 hover:bg-yellow-500 px-2 py-3 rounded-[12px] text-[#182537] font-medium ml-10 w-full max-w-[400px]"> Vui lòng đăng ký để học tập</button></div>
      <div class="min-h-[68px] max-w-[440px] flex flex-wrap gap-2 ml-10 pt-10">
      <div class="min-w-[92px] h-[30px] py-1 px-3 rounded-[4px] bg-[#19395E] flex gap-2 items-center"><LiaGripfire /> Nổi bật</div>
      <div class="min-w-[92px] h-[30px] py-1 px-3 rounded-[4px] bg-[#19395E] flex gap-2 items-center"><RiChatCheckFill /> Miễn phí</div>
      <div class="min-w-[92px] h-[30px] py-1 px-3 rounded-[4px] bg-[#19395E] flex gap-2 items-center"><FaRegCalendarAlt /> Ngày tạo: <span>{post && new Date(post.createdAt).toLocaleDateString()}</span></div>
      <div class="min-w-[92px] h-[30px] py-1 px-3 rounded-[4px] bg-[#19395E] flex gap-2 items-center"><IoIosTimer /><span className=''>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span></div>
        <div class="min-w-[92px] h-[30px] py-1 px-3 rounded-[4px] bg-white flex gap-2 items-center text-[#182537]"><TbCategoryPlus />  <Link href={`/search?category=${post && post.category}`} className=''>
          <Button pill size='xs' className='text-[#182537]'>
            {post && post.category}
          </Button>
      </Link></div>
      </div>
      </div>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 mr-10 max-h-[260px] max-w-[380px] object-cover rounded-[12px]'
      />
      </div>
      <div className='flex gap-4 justify-between'>
      <div
        className='py-3 max-w-3xl w-full post-content leading-8 mt-10'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="box-sticky-container mt-20 ">
        <div class="px-5 py-6 bg-[#0E2643] text-white flex flex-col gap-6 rounded-[12px]">
        <div>
        <h4 class="my-0 text-[24px] font-semibold">{post && post.title}</h4>
        <ul class="mt-2">
        <li class="" className='flex gap-1 items-center px-2 py-2 bg-[#f05123] rounded-[4px] mt-4'><MdOutlinePriceChange /><span>Giá khóa học: {post && post.price} VNĐ</span></li>
        <li class="flex gap-1 items-center px-2 py-2 bg-[#f05123] rounded-[4px] mt-6"><FaGaugeHigh /><span>Mức độ: {post && post.category}</span></li>
        <li class="flex gap-1 items-center px-2 py-2 bg-[#f05123] rounded-[4px] mt-6"><FaBatteryFull /><span>Môi trường học năng động, sáng tạo</span></li>
        </ul>
        </div>
        <div class="flex flex-col gap-4 mt-4">
        <button class=" bg-yellow-300 hover:bg-yellow-500 px-2 py-2 w-full max-w-[400px] font-medium rounded-[12px] text-[#182537] ">
        Đăng ký học
        </button>
        </div>
        </div>
      </div>
      </div>
      <CommentSection postId={post._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-2xl mt-5 font-medium text-[#182537] '>Tìm thêm các khóa học</h1>
        <div className="max-w-[1200px] mx-auto mt-[64px] grid gap-[32px]" style={{gridTemplateColumns: 'repeat(3, 1fr'}}>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
