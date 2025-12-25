import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

 return (
  <>
    <div
      className="
        my-8 md:my-10
        flex flex-col sm:flex-row
        gap-4 sm:gap-x-5
        rounded-md
        border border-pink-700
        bg-pink-900
        p-6 sm:p-8 sm:px-12
      "
    >
      {/* Icon */}
      <div
        className="
          flex h-12 w-12 sm:h-14 sm:w-14
          items-center justify-center
          rounded-full
          bg-pink-700
        "
      >
        <FiTrash2 className="text-2xl sm:text-3xl text-pink-200" />
      </div>

      {/* Content */}
      <div className="flex flex-col space-y-2">
        <h2 className="text-base sm:text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>

        <div className="w-full sm:w-3/5 text-sm sm:text-base text-pink-25 space-y-1">
          <p>Would you like to delete account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the content associated with it.
          </p>
        </div>

        <button
          type="button"
          className="
            w-fit
            cursor-pointer
            italic
            text-sm sm:text-base
            text-pink-300
          "
          onClick={handleDeleteAccount}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  </>
)

}