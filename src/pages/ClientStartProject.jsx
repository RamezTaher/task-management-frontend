import React, { useEffect, useState } from "react"

import Header from "../components/Header"
import { DatePicker } from "antd"
import Loader from "../components/Loader"
import { createTicket, getClientProfile } from "../utils/api-interceptor"
import { useNavigate } from "react-router-dom"

const ClientStartProject = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [endDate, setEndDate] = useState("")
  const [error, setError] = useState("")
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

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

  const startProject = async (e) => {
    e.preventDefault()
    setError("")

    if (title === "" || description === "" || endDate === "") {
      setError("All fields are required!")
      return
    }

    try {
      const res = await createTicket({
        title,
        description,
        endDate,
      })
      console.log(res)

      if (res.status === 201) {
        alert("Project Created Successfully")
        navigate("/platform/client/dashboard")
      }
    } catch (error) {
      setError(error.response?.data?.message)
      console.log(error)
    }
  }

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date.toISOString()
      setEndDate(formattedDate)
    } else {
      setEndDate(null)
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
        <div className="container mx-auto h-full py-10 space-y-10">
          <div>
            <h1 className="text-2xl font-semiBold mb-6">
              Start A New Project With Us
            </h1>
            {error !== "" && (
              <p className="text-red-500 mb-3 text-lg font-meduim max-w-sm">
                {error}
              </p>
            )}
            <form className="flex flex-col gap-5">
              <label>
                Project Title
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Project Title"
                  value={title}
                />
              </label>
              <label>
                Project Description
                <textarea
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Project Full Description"
                  className="h-[150px]"
                  value={description}
                />
              </label>
              <label>
                <div>End Date</div>
                <DatePicker
                  onChange={handleDateChange}
                  className="py-3 border-grayish"
                  size="large"
                />
              </label>

              <div className="flex justify-center">
                <button
                  onClick={(e) => startProject(e)}
                  type="submit"
                  className="bg-blue-400 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md"
                >
                  Start Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default ClientStartProject
