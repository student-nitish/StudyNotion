import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [pageLoading,setPageLoading]=useState(false);

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const getEnrolledCourses = async () => {
      setPageLoading(true);
    try {
      
      const res = await getUserEnrolledCourses(token);
      console.log("enrolled courses",res);
      setEnrolledCourses(res);
  
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }

    finally{
           setPageLoading(false);
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, [])

  if(pageLoading){
    return(
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

  return (
  <>
    <div className="mb-6 text-2xl md:text-3xl text-richblack-50">
      Enrolled Courses
    </div>

    {!enrolledCourses ? (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    ) : !enrolledCourses.length ? (
      <p className="grid h-[10vh] w-full place-content-center text-richblack-5 text-center">
        You have not enrolled in any course yet.
      </p>
    ) : (
      <div className="my-6 md:my-8 text-richblack-5">
        {/* Headings (Desktop only) */}
        <div className="hidden md:flex rounded-t-lg bg-richblack-500">
          <p className="w-[45%] px-5 py-3">Course Name</p>
          <p className="w-1/4 px-2 py-3">Duration</p>
          <p className="flex-1 px-2 py-3">Progress</p>
        </div>

        {/* Course Rows */}
        {enrolledCourses.map((course, i, arr) => (
          <div
            key={i}
            className={`
              flex flex-col md:flex-row
              border border-richblack-700
              ${i === arr.length - 1 ? "md:rounded-b-lg" : ""}
            `}
          >
            {/* Course Info */}
            <div
              className="flex md:w-[45%] cursor-pointer items-center gap-4 px-4 md:px-5 py-4"
              onClick={() => {
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                )
              }}
            >
              <img
                src={course.thumbnail}
                alt="course_img"
                className="h-12 w-12 md:h-14 md:w-14 rounded-lg object-cover"
              />

              <div className="flex flex-col gap-1 max-w-full">
                <p className="font-semibold text-sm md:text-base">
                  {course.courseName}
                </p>
                <p className="text-xs text-richblack-300 line-clamp-2">
                  {course.courseDescription.length > 50
                    ? `${course.courseDescription.slice(0, 50)}...`
                    : course.courseDescription}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="px-4 md:px-2 py-2 md:py-3 text-sm md:w-1/4">
              <span className="md:hidden text-richblack-400 mr-1">
                Duration:
              </span>
              {course?.totalDuration}
            </div>

            {/* Progress */}
            <div className="flex flex-col gap-2 px-4 md:px-2 py-3 md:w-1/5">
              <p className="text-sm">
                Progress: {course.progressPercentage || 0}%
              </p>
              <ProgressBar
                completed={course.progressPercentage || 0}
                height="8px"
                isLabelVisible={false}
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </>
)

}