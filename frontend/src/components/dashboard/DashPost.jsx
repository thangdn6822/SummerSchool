"use client"
import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashPost = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [userPosts, setUserPosts] = useState([])
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false)
    const [postIdToDelete, setPostIdToDelete] = useState('')
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await fetch(`http://localhost:5000/v1/posts/getposts?userId=${currentUser.userId}`);
            const data = await res.json();
            if (res.ok) {
              setUserPosts(data.posts);
              consol.log(data.posts)
              if (data.posts.length < 9) {
                setShowMore(false);
              }
            }
          } catch (error) {
            console.log(error.message);
          }
        };

      }, [currentUser.userId]);
      const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
          const res = await fetch(
            `http://localhost:5000/v1/posts/getposts?userId=${currentUser.userId}&startIndex=${startIndex}`
          );
          const data = await res.json();
          if (res.ok) {
            setUserPosts((prev) => [...prev, ...data.posts]);
            if (data.posts.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    
      const handleDeletePost = async () => {
        setShowModal(false);
        try {
          const res = await fetch(
            `http://localhost:5000/v1/posts/deletepost/${postIdToDelete}/${currentUser.userId}`,
            {
              method: 'DELETE',
            }
          );
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            setUserPosts((prev) =>
              prev.filter((post) => post._id !== postIdToDelete)
            );
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      return (
        <div className='p-8 w-full min-h-screen mt-10'>
            <>
              <Table hoverable className='shadow-md'>
                <Table.Head>
                  <Table.HeadCell>Date updated</Table.HeadCell>
                  <Table.HeadCell>Post image</Table.HeadCell>
                  <Table.HeadCell>Post title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                  <Table.HeadCell>
                    <span>Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                {userPosts.map((post) => (
                  <Table.Body className='divide-y' key={post._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Link href={`/posts/${post.slug}`}>
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={80}
                            height={50}
                            className='w-20 h-10 object-cover bg-gray-500'
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link href={`/posts/${post.slug}`}>
                          <span className='font-medium text-gray-900 dark:text-white'>
                            {post.title}
                          </span>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setPostIdToDelete(post._id);
                          }}
                          className='font-medium text-red-500 hover:underline cursor-pointer'
                        >
                          Delete
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link href={`/updatepost/${post._id}`}>
                          <span className='text-teal-500 hover:underline'>
                            <span>Edit</span>
                          </span>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className='w-full text-teal-500 self-center text-sm py-7'
                >
                  Show more
                </button>
              )}
            </>
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size='md'
          >
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                  Are you sure you want to delete this post?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={handleDeletePost}>
                    Yes, I'm sure
                  </Button>
                  <Button color='gray' onClick={() => setShowModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
}

export default DashPost