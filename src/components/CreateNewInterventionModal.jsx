import React, { useEffect, useState } from "react"
import {
  createIntervention,
  createTask,
  getAllInterventionTypes,
  updateProject,
} from "../utils/api-interceptor"
import { useNavigate, useParams } from "react-router-dom"
import { DatePicker } from "antd"
import { parseISO } from "date-fns"
const { RangePicker } = DatePicker

const CreateNewInterventionModal = ({ setIsNewInterventionOpen }) => {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [interventionTypeId, setInterventionTypeId] = useState(null)
  const [allInterventionsTypes, setAllInterventionsTypes] = useState([])

  const handleCreateIntervention = async (e) => {
    e.preventDefault()
    if (endDate && startDate) {
      try {
        const res = await createIntervention({
          startDate: parseISO(startDate),
          endDate: parseISO(endDate),
          interventionTypeId,
        })

        if (res.status === 201) {
          alert("New Intervention created Successully")
          window.location.reload()
        }
      } catch (error) {
        console.log(error)
        alert(error?.response?.data?.message)
      }
    } else {
      alert("fill all fields")
    }
  }

  useEffect(() => {
    getAllInterventionTypes()
      .then(({ data }) => {
        setAllInterventionsTypes(data)
        setInterventionTypeId(data[0].id)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0])
    setEndDate(dateStrings[1])
  }

  return (
    <div className="fixed bg-black/90 flex justify-center items-center h-screen w-screen ">
      <div className="p-9 bg-white w-1/3  flex flex-col gap-8 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl">Request Intervention</h1>
          <span
            className="cursor-pointer text-xl"
            onClick={() => setIsNewInterventionOpen(false)}
          >
            X
          </span>
        </div>

        <form className="flex flex-col gap-5">
          <label>
            Intervention Type
            <select
              className="p-3 border border-solid border-grayish rounded"
              onChange={(e) => setInterventionTypeId(e.target.value)}
            >
              {allInterventionsTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="employee">
            <div className="flex items-center justify-between">
              <div>Start Date</div>
              <div>End Date</div>
            </div>
            <RangePicker
              onChange={handleChange}
              className="py-3 border-secondary-tint"
              size="large"
            />
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md"
              onClick={(e) => handleCreateIntervention(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNewInterventionModal
