import { useEffect, useState } from "react"
import { AiOutlineDown  } from "react-icons/ai"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
  <>
  <button
  onClick={() => setIsSidebarOpen(true)}
  className="md:hidden p-2 flex items-start text-2xl text-richblack-300"
>
  ☰
</button>

  {isSidebarOpen && (
    <div
      onClick={() => setIsSidebarOpen(false)}
      className="fixed inset-0 z-40 bg-black/50 md:hidden"
    />
  )}
  <div
    className={`
      fixed z-50
      h-[calc(100vh-3.5rem)]
      w-[320px] max-w-[350px]
      flex flex-col
      border-r border-richblack-700
      bg-richblack-800
      transform transition-transform duration-300
      md:static md:translate-x-0
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
  >

    <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
      <div className="flex w-full items-center justify-between">
        <div
          onClick={() => {
            navigate(`/dashboard/enrolled-courses`)
            setIsSidebarOpen(false)
          }}
          className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
          title="back"
        >
          <IoIosArrowBack size={30} />
        </div>

        <IconBtn
          text="Add Review"
          customClasses="ml-auto"
          onclick={() => setReviewModal(true)}
        />
      </div>

      <div className="flex flex-col">
        <p>{courseEntireData?.courseName}</p>
        <p className="text-sm font-semibold text-richblack-500">
          {completedLectures?.length} / {totalNoOfLectures}
        </p>
      </div>
    </div>

    <div className="h-[calc(100vh-5rem)] overflow-y-auto">
      {courseSectionData.map((course, index) => (
        <div
          className="mt-2 cursor-pointer text-sm text-richblack-5"
          onClick={() => setActiveStatus(course?._id)}
          key={index}
        >
          <div className="flex justify-between bg-richblack-600 px-5 py-4">
            <div className="w-[70%] font-semibold">
              {course?.sectionName}
            </div>
            <span
              className={`${
                activeStatus === course?._id ? "rotate-180" : "rotate-0"
              } transition-all duration-500`}
            >
              <AiOutlineDown />
            </span>
          </div>

          {activeStatus === course?._id && (
            <div className="transition-[height] duration-500 ease-in-out">
              {course.subSection.map((topic, i) => (
                <div
                  key={i}
                  className={`flex gap-3 px-5 py-2 ${
                    videoBarActive === topic._id
                      ? "bg-yellow-200 font-semibold text-richblack-800"
                      : "hover:bg-richblack-900"
                  }`}
                  onClick={() => {
                    navigate(
                      `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                    )
                    setVideoBarActive(topic._id)
                    setIsSidebarOpen(false)
                  }}
                >
                  <input
                    type="checkbox"
                    checked={completedLectures.includes(topic?._id)}
                    onChange={() => {}}
                  />
                  {topic.title}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</>

  )
}
