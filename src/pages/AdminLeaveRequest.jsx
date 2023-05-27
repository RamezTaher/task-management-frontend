import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { getLeaveRequests } from "../utils/api-interceptor"
import AdminLeaveReqTableRow from "../components/AdminLeaveReqTableRow"

const AdminLeaveRequest = () => {
  const [leaveRequestStatus, setLeaveRequestStatus] = useState("")
  const [leaveRequests, setLeaveRequests] = useState([])

  useEffect(() => {
    getLeaveRequests(leaveRequestStatus)
      .then(({ data }) => {
        setLeaveRequests(data)
      })
      .catch((err) => console.log(err))
  }, [leaveRequestStatus])

  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto h-full py-10">
          <div className="space-y-4">
            <h1 className="text-2xl font-semiBold mb-6">Leave Requests:</h1>

            <div className="flex items-center gap-3 mb-4">
              <div>Status:</div>
              <div className="flex items-center gap-1">
                <div
                  className="bg-green-500 text-white px-2 py-1 cursor-pointer"
                  onClick={() => setLeaveRequestStatus("approved")}
                >
                  Approved
                </div>
                <div
                  className="bg-yellow-500 text-white px-2 py-1 cursor-pointer"
                  onClick={() => setLeaveRequestStatus("pending")}
                >
                  pending
                </div>
                <div
                  className="bg-red-500 text-white px-2 py-1 cursor-pointer"
                  onClick={() => setLeaveRequestStatus("rejected")}
                >
                  rejected
                </div>
                <div
                  className="bg-blue-500 text-white px-2 py-1 cursor-pointer"
                  onClick={() => setLeaveRequestStatus("")}
                >
                  all
                </div>
              </div>
            </div>

            <table className="border-secondary-tint border-solid border-2 border-collapse w-full table">
              <thead>
                <tr>
                  <th>Leave Request ID</th>
                  <th>Employee ID</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Period</th>
                  <th>Requested at</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((element, idx) => (
                  <AdminLeaveReqTableRow info={element} key={idx} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminLeaveRequest
