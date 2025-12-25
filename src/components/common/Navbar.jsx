import React, { useEffect } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { BsChevronDown } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx";




const Navbar = () => {
    console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart );
    const location = useLocation();
     const [loading, setLoading] = useState(false)

     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);



    const [subLinks, setsubLinks]  = useState([]);

    const fetchSublinks = async() => {
        try{
            
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result:" , result);
            setsubLinks(result.data.data);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }


    useEffect( () => {
        fetchSublinks();
    },[] )



    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <>
      <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 shadow-md'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        {/* Image */}
      <Link to="/">
        <img src={logo} width={160} height={42} loading='lazy'/>
      </Link>

      {/* Nav Links */}
    <nav className="hidden md:block">
  <ul className="flex gap-x-6 text-richblack-25">
    {NavbarLinks.map((link) => (
      <li key={link.title}>
        {link.title === "Catalog" ? (
          <div
            className={`group relative flex cursor-pointer items-center gap-1 ${
              matchRoute("/catalog/:catalogName")
                ? "text-yellow-25"
                : "text-richblack-25"
            }`}
          >
            <p>{link.title}</p>
            <BsChevronDown />

            {/* Dropdown */}
            <div className="invisible absolute left-1/2 top-full z-[1000] flex w-[200px] -translate-x-1/2 translate-y-2 flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-4 group-hover:opacity-100 lg:w-[300px]">
              {/* Small arrow */}
              <div className="absolute left-1/2 top-0 -z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 select-none rounded bg-richblack-5"></div>

              {loading ? (
                <p className="text-center">Loading...</p>
              ) : subLinks.length > 0 ? (
                <>
                  {subLinks
                    .filter((subLink) => subLink?.courses?.length > 0)
                    .map((subLink) => (
                      <Link
                        key={subLink._id || subLink.name}
                        to={`/catalog/${subLink.name
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                        className="rounded-lg bg-transparent py-3 pl-4 hover:bg-richblack-50"
                      >
                        <p>{subLink.name}</p>
                      </Link>
                    ))}
                </>
              ) : (
                <p className="text-center">No Courses Found</p>
              )}
            </div>
          </div>
        ) : (
          <Link to={link?.path}>
            <p
              className={`${
                matchRoute(link?.path)
                  ? "text-yellow-25"
                  : "text-richblack-25"
              }`}
            >
              {link.title}
            </p>
          </Link>
        )}
      </li>
    ))}
  </ul>
    </nav>

        {/* Login/SignUp/Dashboard */}
        <div className='flex gap-x-4 items-center'>

        {/* Mobile Menu Button */}
      <button
    className=" flex md:hidden text-richblack-25 items-end"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
    {
      !mobileMenuOpen && (  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
      >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16" 
    />
            </svg>)
    }

    {
      mobileMenuOpen && (
        <div className=' font-semibold text-2xl'> <RxCross2/> </div>
      )
    }
     </button>

            {
                
                user && user?.accountType !== "Instructor" && (
                    <Link to="/dashboard/cart" className='relative'>
                     <AiOutlineShoppingCart style={{ color: "white" }} />

                        {
                            totalItems > 0 && (
                                <span className="
                      absolute -top-2 -right-2
                   flex items-center justify-center
                    h-4 w-4
                   text-[10px] font-semibold
                     bg-yellow-200 text-white
                    rounded-full
                  border border-gray-900 animate-bounce
                    ">
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token===null && (
                    <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
                 
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropDown />
            }
            
        </div>


      </div>
    </div>

    {/* Mobile Menu */}
{mobileMenuOpen && (
  <div  className="md:hidden fixed inset-x-0 top-14 z-[999] bg-richblack-900 border-t border-richblack-700 animate-slideDown">
   <ul className="flex flex-col px-6 py-6 space-y-5 text-richblack-25">

 {NavbarLinks.map((link) => (
  <li key={link.title}>
    {link.title === "Catalog" ? (
      <>
        {/* Catalog Header */}
        <button
          onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
          className="flex w-full items-center gap-4 text-left font-semibold"
        >
          <span>Catalog</span>
          <BsChevronDown
            className={`transition-transform duration-300 ${
              mobileCatalogOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Accordion Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            mobileCatalogOpen ? "max-h-[500px] mt-3" : "max-h-0"
          }`}
        >
          <div className="pl-4 space-y-2">
            {subLinks
              .filter((subLink) => subLink?.courses?.length > 0)
              .map((subLink) => (
                <Link
                  key={subLink._id || subLink.name}
                  to={`/catalog/${subLink.name
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileCatalogOpen(false);
                  }}
                  className="block text-sm text-richblack-100 hover:text-yellow-25"
                >
                  {subLink.name}
                </Link>
              ))}
          </div>
        </div>
      </>
    ) : (
      <Link
        to={link.path}
        onClick={() => setMobileMenuOpen(false)}
        className={`block ${
          matchRoute(link.path)
            ? "text-yellow-25"
            : "text-richblack-25"
        }`}
      >
        {link.title}
      </Link>
    )}
  </li>
))}
</ul>

  </div>
)}

    </>

    

  )
}

export default Navbar
