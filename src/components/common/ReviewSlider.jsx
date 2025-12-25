import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules

import { FreeMode, Pagination, Autoplay } from "swiper/modules";


// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  // console.log(reviews)
return (
  <div className="text-white px-4 sm:px-6">
    <div className="my-8 lg:my-[50px] max-w-maxContentTab lg:max-w-maxContent mx-auto">
      <Swiper
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="w-full"
      >
        {reviews.map((review, i) => (
          <SwiperSlide key={i}>
            <div className="flex h-full flex-col gap-3 rounded-lg bg-richblack-800 p-4 text-sm text-richblack-25">
              {/* User info */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    review?.user?.image
                      ? review.user.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                  alt=""
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover"
                />

                <div className="flex flex-col">
                  <h1 className="text-sm font-semibold text-richblack-5">
                   { `${review?.user?.firstName} ${review?.user?.lastName}`}
                  </h1>
                  <h2 className="text-xs font-medium text-richblack-400">
                    {review?.course?.courseName}
                  </h2>
                </div>
              </div>

              {/* Review text */}
              <p className="font-medium leading-relaxed text-richblack-25">
                {review?.review.split(" ").length > truncateWords
                  ? `${review.review
                      .split(" ")
                      .slice(0, truncateWords)
                      .join(" ")} ...`
                  : review.review}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-yellow-100">
                  {review.rating.toFixed(1)}
                </h3>
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={18}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
);

}

export default ReviewSlider
