import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { Link, useParams } from "react-router-dom"
import {
  getConsultantProfile,
  getProjectById,
  updateProject,
  updateTask,
} from "../utils/api-interceptor"
import { format, parseISO } from "date-fns"
import Loader from "../components/Loader"
import FeedbackModal from "../components/FeedbackModal"
import { AiFillPlusCircle } from "react-icons/ai"
import NewTaskModal from "../components/NewTaskModal"

const ConsultantProjectDetails = () => {
  const { id } = useParams()

  const [user, setUser] = useState({})
  const [project, setProject] = useState({})
  const [loading, setLoading] = useState(false)
  const [isTaskOpen, setIsTaskOpen] = useState(false)

  const [solution, setSolution] = useState("")

  useEffect(() => {
    setLoading(true)
    getConsultantProfile()
      .then(({ data }) => {
        setUser(data)
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
        setSolution(data.solution)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [id])

  const addTask = (e) => {
    e.preventDefault()
    setIsTaskOpen(true)
  }

  const addSolutionToProject = async (e) => {
    e.preventDefault()
    try {
      const res = await updateProject(id, {
        solution,
        status: "resolved",
      })

      if (res.status === 200) {
        alert("solution Added Successfully")
        window.location.reload()
      }
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }
  const moveTaskToProgress = async (taskId) => {
    try {
      const res = await updateTask(taskId, {
        status: "in-progress",
      })

      if (res.status === 200) {
        alert("Task Moved To In Prgress")
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const moveTaskToDone = async (taskId) => {
    try {
      const res = await updateTask(taskId, {
        status: "done",
      })

      if (res.status === 200) {
        alert("Task Moved To Done")
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const moveTaskToStart = async (taskId) => {
    try {
      const res = await updateTask(taskId, {
        status: "to-do",
      })

      if (res.status === 200) {
        alert("Task Moved To Do")
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isTaskOpen && <NewTaskModal setIsTaskOpen={setIsTaskOpen} />}
      {loading && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black/80 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <Header user={user} />
      <section>
        <div className="container mx-auto h-full py-10">
          <div className="flex flex-col gap-6">
            <Link to={"/platform/consultant/projects"}>
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
                  <div>Project Status</div>
                  <div>{project.status}</div>
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
                  <div>
                    {" "}
                    {project.solution ? (
                      <Link to={project.solution} target="_blank">
                        <div className="text-primary">Solution Link</div>
                      </Link>
                    ) : (
                      "No Solution Yet"
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-6">
                <img
                  src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                />
              </div>

              <div className="col-span-2 flex flex-col gap-6 ">
                <div className="text-xl font-semiBold mb-4 flex items-center gap-2">
                  Project Tasks Progress{" "}
                  <div className="cursor-pointer" onClick={addTask}>
                    <AiFillPlusCircle color="green" />
                  </div>
                </div>

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
                        p-8 flex flex-col gap-3"
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
                              <div className="flex items-center justify-center gap-2 text-white">
                                <div
                                  className="bg-orange-500 px-2 py-1 cursor-pointer"
                                  onClick={() => moveTaskToProgress(task.id)}
                                >
                                  In progress
                                </div>
                                <div
                                  className="bg-green-500 px-2 py-1 cursor-pointer"
                                  onClick={() => moveTaskToDone(task.id)}
                                >
                                  done
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div
                        className="border-r border-solid
                      p-8 flex flex-col gap-3"
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
                              <div className="flex items-center justify-center gap-2 text-white">
                                <div
                                  className="bg-blue-500 px-2 py-1 cursor-pointer"
                                  onClick={() => moveTaskToStart(task.id)}
                                >
                                  To Do
                                </div>
                                <div
                                  className="bg-green-500 px-2 py-1 cursor-pointer"
                                  onClick={() => moveTaskToDone(task.id)}
                                >
                                  Done
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="p-8 flex flex-col gap-3">
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
                              <div className="flex items-center justify-center gap-2 text-white">
                                <div
                                  className="bg-blue-500 px-2 py-1 cursor-pointer"
                                  onClick={() => moveTaskToStart(task.id)}
                                >
                                  To Do
                                </div>
                                <div
                                  className="bg-orange-500 px-2 py-1 cursor-pointer"
                                  onClick={() => moveTaskToProgress(task.id)}
                                >
                                  In progress
                                </div>
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

              <div className="col-span-2 flex flex-col gap-6">
                <h3 className="text-xl font-semiBold">
                  Submit Solution This Project
                </h3>
                <div className="flex items-center gap-2 ">
                  <input
                    type="text"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Enter The Solution Github Link"
                  />
                  <button
                    onClick={(e) => addSolutionToProject(e)}
                    className="bg-blue-500 w-[200px] text-white px-7 py-4 rounded"
                  >
                    Add Solution
                  </button>
                </div>
              </div>
              <div className="col-span-2 flex flex-col gap-6">
                <h3 className="text-xl font-semiBold">
                  Client Feedback On This Project
                </h3>
                <div>{project.feedback ?? "No Feedback Yet"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ConsultantProjectDetails
