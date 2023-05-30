import React, { useState } from "react"
import { createInterventionType, createTask, updateProject } from "../utils/api-interceptor"
import { useNavigate, useParams } from "react-router-dom"
import { DatePicker } from "antd"

const NewInterventionModal = ({ setIsNewOpen }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const handleCreateType = async (e) => {
    e.preventDefault()
    try {
      const res = await createInterventionType({
        name,
        description,
      })

      if (res.status === 201) {
        alert("New Intervention Type Added Successully")
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
      alert(error?.response?.data?.message)
    }
  }

  return (
    <div className="fixed bg-black/90 flex justify-center items-center h-screen w-screen ">
      <div className="p-9 bg-white w-1/4  flex flex-col gap-8 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Add New Intervention Type</h1>
          <span
            className="cursor-pointer text-xl"
            onClick={() => setIsNewOpen(false)}
          >
            X
          </span>
        </div>

        <form className="flex flex-col gap-5">
          <label>
            Name
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              value={name}
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

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md"
              onClick={(e) => handleCreateType(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewInterventionModal
