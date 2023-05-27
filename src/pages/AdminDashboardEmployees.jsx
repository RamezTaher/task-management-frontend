import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { getEmployees } from "../utils/api-interceptor"
import EmployeeTableRow from "../components/EmployeeTableRow"

const AdminDashboardEmployees = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    getEmployees()
      .then(({ data }) => {
        setEmployees(data)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto h-full py-10">
          <div className="space-y-4">
            <h1 className="text-2xl font-semiBold mb-6">All Employees</h1>
            <table className="border-secondary-tint border-solid border-2 border-collapse w-full table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Days Left</th>
                  <th>Department ID</th>
                  <th>Department Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Joined at</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((element, idx) => (
                  <EmployeeTableRow info={element} key={idx} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminDashboardEmployees
