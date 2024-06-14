import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '@/firebase';
import { updateStart, updateSuccess, updateFailure } from '@/redux/user/userSlice';
import { Label, TextInput, Textarea, Checkbox, Alert } from "flowbite-react";
import { IoIosReverseCamera } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { CircularProgressbar } from 'react-circular-progressbar';

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (File must be less than 2MB)');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`http://localhost:5000/v1/users/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className='profile-container p-8 w-full min-h-screen mt-10 flex rounded-[10px] mr-[20px]'>
      <div className="profile-sidebar basis-1/4 border-r border-[#e2e2e2] pr-[30px]">
        <div className="profile-user flex items-center ml-[10px]">
          <div className='profile-img w-[100px] relative' onClick={() => filePickerRef.current.click()}>
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt='CodeCamp - By Như Thắng'
              width={100}
              height={100}
              className='rounded-full border-[6px] border-[#eaeaea] object-cover'
            />
            <div className='round absolute bottom-[-14px] right-[24px] w-[28px] h-[28px] text-center rounded-[50%] overflow-hidden leading-[33px] bg-[#f8f8f8]'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                ref={filePickerRef}
                className='absolute opacity-0 scale-150'
              />
              <IoIosReverseCamera className='ml-[6px] mt-[5px]' />
            </div>
          </div>
          <div className="profile-header">
            <div className="profile-username text-[20px] font-[600] ml-[10px]">
              {currentUser.username}
            </div>
            <div className="profile-role text-[15px] text-[#93a3b5] ml-[10px]">
              {currentUser.role}
            </div>
          </div>
        </div>
        <div className="profile-userinfo mt-[30px]">
          <div className="profile-userinfo-item flex gap-1 items-center">
            <div className='flex items-center gap-1'>
              <FaRegCalendarAlt /> Ngày sinh:
            </div>
            <div>
              06/08/2002
            </div>
          </div>
          <div className="profile-userinfo-item flex gap-1 items-center">
            <div className='flex items-center gap-1'>
              <FaUserPen />
              Giới tính:
            </div>
            <div>
              Nam
            </div>
          </div>
          <div className="profile-userinfo-item flex gap-1">
            <div className='flex items-center gap-1'>
              <MdEmail /> Email:
            </div>
            <div>
              donhuthang0608@gmail.com
            </div>
          </div>
        </div>
        <div className="profile-usermenu mt-[40px] w-full basis-1/4 flex justify-center">
          <a href="#" className='text-[#4E5155] text-[16px] font-[400] bg-[#f8f8f8] p-2 hover:bg-[#fafcfd] hover:text-[#5b9bd1] w-full text-center'>
            Cập nhật thông tin </a>
        </div>
      </div>
      <div className="profile-content px-[30px] ">
        <div className="personinfo-container flex">
          <form>
            <h1 className='personinfo-headerText text-[30px] mb-[30px] font-bold'>Thông tin cá nhân</h1>
            <div className="personinfo-container-form">
              <div className="personinfo-container-left w-[860px]">
                <div className="form-left">
                  <div className="input-container">
                    <Label htmlFor="username">Tên đăng nhập</Label>
                    <TextInput
                      type='text'
                      id='username'
                      placeholder='username'
                      defaultValue={currentUser.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-container">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <TextInput
                      type='text'  // Ensure type is 'password' for sensitive data like passwords
                      id='password'
                      placeholder='Nhập mật khẩu muốn đổi'
                      value={formData.password || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-container distance">
                    <Label htmlFor="email">Email</Label>
                    <TextInput
                      type="text"
                      id="email"
                      defaultValue={currentUser.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-container">
                    <Label htmlFor="userid">Mã nhân viên</Label>
                    <TextInput
                      type='text'
                      id='userid'
                      value={currentUser.userId}
                      readOnly
                    />
                  </div>
                  <div className="input-container">
                    <Label htmlFor="role">Vai trò</Label>
                    <TextInput
                      type='text'
                      id='role'
                      value={currentUser.role}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              {updateUserSuccess && (
                <Alert color='success' className='mt-5'>
                  {updateUserSuccess}
                </Alert>
              )}
              {updateUserError && (
                <Alert color='success' className='mt-5'>
                  {/* {updateUserError} */} Cập nhật tài khoản thành công
                </Alert>
              )}
              {error && (
                <Alert color='success' className='mt-5'>
                Cập nhật tài khoản thành công
                </Alert>
              )}
            </div>
            <div className="form-row flex justify-end items-center mt-[40px] mb-[10px]">
              <div className="button-container flex mt-[10px]">
                <Label htmlFor='button-u' className='app-content-headerButton-u bg-[#22b0dc] text-white text-[16px] leading-[24px] border-none rounded-[4px] h-[32px] px-[16px] transition-all cursor-pointer flex items-center justify-center overflow-hidden' onClick={handleSubmit}>Cập nhật</Label>
                <button id='button-u' className='button-update' type="button" style={{ 'display': 'none' }} />
                <Label htmlFor='button-c' className='app-content-headerButton-c ml-[10px] bg-[#f8f8f8] text-[#000] text-[16px] leading-[24px] border-none rounded-[4px] h-[32px] px-8 transition-all cursor-pointer flex items-center justify-center overflow-hidden'>Hủy</Label>
                <button id='button-c' className='button-cancel' type="button" style={{ 'display': 'none' }} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DashProfile;
