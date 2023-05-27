import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import {
  getLeaveRequestByEmployee,
  getLeaveTypes,
  postLeaveRequest,
} from "../utils/api-interceptor"
import Header from "../components/Header"
import { DatePicker } from "antd"
import { parseISO } from "date-fns"
import TableRow from "../components/TableRow"
const { RangePicker } = DatePicker

const EmployeeLeaveRequest = () => {
  const { pathname } = useLocation()
  const employeeId = pathname.split("/")[3]
  const [leaveRequests, setLeaveRequests] = useState([])
  const [leaveType, setLeaveType] = useState("")
  const [leaveTypes, setLeaveTypes] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    getLeaveRequestByEmployee(employeeId)
      .then(({ data }) => {
        setLeaveRequests(data)
      })
      .catch((err) => console.log(err))

    getLeaveTypes()
      .then(({ data }) => {
        setLeaveTypes(data)
        setLeaveType(data[0]._id)
      })
      .catch((err) => console.log(err))
  }, [employeeId])

  const leaveRequestHandler = async (e) => {
    e.preventDefault()
    setError("")

    if (
      employeeId === "" ||
      leaveType === "" ||
      startDate === "" ||
      endDate === ""
    ) {
      setError("All fields are required!")
      return
    }

    try {
      const leaveRequest = await postLeaveRequest({
        employee: employeeId,
        leaveType,
        startDate: parseISO(startDate),
        endDate: parseISO(endDate),
      })

      console.log(leaveRequest)
      if (leaveRequest) {
        alert("request successfully sent")
        window.location.reload()
      }
    } catch (error) {
      setError(error.response.data)
      console.log(error)
    }
  }

  const handleChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0])
    setEndDate(dateStrings[1])
  }

  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto h-full py-10 space-y-10">
          <div>
            <h1 className="text-2xl font-semiBold mb-6">Request a Leave Day</h1>
            {error !== "" && (
              <p className="text-red-500 mb-3 text-lg font-meduim max-w-sm">
                {error}
              </p>
            )}
            <form
              onSubmit={leaveRequestHandler}
              className="flex flex-col gap-5"
            >
              <label htmlFor="employee">
                Employee Id
                <input type="text" value={employeeId} readOnly />
              </label>

              <label htmlFor="leaveType">
                Leave Type
                <select onChange={(e) => setLeaveType(e.target.value)}>
                  {leaveTypes.map((leaveType, idx) => (
                    <option key={idx} value={leaveType._id}>
                      {leaveType.name} - max period({leaveType.maxDaysPerYear}
                      day)
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
                  onClick={leaveRequestHandler}
                  type="submit"
                  className="bg-blue-400 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md"
                >
                  Request a Leave
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-semiBold mb-6">
              Leave Request History
            </h1>
            <table className="border-secondary-tint border-solid border-2 border-collapse w-full table">
              <thead>
                <tr>
                  <th>Leave Request ID</th>
                  <th>Employee </th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Period</th>
                  <th>Requested at</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((element, idx) => (
                  <TableRow info={element} key={idx} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default EmployeeLeaveRequest
