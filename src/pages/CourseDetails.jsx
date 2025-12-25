import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { setCourse } from '../slices/courseSlice';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/RatingStars"
import { formatDate } from '../services/formatDate';
import Footer from "../components/common/Footer"

import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';

const CourseDetails = () => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {paymentLoading} = useSelector((state)=> state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId}  = useParams();
    const [pageLoading, setPageLoading] = useState(true);

    const [courseData , setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(()=> {
        const getCourseFullDetails = async() => {
            try{
              setPageLoading(true);
                const result = await fetchCourseDetails(courseId);
                console.log("Printing CourseData-> " , result);
                setCourseData(result);
                setPageLoading(false);
            }
            catch(error) {
                console.log("Could not fetch coursse details");
            }
        }
        getCourseFullDetails();
        
    }, [courseId]);

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAverageReviewCount(count);
    },[courseData])

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(()=> {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);

    },[courseData]);


    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => { 
        setIsActive(
            !isActive.includes(id)
             ? isActive.concat(id)
             : isActive.filter((e)=> e != id)

        )
    }

    const handleBuyCourse = () => {
        
        if(token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1:"you are not Logged in",
            text2:"Please login to purchase the course",
            btn1Text:" Login ",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })

    }

  if (pageLoading) {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="space-y-4 w-full max-w-xl">
        <div className="flex items-center gap-4">
          <div className="skeleton skeleton-thumbnail"></div>
          <div className="flex-1 space-y-2">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="skeleton skeleton-thumbnail"></div>
          <div className="flex-1 space-y-2">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        </div>
      </div>
    </div>
  )
}


    if(!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }
    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data?.courseDetails;

  return (
  <div className="flex flex-col bg-gradient-to-b from-richblack-900 to-richblack-800 text-white min-h-screen">
    {/* Course Header */}
    <div className="relative flex flex-col lg:flex-row justify-between items-start gap-6 p-6 ml-0 lg:ml-20 lg:p-10 border-b border-gray-700">
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-blue-400">{courseName}</h1>
        <p className="text-gray-300 text-base leading-relaxed">{courseDescription}</p>

        {/* Ratings Section */}
        <div className="flex flex-wrap items-center gap-3 text-gray-300">
          <span className="font-semibold text-lg">{avgReviewCount.toFixed(1)}</span>
          <RatingStars Review_Count={avgReviewCount} Star_Size={22} />
          <span className="text-sm text-gray-400">
            ({ratingAndReviews.length} review)
          </span>
          <span className="text-sm text-gray-400">
            • {studentsEnrolled.length} students enrolled
          </span>
        </div>

        {/* Instructor & Meta Info */}
        <div className="text-sm text-gray-400 space-y-1">
          <p>
            Created by{" "}
            <span className="font-medium text-blue-300">
              {instructor.firstName}
            </span>
          </p>
          <p>
            Created At:{" "}
            <span className="text-gray-200">{formatDate(createdAt)}</span> • English
          </p>
        </div>
      </div>

      {/* Course Card */}
      <div className="w-full lg:w-[350px] bg-gray-800 border border-gray-700 rounded-2xl p-5 mr-16 shadow-lg">
        <CourseDetailsCard
          course={courseData?.data?.courseDetails}
          setConfirmationModal={setConfirmationModal}
          handleBuyCourse={handleBuyCourse}
        />
      </div>
    </div>

    {/* What You'll Learn */}
    <div className="p-6 lg:p-10 border-b border-gray-700">
      <h2 className="text-2xl font-semibold text-blue-400 mb-3">
        What You'll Learn
      </h2>
      <div className="bg-gray-800 rounded-xl p-5 text-gray-300 text-base leading-relaxed">
        {whatYouWillLearn}
      </div>
    </div>

    {/* Course Content */}
    <div className="p-6 lg:p-10 space-y-4">
      <h2 className="text-2xl font-semibold text-blue-400">Course Content</h2>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
          <span className="font-medium">{courseContent.length} section(s)</span>
          <span>{totalNoOfLectures} lectures</span>
          <span>{courseData.data?.totalDuration} total length</span>
        </div>

        <button
          onClick={() => setIsActive([])}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition duration-200"
        >
          Collapse all Sections
        </button>

           </div>
                   <div className="py-4">
                      {courseContent?.map((course, index) => (
                        <CourseAccordionBar
                          course={course}
                          key={index}
                          isActive={isActive}
                          handleActive={handleActive}
                        />
                      ))}
                    </div>

              <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
    </div>
    <Footer />

    {/* Confirmation Modal */}
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
  </div>
);

}

export default CourseDetails
