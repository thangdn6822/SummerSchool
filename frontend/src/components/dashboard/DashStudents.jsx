import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { IoEyeOutline } from "react-icons/io5";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';

const DashStudents = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [students, setStudents] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null);

  const componentRef = useRef();

    const handlePrintFile = () => {
        if (window.confirm('Bạn có muốn in hoặc tải thông tin của đơn hàng?')) {
            handlePrint();
            // updateInspection();
        }
        return;
    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`http://localhost:5000/v1/students/getstudents`);
        const data = await res.json();
        if (res.ok) {
          setStudents(data.students);
          if (data.students.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.role === 'god') {
      fetchStudents();
    }
  }, [currentUser._id]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Student Data', 14, 16);
    doc.autoTable({
      head: [['Ngày đăng ký', 'Mã người học', 'Tên người học', 'Số điện thoại', 'Đối tượng', 'Mức độ hiểu biết']],
      body: students.map(student => [
        new Date(student.createdAt).toLocaleDateString(),
        student.studentId,
        student.studentName,
        student.studentPhone,
        student.studentObject,
        student.studentLevel
      ]),
    });
    doc.save('students.pdf');
  };

  const handleShowMore = async () => {
    const startIndex = students.length;
    try {
      const res = await fetch(`http://localhost:5000/v1/students/getstudents?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setStudents((prev) => [...prev, ...data.students]);
        if (data.students.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='p-8 w-full min-h-screen mt-10'>
      <>
        <div className='flex justify-end'>
          <Button onClick={exportToPDF} className='mb-4 text-white bg-[#22B0DC] px-2'>Xuất thông tin</Button>
        </div>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Ngày đăng ký</Table.HeadCell>
            <Table.HeadCell>Mã người học</Table.HeadCell>
            <Table.HeadCell>Tên người học</Table.HeadCell>
            <Table.HeadCell>Số điện thoại</Table.HeadCell>
            <Table.HeadCell>Nơi làm việc</Table.HeadCell>
            <Table.HeadCell>Chi tiết</Table.HeadCell>
          </Table.Head>
          {students.map((student) => (
            <Table.Body className='divide-y' key={student._id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  {new Date(student.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{student.studentId}</Table.Cell>
                <Table.Cell>{student.studentName}</Table.Cell>
                <Table.Cell>{student.studentPhone}</Table.Cell>
                <Table.Cell>{student.studentWorkplace}</Table.Cell>
                <Table.Cell>
                  <IoEyeOutline 
                    className='cursor-pointer ml-[10px]' 
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowModal(true);
                    }}
                  />
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
          <div className='text-center max-w-[560px]'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Thông tin đăng ký học
            </h3>
            {selectedStudent && (
              <div>
              <div className="form-body flex flex-col gap-y-3">
                          <div className='form-name flex gap-2 border-b-[1px] border-[#f2f2f2] bg-[#fff2f4] items-center'>
                            <label htmlFor="name" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Ngày đăng ký: </label>
                            <span className='text-[14px]'>【<span className="text-[#1F8DDC] font-medium">{new Date(selectedStudent.createdAt).toLocaleDateString()}</span>】</span>
                        </div>
                        <div className='form-name flex gap-2 border-b-[1px] border-[#f2f2f2] bg-[#fff2f4] items-center'>
                            <label htmlFor="name" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Mã đăng ký: </label>
                            <span className='text-[14px]'>【<span className="text-[#1F8DDC] font-medium">{selectedStudent.studentId}</span>】</span>
                        </div>
                        <div className='form-name flex gap-2 border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="name" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Tên người học:</label>
                            <span className='text-[14px]'>{selectedStudent.studentName}</span>
                        </div>
                
                            <div className='form-phonenumber flex w-full gap-2 border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="phonenumber" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Số điện thoại:</label>
                            <span className='text-[14px]'>{selectedStudent.studentPhone}</span>
                            </div>
                            <div className='form-office flex gap-2 w-full border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="office" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Nơi làm việc:</label>
                            <span className="text-[14px]">{selectedStudent.studentWorkplace}</span>
                            </div>
                        
                            <div className='form-object flex gap-2 w-full border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="object" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Đối tượng: </label>
                            <span className="text-[14px]">{selectedStudent.studentObject}</span>
                             </div>
                             <div className='form-knowledge flex gap-2 w-full border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="knowledge" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Mức độ hiểu biết hiện tại: </label>
                            <span className="text-[14px]">{selectedStudent.studentLevel}</span>
                             </div>
                    
                        <div className='form-output flex gap-2 w-full border-b-[1px] border-[#f2f2f2] items-center'>
                            <label htmlFor="output" className='block text-[14px] text-[#292929] my-[10px] ml-[8px] font-[600]'>Mong muốn đầu ra:</label>
                            <span className="text-[14px]">{selectedStudent.studentOutput}</span>
                        </div>
                    </div>
              </div>
            )}
            <div className='flex justify-end gap-4 mt-4'>
              <Button color='gray' onClick={() => {setShowModal(false), handlePrintFile()}}>
                In người học
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                Đóng
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashStudents;
