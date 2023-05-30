import React, { useState } from "react"
import { createTask, updateProject } from "../utils/api-interceptor"
import { useNavigate, useParams } from "react-router-dom"
import { DatePicker } from "antd"

const NewTaskModal = ({ setIsTaskOpen }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [endDate, setEndDate] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  const handleCreateTask = async (e) => {
    e.preventDefault()
    console.log(id)
    try {
      const res = await createTask({
        ticketId: parseInt(id),
        title,
        description,
        endDate,
      })

      if (res.status === 201) {
        alert("New Task Added Successully")
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
      alert(error?.response?.data?.message)
    }
  }

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date.toISOString()
      setEndDate(formattedDate)
    } else {
      setEndDate(null)
    }
  }

  return (
    <div className="fixed bg-black/90 flex justify-center items-center h-screen w-screen ">
      <div className="p-9 bg-white w-1/4  flex flex-col gap-8 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl">Add New Task</h1>
          <span
            className="cursor-pointer text-xl"
            onClick={() => setIsTaskOpen(false)}
          >
            X
          </span>
        </div>

        <form className="flex flex-col gap-5">
          <label>
            Title
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
              value={title}
            />
          </label>
          <label>
            Description
            <textarea
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Title"
              value={description}
            />
          </label>
          <label>
            End Date
            <div className="flex items-center justify-between mt-1">
              <DatePicker
                onChange={handleDateChange}
                format={"DD-MM-YYYY"}
                className="w-full text-lg  p-3 border border-solid border-grayish text-black placeholder:text-black"
              />
            </div>
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md"
              onClick={(e) => handleCreateTask(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTaskModal
