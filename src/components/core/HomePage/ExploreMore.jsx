import React from 'react'
import  {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import { useState } from 'react';
import CourseCard  from '../HomePage/Card'


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


 return (
  <div className="relative px-4 lg:px-0">

    {/* Heading */}
    <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">
      Unlock the <HighlightText text={"Power of Code"} />
    </div>

    {/* Subheading */}
    <p className="text-center text-richblack-300 text-sm sm:text-base mt-3">
      Learn to build anything you can imagine
    </p>

    {/* Tabs */}
    <div
      className="
        mt-4 flex flex-wrap lg:flex-nowrap
        justify-center gap-2
        rounded-full bg-richblack-800
        border border-richblack-100
        px-2 py-2
      "
    >
      {tabsName.map((element, index) => (
        <div
          key={index}
          onClick={() => setMyCards(element)}
          className={`
            text-sm sm:text-base
            flex items-center gap-2
            rounded-full cursor-pointer
            transition-all duration-200
            px-5 py-2
            ${
              currentTab === element
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"
            }
          `}
        >
          {element}
        </div>
      ))}
    </div>

    {/* Spacer for desktop absolute cards */}
    <div className="hidden lg:block lg:h-[150px]" />

    {/* Course Cards */}
    <div
      className="
        mt-8 lg:mt-0
        flex flex-col sm:flex-row
        gap-6 lg:gap-10
        justify-center
        w-full
        lg:absolute lg:-bottom-36
      "
    >
      {courses.map((element, index) => (
        <CourseCard
          key={index}
          cardData={element}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
      ))}
    </div>

  </div>
);

}

export default ExploreMore
