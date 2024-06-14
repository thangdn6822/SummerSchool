import React from 'react'
import Navbar from '@/components/header/Navbar'
import Footer from '@/components/footer/Footer'
import Image from 'next/image'
import banner from '@/assets/images/banner.png'
import trainning from '@/assets/images/trainning.jpg'
import work from '@/assets/images/work.jpg'
const page = () => {
  return (
    <div className="trainning-container">
        <Navbar />
        <div className="trainning-wrapper">
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
            <h5 className='text-[#002157] text-center text-[26px] lg:text-[34px] font-semibold mb-8 pl-4 lg:pl-0'>Đào tạo</h5>
        </div>
        <section className='max-w-[1200px] mx-auto'>
        <h3 class="text-[#333] text-[30px] font-[550] uppercase mt-[55px] leading-[38px] mb-[10px]">
                  Đại học
        </h3>
        <p className='mt-10 text-[#333] leading-[32px] font-[450]'>Chúng tôi cung cấp các chương trình Cử nhân tại các ngành Công nghệ thông tin, Khoa học máy tính, Các hệ thống thông tin và Truyền thông và Mạng máy tính. Ngoài chương trình chuẩn cho 4 ngành nói trên, từ năm 2016, chúng tôi bắt đầu tuyển sinh Chương trình Khoa học Máy tính Chất lượng cao đáp ứng Thông tư 23 của Bộ GD&ĐT. Hàng năm, chúng tôi tiếp nhận khoảng 420 sinh viên mới. Bên cạnh đó, nhiều chương trình bằng kép cho phép sinh viên kết hợp các ngành học như Tài chính – Ngân hàng, Cơ học kỹ thuật với Công nghệ thông tin. Các chương trình bằng kép có khoảng 100 sinh viên mỗi năm.</p>
        <div className='my-4 max-w-[1000px] mx-auto'>
            <Image src={trainning} alt='CodeCamp - By Như Thắng' className='max-h-[500px] w-full object-cover'/>
        </div>
        <p className='mt-10 text-[#333] leading-[32px] font-[450]'>Chương trình chuẩn ngành Công nghệ thông tin cung cấp kiến thức hiện đại và đầy đủ về công nghệ thông tin. Sinh viên được trang bị kiến thức xây dựng và phát triển phần mềm, các hệ thống thông tin, mạng máy tính cũng như các dịch vụ công nghệ thông tin. Chương trình đã được kiểm định bởi Tổ chức Liên kết Đại học Asean (AUN). Sinh viên tốt nghiệp có thể làm việc tại các công ty phần mềm và các tập đoàn truyền thông.
          </p>
          <p className='text-[#333] leading-[32px] font-[450]'>Chương trình chuẩn ngành Khoa học máy tính cung cấp kiến thức hiện đại về khoa học máy tính dựa trên cơ sở chương trình tiên tiến của Đại học New South Wales (Australia). Chương trình được đầu tư mạnh mẽ từ cơ sở vật chất đến đội ngũ giảng dạy với sự tham gia của nhiều giáo sư nước ngoài. Sinh viên được học tập thêm các môn Tiếng Anh để đạt được điểm chuẩn 6.0 IELTS và được học các môn chuyên ngành bằng Tiếng Anh, thực hành và nghiên cứu trong các phòng thí nghiệm hiện đại. Sinh viên được trang bị kiến thức để có thể làm việc ở các công ty công nghệ trên thế giới và có thể tiếp tục học tập và nghiên cứu lên các bậc học cao hơn trong môi trường quốc tế.
          <br />
          Chương trình ngành Hệ thống thông tin cung cấp kiến thức trên phổ rộng và các kỹ năng, giải pháp công nghệ thông tin tích hợp hỗ trợ doanh nghiệp trong nền kinh tế tri thức. Cử nhân ngành Hệ thống thông tin có kiến thức chuyên sâu về tích hợp hệ thống và khai phá dữ liệu, có khả năng ứng dụng và kết hợp các công cụ khám phá tri thức trong các hệ thống thông tin và có thể đảm nhiệm các vị trí như kiến trúc sư phần mềm, tích hợp hệ thống – dịch vụ, quản lý cơ sở dữ liệu, phát triển phần mềm thương mại điện tử, an toàn thông tin, cán bộ phụ trách thông tin, v.v…</p>
          <div className='my-4 max-w-[1000px] mx-auto'>
            <Image src={work} alt='CodeCamp - By Như Thắng' className='max-h-[500px] w-full object-cover'/>
        </div>
        <p className='mt-10 text-[#333] leading-[32px] font-[450] mb-20'>Chương trình Chất lượng cao ngành Khoa học Máy tính là sự tiếp nối thành công của chương trình đào tạo chuẩn quốc tế ngành Khoa học máy tính đã được kiểm định chất lượng theo chuẩn quốc tế. Chương trình đào tạo theo đơn đặt hàng từ các doanh nghiệp, tổ chức hàng đầu của Nhật Bản, Việt Nam và quốc tế. Tối thiểu 50% môn học chuyên môn được giảng dạy bằng Tiếng Anh. Sử dụng phương pháp giảng dạy, kiểm tra đánh giá theo hướng phát huy năng lực cá nhân, chú trọng phát triển năng lực phân tích, thực hành, sáng tạo, tự cập nhật kiến thức; năng lực nghiên cứu, ứng dụng khoa học và công nghệ. Sinh viên trong chương trình này sẽ có lợi thế trong tuyển dụng tại các tập đoàn hàng đầu đã có ký kết hợp tác đào tạo và tuyển dụng với Trường ĐHCN như Samsung, Toshiba, FPT, Viettel-ICT, VNPT Technology,… và nhóm các doanh nghiệp CNTT của Nhật Bản tại Việt Nam. Sinh viên giỏi được nhận tài trợ học bổng từ Nhà trường và từ các doanh nghiệp, tập đoàn đối tác.
          </p>
        </section>
        </div>
        <Footer />
    </div>
  )
}

export default page