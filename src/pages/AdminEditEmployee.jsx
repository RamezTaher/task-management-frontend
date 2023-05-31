import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { useNavigate, useParams } from "react-router-dom"
import {
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
} from "../utils/api-interceptor"

const AdminEditEmployee = () => {
  const navigate = useNavigate()
  const { id: urlID } = useParams()
  const [email, setEmail] = useState("")
  const [id, setId] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [leaveDay, setLeaveDay] = useState("")
  const [department, setDepartment] = useState("")
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    getEmployeeById(urlID)
      .then(({ data }) => {
        setId(data._id)
        setName(data.name)
        setEmail(data.email)
        setPhone(data.phone)
        setDepartment(data.department)
        setLeaveDay(data.leaveDaysLeft)
      })
      .catch((err) => console.log(err))
  }, [urlID])

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (isUpdate === true) {
      console.log(isUpdate)
      try {
        const res = await updateEmployee(urlID, {
          name,
          phone,
          email,
          leaveDaysLeft: leaveDay,
        })
        setIsUpdate(false)
        if (res.status === 200) {
          alert("Employee Updated Successfully")
          navigate("/admin/employee")
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log(isUpdate)
      setIsUpdate(!isUpdate)
    }
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const res = await deleteEmployee(urlID)
      const deletedEmployee = res.data
      alert(deletedEmployee.message)
      navigate("/admin/employee")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto h-full py-10">
          <div className="space-y-4">
            <h1 className="text-2xl font-semiBold mb-6">Employee Info:</h1>

            <form className="grid grid-cols-2 gap-6">
              <label htmlFor="id">
                Id
                <input
                  type="text"
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Id"
                  value={id}
                  readOnly
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name"
                  value={name}
                  readOnly={!isUpdate}
                />
              </label>

              <label htmlFor="email">
                Email
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  value={email}
                  readOnly={!isUpdate}
                />
              </label>
              <label htmlFor="phone">
                Phone
                <input
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  value={phone}
                  readOnly={!isUpdate}
                />
              </label>
              <label htmlFor="leaveday">
                Leave Day Left
                <input
                  type="text"
                  onChange={(e) => setLeaveDay(e.target.value)}
                  placeholder="Leave day Left"
                  value={leaveDay}
                  readOnly={!isUpdate}
                />
              </label>
              <label htmlFor="department">
                Department
                <input
                  type="text"
                  placeholder="Department"
                  value={department}
                  readOnly
                />
              </label>

              <div className=" col-span-2 flex justify-center gap-2">
                <button
                  className="bg-blue-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md w-[200px]"
                  onClick={(e) => handleUpdate(e)}
                >
                  {isUpdate ? "Submit" : "Edit"}
                </button>
                <button
                  className="bg-red-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md w-[200px]"
                  onClick={(e) => handleDelete(e)}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminEditEmployee
