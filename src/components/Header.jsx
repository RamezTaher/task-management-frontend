import React, { useState } from "react"
import { FaUserAlt } from "react-icons/fa"
import { VscRequestChanges } from "react-icons/vsc"
import { Link } from "react-router-dom"

const Header = ({ user }) => {
  return (
    <header className="h-[70px] bg-blue-400  text-white text-xl">
      <div className="flex justify-between items-center container sm:mx-auto h-full">
        <div>Task Management App.</div>
        <div>
          Hello {user.nom} {user.prenom}
        </div>
        {user.Admin === true && (
          <div className="flex items-center gap-10">
            <Link to={"/admin/employee"}>
              <div className="flex items-center gap-1 text-sm">
                <FaUserAlt />
                Employees
              </div>
            </Link>
            <Link to={"/admin/leave-request"}>
              <div className="flex items-center gap-1 text-sm">
                <VscRequestChanges />
                Leave Requests
              </div>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
