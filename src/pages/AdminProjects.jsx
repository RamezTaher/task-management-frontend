import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { deleteProject, getAdminProfile, getAllProjects } from "../utils/api-interceptor"

import Loader from "../components/Loader"
import { format, parseISO } from "date-fns"
import { Link } from "react-router-dom"
import { FaTimes } from "react-icons/fa"
import { BsFillTrashFill } from "react-icons/bs"

const AdminProjects = () => {
  const [projectStatus, setProjectStatus] = useState("")
  const [projects, setProjects] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllProjects(projectStatus)
      .then(({ data }) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [projectStatus])

  useEffect(() => {
    setLoading(true)
    getAdminProfile()
      .then(({ data }) => {
        setUser(data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [])

  const handleDelete = async (e, id) => {
    e.preventDefault()
    alert("Are You Sure You Want To Delete This Project")
    try {
      const res = await deleteProject(id)
      const deletedProject = res.data
      alert(deletedProject.message)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <Header user={user} />
      <section>
        <div className="container mx-auto h-full py-10">
          <div className="space-y-4">
            <Link to={"/platform/admin/dashboard"}>
              <div className="bg-blue-500 w-[100px] py-2 flex justify-center text-white">
                Go Back
              </div>
            </Link>
            <h1 className="text-2xl font-semiBold mb-6">Your Projects :</h1>

            <div className="flex items-center gap-3 mb-4">
              <div>Status:</div>
              <div className="flex items-center gap-1">
                <div
                  className="bg-green-500 text-white px-2 py-1 cursor-pointer"
                  onClick={() => setProjectStatus("resolved")}
                >
                  Resolved
                </div>
                <div
                  className="bg-yellow-500 text-white px-2 py-1 cursor-pointer"
                  onClick={() => setProjectStatus("in-progress")}
                >
                  In Progress
                </div>
                <div
                  className="bg-blue-500 text-white px-2 py-1 cursor-pointer"
                  onClick={() => setProjectStatus("open")}
                >
                  Open
                </div>
                <div
                  className="bg-red-500 text-white px-2 py-1 cursor-pointer"
                  onClick={() => setProjectStatus("closed")}
                >
                  Closed
                </div>
                <div
                  className="bg-violet-500 text-white px-2 py-1 cursor-pointer"
                  onClick={() => setProjectStatus("")}
                >
                  all
                </div>
              </div>
            </div>
            {projects.length > 0 && (
              <table className="border-secondary-tint border-solid border-2 border-collapse w-full table">
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Project Title</th>
                    <th>Project Start Date</th>
                    <th>Project End Date</th>
                    <th>Project Status</th>
                    <th>Project Client</th>
                    <th>Project Consultants</th>
                    <th>Project Tasks</th>
                    <th>Project FeedBack</th>
                    <th>Project Solution</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((element, idx) => (
                    <tr key={idx}>
                      <td>{element?.id}</td>
                      <td>{element?.title}</td>
                      <td>
                        {element.startDate &&
                          format(parseISO(element.startDate), "dd MMMM Y")}{" "}
                      </td>
                      <td>
                        {element.endDate &&
                          format(parseISO(element.endDate), "dd MMMM Y")}{" "}
                      </td>

                      <td>
                        <div
                          className={`py-2 text-white ${
                            element.status === "resolved"
                              ? "bg-green-500"
                              : element.status === "closed"
                              ? "bg-red-500"
                              : element.status === "in-progress"
                              ? "bg-yellow-500"
                              : element.status === "open"
                              ? "bg-blue-500"
                              : ""
                          }`}
                        >
                          {element.status}
                        </div>
                      </td>
                      <td>
                        {element.client.nom} {element.client.prenom}
                      </td>
                      <td>{element.consultants.length}</td>
                      <td>{element.tasks.length}</td>
                      <td>{element.feedback ?? "No Feedback Yet"}</td>
                      <td>
                        {" "}
                        {element.solution ? (
                          <Link to={element.solution} target="_blank">
                            <div className="text-primary">Solution Link</div>
                          </Link>
                        ) : (
                          "No Solution Yet"
                        )}
                      </td>

                      <td>
                        <div className="flex items-center gap-2 w-full justify-center">
                          <Link to={`/platform/admin/projects/${element.id}`}>
                            <div className="h-full w-full flex items-center justify-center">
                              <FaTimes size={18} color="green" />
                            </div>
                          </Link>
                          <BsFillTrashFill
                            size={18}
                            color="red"
                            onClick={(e) => handleDelete(e, element.id)}
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {projects.length === 0 && <div>No Projects</div>}
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminProjects
