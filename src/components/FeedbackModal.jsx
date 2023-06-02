import React, { useState } from "react"
import { updateProject } from "../utils/api-interceptor"
import { useNavigate, useParams } from "react-router-dom"

const FeedbackModal = ({ setIsModelOpen }) => {
  const [feedback, setFeedback] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  const addFeedback = async (e) => {
    e.preventDefault()
    if (feedback) {
      try {
        const res = await updateProject(id, {
          feedback,
          status: "open",
        })

        if (res.status === 200) {
          alert("Feedback Added ")
          navigate("/platform/client/dashboard")
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("fill all fields")
    }
  }

  return (
    <div className="fixed bg-black/90 flex justify-center items-center h-screen w-screen ">
      <div className="p-9 bg-white w-1/4 h-[300px] flex flex-col gap-8 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl">Add Feedback</h1>
          <span
            className="cursor-pointer text-xl"
            onClick={() => setIsModelOpen(false)}
          >
            X
          </span>
        </div>

        <form className="flex flex-col gap-5">
          <label>
            Feedback
            <input
              type="text"
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter Feedback"
              value={feedback}
            />
          </label>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md"
              onClick={(e) => addFeedback(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FeedbackModal
