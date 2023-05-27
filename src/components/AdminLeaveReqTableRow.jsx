import { differenceInDays, format, parseISO } from "date-fns"
import React from "react"
import { FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"

const AdminLeaveReqTableRow = ({ info }) => {
  return (
    <tr>
      <td>{info?._id}</td>
      <td>{info?.employee}</td>
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

      <td>
        <Link
          to={`/admin/leave-request/${info?._id}?employee=${info.employee}`}
        >
          <div className="h-full w-full flex items-center justify-center">
            <FaTimes size={18} />
          </div>
        </Link>
      </td>
    </tr>
  )
}

export default AdminLeaveReqTableRow
