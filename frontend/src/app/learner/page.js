import React from 'react'
import Navbar from '@/components/header/Navbar'
import Footer from '@/components/footer/Footer'
import Image from 'next/image'
import banner from '@/assets/images/banner.png'
import ioi from '@/assets/images/ioi2021.jpg'
import achiment from '@/assets/images/achiment.jpg'
const page = () => {
  return (
    <div className="learner-container">
        <Navbar />
        <div className="learner-wrapper">
        <div className="banner-container max-w-[1200px] px-[1rem] mx-auto">
          <div className="banner-wrapper">
            <div className="content">
              <div className="img relative overflow-hidden max-w-full h-[500px] mt-[7rem] mx-auto">
                <Image
                  src={banner}
                  alt="CodeCamp - By Như Thắng"
                  fill
                  className="object-cover h-full w-full rounded-[32px] bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_81.44%)]"
                />
                <div className="absolute w-full h-full bg-[linear-gradient(360deg,rgba(0,0,0,0.75)_6.82%,rgba(0,0,0,0.00)_81.44%)] rounded-[32px]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="trainning-title mt-[60px]">
            <h5 className='text-[#002157] text-center text-[26px] lg:text-[34px] font-semibold mb-8 pl-4 lg:pl-0'>Nguời học</h5>
        </div>
        <section className='max-w-[1200px] mx-auto'>
        <h3 class="text-[#333] text-[30px] font-[550] uppercase mt-[55px] leading-[38px] mb-[10px]">
                  Thành tích nổi bật
        </h3>
        <h4 className='font-medium text-[20px] mt-10'>IOI 2020/2021</h4>
        <p className=' text-[#333] leading-[32px] font-[450]'>Với bề dày 12 năm đồng hành cùng các thế hệ học sinh giỏi Tin học của Việt Nam, trường Đại học Công nghệ vinh dự là đơn vị được Bộ Giáo dục và Đào tạo giao nhiệm vụ tập huấn và tổ chức thi cho đội tuyển Olympic Tin học của Việt Nam với các vòng thi Quốc gia (Vòng 2), khu vực Châu Á – Thái Bình Dương (APIO) và vòng thi Quốc tế (IOI).
        <br />
        Đặc biệt, trong hai năm 2020 và 2021, trường Đại học Công nghệ, ĐHQGHN lần đầu tiên đăng cai tổ chức kỳ thi APIO và IOI theo hình thức thi trực tuyến và gặt hái được nhiều thành công đáng ghi nhận.
        Năm 2020: Đội tuyển IOI của Việt Nam đạt: 01 HCV; 02 HCB; 01 HCĐ
        Năm 2021: Đội tuyển IOI của Việt Nam đạt: 04 HCB
        <br />
        Với thành tích đạt được 110 huy chương từ năm 1989 đến nay, đoàn Việt Nam đang xếp thứ 07 và tiếp tục trong top đầu các nước có huy chương nhiều nhất trên thế giới của các kỳ IOI.</p>
        <div className='my-4 max-w-[1000px] mx-auto'>
            <Image src={ioi} alt='CodeCamp - By Như Thắng' className='max-h-[500px] w-full object-cover'/>
        </div>
        <h4 className='font-medium text-[20px] mt-10'>Thông tin báo chí</h4>
        <p className='mt-10 text-[#333] leading-[32px] font-[450]'>

        – Bản tin ĐHQGHN: Khai mạc Vòng chung kết kỳ thi Olympic Tin học quốc tế năm 2021 <br />

        – VNExpress: Việt Nam giành 4 huy chương bạc Olympic Tin học quốc tế <br />

        – Bản tin Trường ĐHCN: Bế mạc kỳ thi Olympic Tin học quốc tế 2021 tại Trường ĐHCN Năm 2018 <br />

ngày 17/05, đội UET Fastest của Trường Đại học Công nghệ (Đại học Quốc gia Hà Nội) đã vượt qua 08 đội tuyển để giành ngôi Vô địch tại cuộc chung kết Cuộc đua số 2018 tại nhà thi đấu Quận Tây Hồ – Hà Nội. <br />

Đội UET Fastest gồm các sinh viên Nguyễn Văn Tùng, Nguyễn Minh Châu, Nguyễn Minh Tuấn, Trần Anh Dũng do ThS. Quách Công Hoàng hướng dẫn nhận được phần thưởng là 450 triệu đồng, trong đó có chuyến tham quan và trải nghiệm trong vòng một tuần tại Nhật Bản, được FPT Software tuyển thẳng vào làm theo lĩnh vực mà cá nhân mong muốn.
          </p>
        
          <div className='my-4 max-w-[1000px] mx-auto'>
            <Image src={achiment} alt='CodeCamp - By Như Thắng' className='max-h-[500px] w-full object-cover'/>
        </div>
        <p className='mt-10 text-[#333] leading-[32px] font-[450] mb-20'>Cả 4 thành viên của đội thi đấu đều là các sinh viên tài năng xuất sắc của Trường ĐHCN, ĐHQGHN. Về chiến lược của đội trong vòng Bán kết, UET Fastest chia sẻ “Đầu tiên phải chậm chắc để hoàn thành trọn vẹn sa hình, sau đó tăng tốc để rút ngắn thời gian xe chạy, về đích và giành chiến thắng. Tham gia cuộc thi này, do không có thời gian luyện tập nên các thành viên thường xuyên phải tranh thủ luyện tập vào ngày nghỉ hoặc buổi tối. Khuôn viên của trường chật nên không thể dựng sân tập, cả đội phải tạo sân ảo trên máy tính. Các thành viên đã sử dụng kiến thức trong lĩnh vực lập trình, xử lý ảnh, trí tuệ nhân tạo – AI để tạo ra xe tự hành với tốc độ cao nhất, xác định và tránh được vật cản trên đường, nhận dạng và đi đúng theo chỉ dẫn của biển báo rẽ trái, rẽ phải. Chiến thuật này đã giúp đội thi UET Fastest của chúng ta trở thành đội Vô địch tại vòng Chung kết Cuộc đua số.
          </p>
        </section>
        </div>
        <Footer />
    </div>
  )
}

export default page