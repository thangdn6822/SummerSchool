'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import person1 from '@/assets/images/person1.jpg';
import person2 from '@/assets/images/person2.jpg';
import person3 from '@/assets/images/person3.jpg';
import person4 from '@/assets/images/person4.jpg';
import person5 from '@/assets/images/person5.jpg';
import person6 from '@/assets/images/person6.jpg';
import person7 from '@/assets/images/person7.jpg';

const datas = [
  {
    name: "Trương Ngọc Phương Anh",
    position_name: "Sinh viên khóa học trí tuệ nhân tạo của trường hè",
    content: "au khi hoàn thành khóa học trí tuệ nhân tạo (AI) của trường hè, hiểu biết sâu rộng về Trí Tuệ Nhân Tạo. Tôi rất hài lòng khi chọn CodeCamp cho công việc của mình.",
    url: person1

  },
  {
    name: "Võ Ngọc Trâm",
    position_name: "Sinh viên khóa học lập trình cơ bản",
    content: "Tôi đã từng hợp tác với nhiều đơn vị chuyển phát nhưng cuối cùng quyết định đồng hành cùng TLDExpress. Phải nói rằng, hệ thống bưu cục đồng nhất về chất lượng khắp 63 tỉnh thành là điểm làm tôi hài lòng nhất.",
    url: person2

  },
  {
    name: "Hoàng Xuân",
    position_name: "Chủ tiệm nước hoa tại Hà Nội",
    content: "Cửa hàng của tôi luôn ưu tiên lựa chọn TLDFast để đảm bảo giao nhận nhanh chóng và chất lượng hàng hóa. Đặc biệt là khi khách hàng cần giao gấp để tặng quà sinh nhật hoặc chuẩn bị cho dịp lễ đặc biệt.",
    url: person3

  },
  {
    name: "Đỗ Thị Vân",
    position_name: "Chủ cửa hàng đồ gốm tại TP. Hà Nội",
    content: "Nhờ dịch vụ TLDExpress gửi đi hàng mẫu thành công, nhanh chóng mà vừa rồi tôi đã có được hợp đồng cung cấp sản phẩm cho một công ty ở Mỹ.",
    url: person4

  },
  {
    name: "Dương Hoàng Minh",
    position_name: "Giám đốc công ty dệt may tại Bắc Ninh",
    content: "TLDExpress là một trợ thủ đắc lực trong quá trình xuất khẩu thành phẩm sang các nước Đông Nam Á của công ty tôi, đặc biệt là gửi hàng trễ chuyến.",
    url: person5

  },
  {
    name: "Trần Minh Trí",
    position_name: "Giám đốc công ty cà phê tại Buôn Ma Thuột",
    content: "Gửi hàng mẫu cà phê đi nước ngoài không phải là chuyện dễ để cân đối thu chi, tối ưu chi phí cho công ty. May là công ty chúng tôi tìm được TLDExpress. Dịch vụ vượt mong đợi với giá cả phải chăng, lại còn hay có ưu đãi.",
    url: person6

  },
  {
    name: "Vũ An Phương",
    position_name: "Chủ cửa hàng thiết bị gia dụng tại TP. Hà Nội",
    content: "Nhờ TLDExpress mà shop của tôi được nhiều khách hàng đánh giá tốt về thời gian ship hàng. Giá thành tiết kiệm, đội ngũ shipper chuyên nghiệp hỗ trợ rất nhiều cho công việc kinh doanh của tôi.",
    url: person7

  },
]

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
  ]
};

const OutStandingStudent = () => {
  const [selectedData, setSelectedData] = useState(datas[0]);


  const handleChange = (index) => {
    setSelectedData(datas[index]);
  }
  return (
    <div className="wrapper-people-says container mx-auto w-[70%] mt-[120px]">
        <div className="wrapper-people-says-title">
            <h5 className='text-[#002157] text-center text-[24px] lg:text-[30px] font-semibold mb-8 pl-4 lg:pl-0'>Những học sinh tiêu biểu của chúng tôi</h5>
        </div>
        <div className="wrapper-people-says-content w-full px-4 lg:px-0 mb-8 overflow-hidden">
            <div className="bg-[#f4f4f4] px-[22px] py-[16px] lg:py-0  mb-4 lg:mb-0 rounded-[10px] overflow-hidden flex flex-col justify-center">
              <span className="block text-justify leading-6 font-[380] text-[#161D25]">
                
              Các học sinh tiêu biểu sau khóa học trường hè về trí tuệ nhân tạo đã đạt được những thành tích ấn tượng nhờ vào sự nỗ lực và sự hỗ trợ từ chương trình học. Họ không chỉ nắm vững kiến thức chuyên môn mà còn ứng dụng thực tế vào các dự án cụ thể, đóng góp vào các bài báo khoa học và tham gia vào các hoạt động nghiên cứu và phát triển. Những thành tựu này không chỉ khẳng định năng lực cá nhân mà còn tạo đà cho sự nghiệp và học tập trong tương lai.
        
              </span>
              <div className="mt-[34px] w-full mx-auto lg:py-0 py-6">
                <Slider {...settings} className=''>
                    {datas.map((data, index) => {
                      return (
                              <div key={index} className="flex flex-col items-end">
                                  <div onClick={() => handleChange(index)} className="rounded-full h-[134px] w-[134px] mx-auto">
                                    <Image src={data.url} alt='TLDExpress - Giao hàng Chuyển phát nhanh' className='rounded-full'/>
                                  </div>
                                  <span className="mt-[8px] mb-[4px] block text-center font-semibold text-nowrap">{data.name}</span>
                                  <span className="text-[#5D6A7A] block text-center text-[14px] px-[10px]">{data.position_name}</span>
                              </div>
                     
                      )
                    })}
                </Slider>
              </div>
            </div>
           {selectedData && (
             <div className="rounded-[10px] overflow-hidden h-[508px] flex flex-col">
             <div className="bg-[#f4f4f4] pt-4 flex-1 flex-shink">
               <div className="flex flex-col items-center">
                 <div className="rounded-full h-36 w-36 mt-2">
                   <Image src={selectedData.url} className='h-full w-full rounded-full' alt='TLDExpress - Giao hàng chuyển phát nhanh' />
                 </div>
                 <span className="mt-[8px] mb-[4px] block font-semibold" id='data_name'>{selectedData.name}</span>
                 <span className='text-[14px] text-[#5D6A7A] text-center' id='data_position'>{selectedData.position_name}</span>
               </div>
             </div>
             <div className="bg-[#eaedff] px-[24px] py-[16px] flex-1 flex-shrink" style={{boxShadow: '0px 4px 10px rgba(133, 146, 156, 0.3))'}}>
              <span className='text-left text-ellipsis leading-7'>{selectedData.content}</span>
             </div>
           </div>
           )}
        </div>
    </div>
  )}

export default OutStandingStudent