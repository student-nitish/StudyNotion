import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
  <div className="group">
    <Link
      to={`/courses/${course._id}`}
      className="block bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={course?.thumbnail}
          alt="course thumbnail"
          className={`${Height} w-full object-cover rounded-t-xl`}
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Course Info */}
      <div className="p-4 flex flex-col gap-2">
        {/* Course Name */}
        <p className="text-lg font-semibold text-white group-hover:text-yellow-400 line-clamp-2">
          {course?.courseName}
        </p>

        {/* Instructor */}
        <p className="text-sm text-gray-400">
          {course?.instructor?.firstName} {course?.instructor?.lastName}
        </p>

        {/* Rating Section */}
        <div className="flex items-center gap-x-2 text-gray-300 mt-1">
          <span className="text-yellow-400 font-medium text-sm">
            {avgReviewCount.toFixed(1) || 0}
          </span>
          <RatingStars Review_Count={avgReviewCount} Star_Size={16} />
          <span className="text-xs text-gray-400">
            ({course?.ratingAndReviews?.length} Ratings)
          </span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-yellow-400 mt-2">
          ₹{course?.price}
        </p>
      </div>
    </Link>
  </div>
);

}

export default Course_Card
