"use client"
import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';


const DashUsers = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [users, setUsers] = useState([])
    const [showMore, setShowMore] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [userIdDelete, setUserIdDelete] = useState('')

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await fetch(`http://localhost:5000/v1/users/getusers`);
          const data = await res.json();
          if (res.ok) {
            setUsers(data.users);
            if (data.users.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if (currentUser.role === 'god') {
        fetchUsers();
      }
    }, [currentUser._id]);
  
    const handleShowMore = async () => {
      const startIndex = users.length;
      try {
        const res = await fetch(`http://localhost:5000/v1/users/getusers?startIndex=${startIndex}`);
        const data = await res.json();
        if (res.ok) {
          setUsers((prev) => [...prev, ...data.users]);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    const handleDeleteUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/v1/users/deleteUser/${userIdDelete}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
          setUsers((prev) => prev.filter((user) => user._id !== userIdDelete));
          setShowModal(false);
        } else {
          console.log(data.message);
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
                <Table.HeadCell>Date created</Table.HeadCell>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              {users.map((user) => (
                <Table.Body className='divide-y' key={user._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      <span className=''>{user.role}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdDelete(user._id);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Delete
                      </span>
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
                Are you sure you want to delete this user?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteUser}>
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
  )
}

export default DashUsers