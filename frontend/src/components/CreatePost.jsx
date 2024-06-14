"use client"
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker'; // Thêm thư viện chọn ngày giờ
import 'react-datepicker/dist/react-datepicker.css';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({userId: currentUser.userId});
  const [publishError, setPublishError] = useState(null);
  const [closeDate, setCloseDate] = useState(new Date()); 
 
  console.log(formData)

  const router = useRouter();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/v1/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || 'Publish Failed!');
        return;
      }

      if (res.ok) {
        setPublishError(null);
        router.push(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-8 w-full min-h-screen mt-10'>
      <h1 className='text-left text-3xl my-7 font-semibold'>Create a New Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Tiêu đề'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Vui lòng chọn Khóa học</option>
            <option value='based'>Khóa học nền tảng</option>
            <option value='advanced'>Khóa học nâng cao</option>
            <option value='depth'>Khóa học chuyên sâu</option>
          </Select>
          <DatePicker
            selected={closeDate}
            onChange={(date) => setCloseDate(date)}
            showTimeSelect
            dateFormat='Pp'
            className='flex-1 rounded-[8px] bg-[#f9fafb]'
          />
        </div>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Mô tả sơ lược'
            required
            id='desc'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, desc: e.target.value })
            }
          />
          <TextInput
            type='text'
            placeholder='Giảng viên khóa học'
            required
            id='lecture'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, lecturer: e.target.value })
            }
          />
          <TextInput
            type='text'
            placeholder='Giá khóa học'
            required
            id='price'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-8 h-8'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <Image
            src={formData.image}
            alt='upload'
            className='object-cover mx-auto'
            height={288}
            width={800}
          />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-56 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
