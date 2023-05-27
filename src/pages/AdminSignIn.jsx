import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { logAdmin, logClient, logConsultant } from "../utils/api-interceptor"
import Loader from "../components/Loader"

const AdminSignIn = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const signInHandler = async (event) => {
    event.preventDefault()
    setError("")
    if (email === "" || password === "") {
      setError("All fields are required!")
      return
    }

    try {
      setLoading(true)
      const user = await logAdmin({ email, password })
      localStorage.setItem("token", JSON.stringify(user.data.access_token))
      setLoading(false)
      navigate("/platform/admin/dashboard")
    } catch (error) {
      setLoading(false)
      console.log(error)
      setError(error.response.data.message)
    }
  }
  return (
    <>
      {loading && (
        <div className="h-screen w-screen bg-black bg-opacity-80 absolute flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-700 z-1 filter ">
        <div className="text-center ">
          <h1 className="text-4xl font-semibold mb-4 font-mono text-white">
            Join Task Management App.
            <br />
            Admin Space
          </h1>
          {error !== "" && <p className="text-white font-meduim ">{error}</p>}

          <div className="bg-white p-5 text-left rounded-xl mt-1 shadow-lg">
            <form onSubmit={signInHandler} className="flex flex-col gap-3">
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  value={email}
                />
              </label>

              <label htmlFor="password" className="relative">
                Password
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  value={password}
                />
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPassword(false)}
                    className="text-2xl cursor-pointer absolute right-3 top-1/2 translate-y-[2px] "
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setShowPassword(true)}
                    className="text-2xl cursor-pointer absolute right-3 top-1/2 translate-y-[2px]"
                  />
                )}
              </label>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSignIn
