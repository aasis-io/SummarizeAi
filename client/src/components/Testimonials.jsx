import { useRef, useEffect } from "react";
import User1 from "./../assets/user-1.jpg";
import User2 from "./../assets/user-2.jpg";
import User3 from "./../assets/user-3.jpg";
import User4 from "./../assets/user-4.jpg";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Joseph Alsop",
    user: User1,
    date: "2 March",
    role: "Content Creator",
    review: "Simple, Fast, and Effective",
    review_detail:
      "Lorem ipsum dolori sit amet, consectetu adipiscing elit, sed doit eiusmod tempor incididunt ut laboretuoi et dolore magna aliqua. Ut enim adm minim veniam, quis nostrud exercitati ullam...  ",
  },
  {
    name: "Mark",
    user: User2,
    date: "24 Feb",
    role: "Student",
    review: "Essential for Every Student",
    review_detail:
      "Lorem ipsum dolori sit amet, consectetu adipiscing elit, sed doit eiusmod tempor incididunt ut laboretuoi et dolore magna aliqua. Ut enim adm minim veniam, quis nostrud exercitati ullam...  ",
  },
  {
    name: "Marie",
    user: User3,
    date: "16 Jan",
    role: "Writer",
    review: "Simple, Fast, and Effective",
    review_detail:
      "Lorem ipsum dolori sit amet, consectetu adipiscing elit, sed doit eiusmod tempor incididunt ut laboretuoi et dolore magna aliqua. Ut enim adm minim veniam, quis nostrud exercitati ullam...  ",
  },
  {
    name: "Jophra",
    user: User4,
    date: "10 Jan",
    role: "Writer",
    review: "Best for writers",
    review_detail:
      "Lorem ipsum dolori sit amet, consectetu adipiscing elit, sed doit eiusmod tempor incididunt ut laboretuoi et dolore magna aliqua. Ut enim adm minim veniam, quis nostrud exercitati ullam...  ",
  },
];

const Testimonials = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  return (
    <section className="mb-12 px-4 xl:p-0 relative py-12 lg:py-0">
      <div className="container">
        {/* Heading and Navigation Buttons */}
        <div className="flex justify-between items-center relative">
          <h3 className="text-4xl text-gray-700 font-caudex font-semibold mb-2">
            User Insights
          </h3>

          {/* Navigation Buttons (Always Visible) */}
          <div className="flex gap-4">
            <button
              ref={prevRef}
              className="p-3 w-10 h-10 rounded-full hover:cursor-pointer bg-gray-200 hover:bg-main hover:text-white transition flex items-center justify-center shadow-md"
            >
              <FaArrowLeft />
            </button>
            <button
              ref={nextRef}
              className="p-3 w-10 h-10 rounded-full hover:cursor-pointer bg-gray-200 hover:bg-main hover:text-white transition flex items-center justify-center shadow-md"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Underline */}
        <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>

        {/* Swiper Carousel */}
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true} // Enable Loop
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          grabCursor={true} // Enable Dragging
          breakpoints={{
            640: { slidesPerView: 1, draggable: true },
            768: { slidesPerView: 2, draggable: true },
            1024: { slidesPerView: 3, draggable: true },
          }}
          className="mt-8"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="p-8 bg-[#F9F7F4] shadow-sm rounded-md text-gray-700">
                <div className="flex gap-3">
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
                    <img
                      src={t.user}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-medium mb-1">
                      {t.name} • <span className="text-sm">{t.date}</span>
                    </h4>
                    <p className="text-gray-700 text-sm">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <h3 className="my-3 font-semibold">{t.review}</h3>
                <p className="mt-2 text-[15px] tracking-wide">
                  {t.review_detail}
                </p>
                <Link className="text-main py-4 block text-[15px]">
                  Read more
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
