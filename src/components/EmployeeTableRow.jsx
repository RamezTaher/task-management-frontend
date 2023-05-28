import React, { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

const EmployeeTableRow = ({ info }) => {
  const navigate = useNavigate()
  const [department, setDepartment] = useState({})

  useEffect(() => {
    getDepartmentById(info.department)
      .then(({ data }) => {
        setDepartment(data)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleEdit = () => {
    navigate(`/admin/employee/${info._id}`)
  }
  return (
    <tr>
      <td>{info?._id}</td>
      <td>{info?.name}</td>
      <td>{info?.leaveDaysLeft}</td>
      <td>{info?.department}</td>
      <td>{department?.name}</td>
      <td>{info?.phone}</td>
      <td>{info?.email}</td>
      <td>{format(parseISO(info?.createdAt), "dd/MM/yyyy")}</td>
      <td>
        <div className="h-full w-full flex justify-center items-center">
          <div
            className="w-8 h-8 bg-green-500 text-white flex justify-center items-center cursor-pointer"
            onClick={handleEdit}
          >
            <AiFillEdit size={24} />
          </div>
        </div>
      </td>
    </tr>
  )
}

export default EmployeeTableRow
