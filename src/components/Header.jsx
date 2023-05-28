import React, { useState } from "react"
import { FaUserAlt } from "react-icons/fa"
import { VscRequestChanges } from "react-icons/vsc"
import { Link, useNavigate } from "react-router-dom"

const Header = ({ user }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    window.localStorage.removeItem("token")
    navigate("/")
  }
  return (
    <header className="h-[70px] bg-blue-400  text-white text-xl">
      <div className="flex justify-between items-center container sm:mx-auto h-full">
        <div>Task Management App</div>
        <div className="flex items-center gap-8">
          Hello {user.nom} {user.prenom}
          <div className="cursor-pointer" onClick={handleLogout}>
            Logout
          </div>
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
