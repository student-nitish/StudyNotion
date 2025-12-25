import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';

function CourseDetailsCard({course, setConfirmationModal, handleBuyCourse}) {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,

    } = course;

    console.log("COURSE DATA",course);


    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you cant buy a course");
            return;
        }
        if(token) {
            console.log("dispatching add to cart")
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1Text:" login ",
            btn2Text:"cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }

  return (
  <div className="bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden border border-gray-700 w-full max-w-[380px] mx-auto flex flex-col">
    {/* Thumbnail */}
    <img
      src={ThumbnailImage}
      alt="Thumbnail Image"
      className="w-full h-[180px] object-cover rounded-t-2xl"
    />

    {/* Price Section */}
    <div className="p-4 flex flex-col gap-4">
      <div className="text-2xl font-bold text-yellow-400">₹ {CurrentPrice}</div>

      {/* Buy / Go to Course Buttons */}
      <div className="flex flex-col gap-3">
        <button
          className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded-md transition duration-200"
          onClick={
            user && course?.studentsEnrolled.includes(user?._id)
              ? () => navigate("/dashboard/enrolled-courses")
              : handleBuyCourse
          }
        >
          {user && course?.studentsEnrolled.includes(user?._id)
            ? "Go to Course"
            : "Buy Now"}
        </button>

        {!course?.studentsEnrolled.includes(user?._id) && (
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-transparent border border-yellow-400 hover:bg-yellow-400 hover:text-gray-900 text-yellow-400 font-semibold rounded-md transition duration-200"
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Guarantee and Course Includes */}
      <div className="border-t border-gray-700 pt-4 space-y-3">
        <p className="text-xs text-gray-400 italic">
          30-Day Money-Back Guarantee
        </p>
        <p className="text-base font-semibold text-blue-400">
          This Course Includes:
        </p>
        <div className="flex flex-col gap-1">
          {course?.instructions?.map((item, index) => (
            <p
              key={index}
              className="flex items-center gap-2 text-gray-300 text-sm"
            >
              <span className="text-yellow-400">•</span>
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Share Button */}
      <div>
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-600 hover:bg-gray-800 rounded-md text-gray-300 hover:text-yellow-400 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 12v.01M12 4h.01M20 12v.01M12 20h.01M4.93 4.93l.01.01M19.07 19.07l.01.01M4.93 19.07l.01-.01M19.07 4.93l.01-.01M12 8v8m-4-4h8"
            />
          </svg>
          Share
        </button>
      </div>
    </div>
  </div>
);



}

export default CourseDetailsCard