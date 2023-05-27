import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { validateEmail } from "../utils/validator"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Loader from "../components/Loader"
import { DatePicker } from "antd"
import { registerClient, registerConsultant } from "../utils/api-interceptor"

const ConsultantRegister = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [cin, setCin] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date_naissance, setDate_naissance] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const matchPassword = confirmPassword === password

  const signupHandler = async (event) => {
    event.preventDefault()
    setError("")
    if (
      nom === "" ||
      prenom === "" ||
      date_naissance === "" ||
      cin === "" ||
      phone === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("All fields are required!")
      return
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email")
      return
    }

    if (!matchPassword) {
      setError("Both passwords must be same")
      return
    }

    try {
      setLoading(true)
      const user = await registerConsultant({
        nom,
        prenom,
        email,
        cin,
        date_naissance,
        password,
        phone,
      })
      if (user) {
        setLoading(false)
        navigate("/auth/consultant/login")
      }
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
    }
  }
  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date.toISOString()
      setDate_naissance(formattedDate)
    } else {
      setDate_naissance(null)
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
        <div className="text-center w-[600px]">
          <h1 className="text-4xl font-semibold mb-4 font-mono text-white">
            Join Task Management App.
            <br />
            Consultant Space
          </h1>
          {error !== "" && <p className="text-white font-meduim ">{error}</p>}

          <div className="bg-white p-5 text-left rounded-xl mt-1 shadow-lg">
            <form onSubmit={signupHandler} className="flex flex-col gap-3 ">
              <label htmlFor="name">
                Nom
                <input
                  type="text"
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Nom"
                  value={nom}
                />
              </label>
              <label>
                Prenom
                <input
                  type="text"
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Prenom"
                  value={prenom}
                />
              </label>
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  value={email}
                />
              </label>
              <label htmlFor="phone">
                Phone
                <input
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  value={phone}
                />
              </label>
              <label>
                Cin
                <input
                  type="text"
                  onChange={(e) => setCin(e.target.value)}
                  placeholder="Cin"
                  value={cin}
                />
              </label>
              <label>
                Date Naissance
                <DatePicker
                  onChange={handleDateChange}
                  format={"DD-MM-YYYY"}
                  className="w-full text-lg  p-2 border border-solid border-grayish text-black placeholder:text-black"
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

              <label htmlFor="confirm-password">
                Confirm Password
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Password"
                  value={confirmPassword}
                />
              </label>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md"
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConsultantRegister
