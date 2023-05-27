import React, { useEffect, useState } from "react"
import { Progress } from "antd"
import Header from "../components/Header"
import { getDepartmentById } from "../utils/api-interceptor"
import { useNavigate } from "react-router-dom"

const EmployeeDashboard = () => {
  const navigate = useNavigate()
  const requestALeave = () => {
    navigate(`/platform/leave-request/${user._id}`)
  }
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")).employee
  )

  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto h-full py-10">
          <div className="grid grid-cols-2 gap-12">
            <div className="col-span-1 flex flex-col gap-6">
              <h1 className="text-2xl font-semiBold mb-4">Employee Info</h1>
              <div className="flex items-center justify-between text-lg font bold">
                <div>Employee Name</div>
                <div>{user.name}</div>
              </div>
              <div className="flex items-center justify-between text-lg font bold">
                <div>Employee Email</div>
                <div>{user.email}</div>
              </div>
              <div className="flex items-center justify-between text-lg font bold">
                <div>Employee Phone</div>
                <div>{user.phone}</div>
              </div>
              <div className="flex items-center justify-between text-lg font bold">
                <div className="flex flex-col gap-3 justify-center items-center text-lg font bold">
                  <div>Leave Day Rest</div>
                  <Progress
                    type="circle"
                    percent={user.leaveDaysLeft}
                    format={(percent) => `${percent} Days`}
                  />
                </div>
                <div className="flex flex-col gap-3 justify-center items-center text-lg font bold">
                  <div>Leave Day Taken</div>
                  <Progress
                    type="circle"
                    percent={30 - user.leaveDaysLeft}
                    format={(percent) => `${percent} Days`}
                    strokeColor="red"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="btn bg-blue-500 text-white font-normal rounded-md w-[220px]"
                  onClick={requestALeave}
                >
                  Request A Leave
                </button>
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-6">
              <img
                src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default EmployeeDashboard
