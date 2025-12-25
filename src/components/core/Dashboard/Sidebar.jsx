import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    
  <>
    <button
    onClick={() => setIsSidebarOpen(true)}
  className="md:hidden text-gray-300 p-2 flex items-start "
   >
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
      </button>

     

     

     {/* Overlay (Mobile only) */}
  {isSidebarOpen && (
    <div
      onClick={() => setIsSidebarOpen(false)}
      className="fixed inset-0 z-40 bg-black/50 md:hidden"
    />
  )}

  {/* Sidebar */}

  <div
    className={`
      fixed z-50 h-[calc(100vh-3.5rem)] w-[220px]
      bg-richblack-800 border-r border-richblack-700
      transform transition-transform duration-300
      md:static md:translate-x-0 
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
  >
    <div className="flex relative h-full flex-col py-10">
    <button
  onClick={() => setIsSidebarOpen(false)}
  className="absolute pl-2  top-1 md:hidden font-bold text-xl text-richblack-200"
>
  ✕
</button>

      {/* Links */}
      <div className="flex flex-col">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null
          return (
            <SidebarLink
              key={link.id}
              link={link}
              iconName={link.icon}
              onClick={() => setIsSidebarOpen(false)} // close on mobile click
            />
          )
        })}
      </div>

      <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700" />

      {/* Bottom actions */}
      <div className="flex flex-col">
        <SidebarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
          onClick={() => setIsSidebarOpen(false)}
        />

        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="px-8 py-2 text-sm font-medium text-richblack-300"
        >
          <div className="flex items-center gap-x-2">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>
    </div>
  </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}