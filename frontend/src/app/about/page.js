import React from "react";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import banner from "@/assets/images/banner.png";
import vision from "@/assets/images/vision.png";
import mission from "@/assets/images/mission.png";
import k1 from "@/assets/images/k1.png";
import k2 from "@/assets/images/k2.png";
import k3 from "@/assets/images/k3.png";
import k4 from "@/assets/images/k4.png";
import about from "@/assets/images/about.jpg";

const page = () => {
  return (
    <div className="aboutpage-container">
      <Navbar />
      <div className="aboutpage-wrapper">
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
        <section id="who-we" className="mb-20">
          <div className="max-w-[1120px] mx-auto">
            <div className="grid gap-7 lg:grid-cols-[5fr_7fr] md:grid-cols-2">
              <div className="md:mt-[-70px] z-0 ">
                <Image
                  src={about}
                  alt="CodeCamp - By Như Thắng"
                  className="shadow-[0_2px_4px_0_rgba(192,192,192,.5)] object-cover h-[400px] max-w-full w-[457px] border-4 border-solid border-[#fff]"
                />
              </div>
              <div>
                <h3 class="text-[#4d96ff] text-[32px] font-[500] uppercase mt-[55px] leading-[38px] mb-[10px]">
                  CHÚNG TÔI LÀ AI?
                </h3>
                <div class="text-[#333] leading-[26px]">
                  CodeCamp là một hệ thống và nền tảng tương tác trực tuyến cho
                  phép người dùng đăng ký học tập, thực hành và đánh giá các kỹ năng lập
                  trình của họ thông qua ở các lớp khóa học hè, có kiến thức và có cơ hội việc làm sau khi tham gia khóa học hè ở CodeCamp.
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="vision" className="my-20">
          <div class="max-w-[1120px] mx-auto">
            <div class="grid gap-7 md:grid-cols-2">
              <div>
                <h3 class="text-[#4d96ff] text-[32px] font-[500] uppercase mt-[55px] leading-[38px] mb-[10px]">
                  TẦM NHÌN
                </h3>
                <div class="text-[#333] leading-[26px]">
                  Dù bạn là ai, CodeLearn sẽ luôn giúp bạn khám phá giới hạn của
                  chính mình. Chúng tôi hứa sẽ mang đến một kênh để các lập
                  trình viên có thể chia sẻ kiến thức của mình không chỉ ở Việt
                  Nam mà còn rộng ra là ở Đông Nam Á và toàn châu Á.
                </div>
              </div>
              <div>
                <Image
                  src={vision}
                  alt="CodeCamp - By Như Thắng"
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="missions">
          <div className="max-w-[1120px] mx-auto">
          <div class="grid gap-7 md:grid-cols-2">
            <div class="img mt-14">
              <Image
                src={mission}
                alt="CodeCamp - By Như Thắng"
                className="max-w-full h-auto"
              />
            </div>
            <div>
              <h3 class="text-[#4d96ff] text-[32px] font-[500] uppercase mt-[55px] leading-[38px] mb-[10px]">
                SỨ MỆNH
              </h3>
              <div class="text-[#333] leading-[26px]">
                Chúng tôi tập trung phát triển một hệ sinh thái toàn diện với
                các khóa học từ cơ bản đến nâng cao và bài tập thực hành phù hợp
                với mọi người. Với các khóa học, bài tập phong phú và đa dạng
                được hỗ trợ nhiều ngôn ngữ lập trình, CodeLearn giúp người dùng
                học và thực hành lập trình dễ dàng và hiệu quả. <br /> Chúng tôi
                kết nối tất cả những người có chung niềm đam mê với lập trình để
                cùng nhau xây dựng một cộng đồng lớn mạnh.
              </div>
            </div>
          </div>
          </div>
        </section>
        <section id="values" class="bg-[#F4F4F4] pb-10 my-20">
          <div class="max-w-[1120px] mx-auto">
            <div>
              <div class="text-center">
                <h3 class="text-[#4d96ff] text-[32px] font-[500] uppercase pt-[55px] leading-[38px] mb-8">
                  GIÁ TRỊ
                </h3>
              </div>
              <div class="grid gap-6 md:grid-cols-2">
                <div class="bg-white p-5 flex gap-5">
                  <div class="flex-none w-[55px]">
                    <Image
                      src={k1}
                      alt="CodeCamp - By Như Thắng"
                      className="max-w-full h-auto"
                    />
                  </div>
                  <div class="flex flex-col gap-3">
                    <h4 class="my-0 font-medium">Tri thức</h4>
                    <div>
                      Các khóa học trực tuyến từ cơ bản đến nâng cao phù hợp với
                      mục đích thực hành và học tập của mỗi người dùng khác
                      nhau.
                    </div>
                  </div>
                </div>
                <div class="bg-white p-5 flex gap-5">
                  <div class="flex-none w-[55px]">
                    <Image
                      src={k2}
                      alt="CodeCamp - By Như Thắng"
                      className="max-w-full h-auto"
                    />
                  </div>
                  <div class="flex flex-col gap-3">
                    <h4 class="my-0 font-medium">Sân chơi trí tuệ</h4>
                    <div>
                      Số lượng lớn các bài tập về thuật toán khuyến khích người
                      dùng áp dụng nhiều cách giải khác nhau bằng nhiều loại
                      ngôn ngữ khác nhau.
                    </div>
                  </div>
                </div>
                <div class="bg-white p-5 flex gap-5">
                  <div class="flex-none w-[55px]">
                    <Image
                      src={k3}
                      alt="CodeCamp - By Như Thắng"
                      className="max-w-full h-auto"
                    />
                  </div>
                  <div class="flex flex-col gap-3">
                    <h4 class="my-0 font-medium">Kết nối</h4>
                    <div>
                      Một cộng đồng để các lập trình viên có thể cùng nhau giải
                      quyết các bài toán, trao đổi và học hỏi lẫn nhau.
                    </div>
                  </div>
                </div>
                <div class="bg-white p-5 flex gap-5">
                  <div class="flex-none w-[55px]">
                    <Image
                      src={k4}
                      alt="CodeCamp - By Như Thắng"
                      className="max-w-full h-auto"
                    />
                  </div>
                  <div class="flex flex-col gap-3">
                    <h4 class="my-0 font-medium">Sự hài lòng của người dùng</h4>
                    <div>
                      Một người bạn đồng hành đáng tin cậy, nơi cung cấp các
                      cuộc thi cho các đơn vị và giúp mỗi người dùng đạt được
                      mục tiêu của riêng mình.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default page;
