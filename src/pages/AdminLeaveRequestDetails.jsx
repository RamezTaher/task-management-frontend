import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {
  getEmployeeById,
  getLeaveRequestById,
  getLeaveTypeById,
  updateEmployee,
  updateLeaveRequest,
} from "../utils/api-interceptor"
import { Progress } from "antd"
import { differenceInDays, format, parseISO } from "date-fns"

const AdminLeaveRequestDetails = () => {
  const { id } = useParams()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const employeeId = searchParams.get("employee")

  const [employee, setEmployee] = useState({})
  const [leaveRequest, setLeaveRequest] = useState({})
  const [leaveType, setLeaveType] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    getEmployeeById(employeeId)
      .then(({ data }) => {
        setEmployee(data)
      })
      .catch((err) => console.log(err))

    getLeaveRequestById(id)
      .then(({ data }) => {
        setLeaveRequest(data)
      })
      .catch((err) => console.log(err))

    getLeaveTypeById(leaveRequest.leaveType)
      .then(({ data }) => {
        setLeaveType(data)
      })
      .catch((err) => console.log(err))
  }, [employeeId, id, leaveRequest.leaveType])

  const handleApprove = async (e) => {
    e.preventDefault()

    try {
      const res = await updateLeaveRequest(id, {
        status: "approved",
      })
      const resEmployee = await updateEmployee(employeeId, {
        leaveDaysLeft:
          employee.leaveDaysLeft -
          differenceInDays(
            parseISO(leaveRequest.endDate),
            parseISO(leaveRequest.startDate)
          ),
      })
      if (res.status === 200 && resEmployee.status === 200) {
        alert("Request Approved  Successfully")
        navigate("/admin/leave-request")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDecline = async (e) => {
    e.preventDefault()

    try {
      const res = await updateLeaveRequest(id, {
        status: "rejected",
      })

      if (res.status === 200) {
        alert("Request Rejected")
        navigate("/admin/leave-request")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto h-full py-10">
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semiBold mb-6">Leave Day Request:</h1>

            <div className="grid grid-cols-2 gap-12">
              <div className="col-span-1 flex flex-col gap-6 ">
                <h1 className="text-xl font-semiBold mb-4">Employee Info</h1>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Employee Name</div>
                  <div>{employee.name}</div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Employee Email</div>
                  <div>{employee.email}</div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Employee Phone</div>
                  <div>{employee.phone}</div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div className="flex flex-col gap-3 justify-center items-center text-lg font bold">
                    <div>Leave Day Rest</div>
                    <Progress
                      type="circle"
                      percent={employee.leaveDaysLeft}
                      format={(percent) => `${percent} Days`}
                    />
                  </div>
                  <div className="flex flex-col gap-3 justify-center items-center text-lg font bold">
                    <div>Leave Day Taken</div>
                    <Progress
                      type="circle"
                      percent={30 - employee.leaveDaysLeft}
                      format={(percent) => `${percent} Days`}
                      strokeColor="red"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-6">
                <img
                  src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />
              </div>

              <div className="col-span-1 flex flex-col gap-6">
                <img
                  src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />
              </div>

              <div className="col-span-1 flex flex-col gap-6 ">
                <h1 className="text-xl font-semiBold mb-4">
                  Leave Request Info
                </h1>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Leave Type</div>
                  <div>{leaveType.name}</div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Leave Max Day/Year</div>
                  <div>{leaveType.maxDaysPerYear} day</div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Requested At</div>
                  <div>
                    {leaveRequest.createdAt &&
                      format(parseISO(leaveRequest.createdAt), "dd/MM/yyyy")}
                  </div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Start Date</div>
                  <div>
                    {leaveRequest.startDate &&
                      format(parseISO(leaveRequest.startDate), "dd/MM/yyyy")}
                  </div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>End Date</div>
                  <div>
                    {leaveRequest.endDate &&
                      format(parseISO(leaveRequest.endDate), "dd/MM/yyyy")}
                  </div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Leave Period</div>
                  <div>
                    {leaveRequest.endDate &&
                      differenceInDays(
                        parseISO(leaveRequest.endDate),
                        parseISO(leaveRequest.startDate)
                      )}{" "}
                    Day
                  </div>
                </div>
                {leaveRequest.status == "pending" && (
                  <div className="flex items-center justify-between text-lg font bold">
                    <div>Decision</div>
                    <div className="flex items-center gap-2">
                      <button
                        className="w-[120px] bg-green-500 text-white py-2 rounded-md text-lg cursor-pointer"
                        onClick={(e) => handleApprove(e)}
                      >
                        Approve
                      </button>
                      <button
                        className="w-[120px] bg-red-500 text-white py-2 rounded-md text-lg cursor-pointer"
                        onClick={(e) => handleDecline(e)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminLeaveRequestDetails
