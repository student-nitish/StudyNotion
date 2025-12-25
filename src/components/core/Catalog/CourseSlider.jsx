import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/free-mode"
import "swiper/css/pagination"


import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  return (
  <>
    {Courses?.length ? (
      <div className="w-full py-10">
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper px-4 sm:px-8 md:px-10"
        >
          {Courses?.map((course, index) => (
            <SwiperSlide
              key={index}
              className="transition-transform hover:scale-[1.02] duration-300"
            >
              <div className="flex justify-center">
                <Course_Card course={course} Height="h-[250px]" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    ) : (
      <p className="text-center text-gray-400 py-10 text-lg">
        No Course Found
      </p>
    )}
  </>
);

}

export default CourseSlider
