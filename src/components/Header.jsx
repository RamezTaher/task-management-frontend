import React, { useState } from "react"
import { FaUserAlt } from "react-icons/fa"
import { BiTask } from "react-icons/bi"
import { MdRequestPage } from "react-icons/md"
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
        {user.role === "client" && (
          <div className="flex items-center gap-8">
            Hello {user.nom} {user.prenom}
            <div className="cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
        {user.role === "admin" && (
          <div className="flex items-center gap-10">
            <Link to={"/platform/admin/consultants"}>
              <div className="flex items-center gap-1 text-sm">
                <FaUserAlt />
                Consultants
              </div>
            </Link>
            <Link to={"/platform/admin/clients"}>
              <div className="flex items-center gap-1 text-sm">
                <FaUserAlt />
                Clients
              </div>
            </Link>
            <Link to={"/platform/admin/projects"}>
              <div className="flex items-center gap-1 text-sm">
                <BiTask />
                Projects
              </div>
            </Link>
            <Link to={"/platform/admin/interventions"}>
              <div className="flex items-center gap-1 text-sm">
                <MdRequestPage />
                Interventions
              </div>
            </Link>
            <Link to={"/platform/admin/intervention-type"}>
              <div className="flex items-center gap-1 text-sm">
                <MdRequestPage />
                Intervention Type
              </div>
            </Link>
            <div className="cursor-pointer text-sm" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
