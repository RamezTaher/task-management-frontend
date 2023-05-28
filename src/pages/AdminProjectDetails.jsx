import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  getClientProfile,
  getProjectById,
  updateProject,
} from "../utils/api-interceptor"
import { format, parseISO } from "date-fns"
import Loader from "../components/Loader"

const AdminProjectDetails = () => {
  const { id } = useParams()

  const [user, setUser] = useState({})
  const [project, setProject] = useState({})
  const [loading, setLoading] = useState(false)
  const [isModelOpen, setIsModelOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    getClientProfile()
      .then(({ data }) => {
        setUser(data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    getProjectById(id)
      .then(({ data }) => {
        setProject(data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [id])

  const closeProject = async (e) => {
    e.preventDefault()
    try {
      const res = await updateProject(id, {
        status: "closed",
      })

      if (res.status === 200) {
        alert("Project Closed (done)")
        navigate("/platform/admin/projects")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const addFeedback = (e) => {
    e.preventDefault()
    setIsModelOpen(true)
  }

  return (
    <>
      {isModelOpen && <FeedbackModal setIsModelOpen={setIsModelOpen} />}
      {loading && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <Header user={user} />
      <section>
        <div className="container mx-auto h-full py-10">
          <div className="flex flex-col gap-6">
            <Link to={"/platform/admin/projects"}>
              <div className="bg-blue-500 w-[100px] py-2 flex justify-center text-white">
                Go Back
              </div>
            </Link>
            <h1 className="text-2xl font-semiBold mb-6">
              Your Project N°{project.id} :
            </h1>

            <div className="grid grid-cols-2 gap-12">
              <div className="col-span-1 flex flex-col gap-6 ">
                <h1 className="text-xl font-semiBold mb-4">Project Info</h1>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Project Name</div>
                  <div>{project.title}</div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Project Description</div>
                  <div>{project.description}</div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Project Start Date</div>
                  <div>
                    {" "}
                    {project.startDate &&
                      format(parseISO(project.startDate), "dd MMMM Y")}{" "}
                  </div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Project End Date</div>
                  <div>
                    {" "}
                    {project.endDate &&
                      format(parseISO(project.endDate), "dd MMMM Y")}{" "}
                  </div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Project Feedback</div>
                  <div>{project.feedback ?? "No Feedback Yet"}</div>
                </div>
                <div className="flex items-center justify-between text-lg font bold">
                  <div>Project Solution</div>
                  <div>{project.solution ?? "No Solution Yet"}</div>
                </div>
                <div className="flex items-center gap-2 justify-center mt-10">
                  <button
                    className="btn bg-blue-500 text-white font-normal rounded-md w-[220px] px-0"
                    onClick={(e) => closeProject(e)}
                  >
                    Close Project (Done)
                  </button>

                  <button
                    className="btn bg-blue-500 text-white font-normal rounded-md w-[220px]"
                    onClick={(e) => addFeedback(e)}
                  >
                    Add Feedback
                  </button>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-6">
                <img
                  src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />
              </div>

              <div className="col-span-2 flex flex-col gap-6 ">
                <h1 className="text-xl font-semiBold mb-4">
                  Consultant On This Project
                </h1>
                <button className="bg-blue-500 w-[200px] text-white px-7 py-4">
                  Add Consultant
                </button>
                {project?.consultants?.length > 0 && (
                  <table className="border-secondary-tint border-solid border-2 border-collapse w-full table">
                    <thead>
                      <tr>
                        <th>Consultant Nom</th>
                        <th>Consultant Prenom</th>
                        <th>Consultant Email</th>
                        <th>Consultant Phone</th>
                        <th>Consultant Cin</th>
                        <th>Consultant Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.consultants.map((consultant, idx) => (
                        <tr key={idx}>
                          <td>{consultant?.nom}</td>
                          <td>{consultant?.prenom}</td>
                          <td>{consultant?.email}</td>
                          <td>{consultant?.phone}</td>
                          <td>{consultant?.cin}</td>
                          <td>{consultant?.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {project?.consultants?.length === 0 && (
                  <div>No Consultants Yet</div>
                )}
              </div>
              <div className="col-span-2 flex flex-col gap-6 ">
                <h1 className="text-xl font-semiBold mb-4">
                  Project Tasks Progress
                </h1>
                {project?.tasks?.length > 0 && (
                  <div className="flex flex-col ">
                    <div className="grid grid-cols-3 text-center gap-2 font-bold text-xl">
                      <div
                        className="border-r border-solid
                        py-8"
                      >
                        Tasks To Do
                      </div>
                      <div
                        className="border-r border-solid
                      py-8"
                      >
                        Tasks In Progress
                      </div>
                      <div className="py-8">Tasks Done</div>
                    </div>
                    <div className="grid grid-cols-3 text-center gap-2">
                      <div
                        className="border-r border-solid
                        p-8"
                      >
                        {project.tasks
                          .filter((task) => task.status === "to-do")
                          .map((task) => (
                            <div
                              key={task.id}
                              className="border border-solid rounded flex flex-col  gap-2 p-2 text-blue-500 font-bold"
                            >
                              <div> ID : {task.id}</div>
                              <div> Title : {task.title}</div>
                              <div> Description : {task.description}</div>
                              <div>
                                {" "}
                                End Date :{" "}
                                {task.endDate &&
                                  format(
                                    parseISO(task.endDate),
                                    "dd MMMM Y"
                                  )}{" "}
                              </div>
                            </div>
                          ))}
                      </div>
                      <div
                        className="border-r border-solid
                      p-8"
                      >
                        {project.tasks
                          .filter((task) => task.status === "in-progress")
                          .map((task) => (
                            <div
                              key={task.id}
                              className="border border-solid rounded flex flex-col  gap-2 p-2 text-orange-500 font-bold"
                            >
                              <div> ID : {task.id}</div>
                              <div> Title : {task.title}</div>
                              <div> Description : {task.description}</div>
                              <div>
                                {" "}
                                End Date :{" "}
                                {task.endDate &&
                                  format(
                                    parseISO(task.endDate),
                                    "dd MMMM Y"
                                  )}{" "}
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="p-8">
                        {" "}
                        {project.tasks
                          .filter((task) => task.status === "done")
                          .map((task) => (
                            <div
                              key={task.id}
                              className="border border-solid rounded flex flex-col  gap-2 p-2 text-green-500 font-bold"
                            >
                              <div> ID : {task.id}</div>
                              <div> Title : {task.title}</div>
                              <div> Description : {task.description}</div>
                              <div>
                                {" "}
                                End Date :{" "}
                                {task.endDate &&
                                  format(
                                    parseISO(task.endDate),
                                    "dd MMMM Y"
                                  )}{" "}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
                {project?.tasks?.length === 0 && (
                  <div>No Tasks Yet In This Project</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminProjectDetails
