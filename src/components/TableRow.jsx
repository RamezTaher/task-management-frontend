import React, { useEffect, useState } from "react"
import { getLeaveTypeById } from "../utils/api-interceptor"
import { format, parseISO, differenceInDays } from "date-fns"

const TableRow = ({ info }) => {
  const [employee, setEmployee] = useState(
    JSON.parse(localStorage.getItem("userInfo")).employee.name
  )

  const [leaveType, setLeaveType] = useState({})

  useEffect(() => {
    getLeaveTypeById(info.leaveType)
      .then(({ data }) => {
        setLeaveType(data)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <tr>
      <td>{info?._id}</td>
      <td>{employee}</td>
      <td>{leaveType.name}</td>
      <td>{format(parseISO(info.startDate), "dd/MM/yyyy")}</td>
      <td>{format(parseISO(info.endDate), "dd/MM/yyyy")}</td>
      <td>
        {differenceInDays(parseISO(info.endDate), parseISO(info.startDate))} Day
      </td>
      <td> {format(parseISO(info.createdAt), "dd/MM/yyyy")}</td>
      <td
        className={
          info.status === "pending"
            ? "bg-yellow-400"
            : info.status === "approved"
            ? "bg-green-600"
            : "bg-red-600"
        }
      >
        {info.status}
      </td>
    </tr>
  )
}

export default TableRow
