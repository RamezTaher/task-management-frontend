import React from "react"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="h-screen">
      <div className="grid-cols-2 h-[85%] gap-4 grid relative bg-white">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="pattern-img"
          className="w-max lg:h-full h-fit  object-cover"
        />
        <div className="flex justify-center items-center flex-col gap-8">
          <h1 className="font-semibold text-7xl ">Happening now</h1>
          <h2 className="font-medium text-4xl ">Join Task Management App.</h2>
          <div className="flex flex-col gap-4 justify-center w-[230px] ">
            <button
              onClick={() => navigate("/auth/client/login")}
              type="submit"
              className="bg-blue-500 text-white font-semibold btn py-4 rounded-full shadow-md text-xl"
            >
              Client
            </button>
            <button
              onClick={() => navigate("/auth/consultant/login")}
              type="submit"
              className="bg-blue-500 text-white font-semibold btn rounded-full shadow-md  py-4 text-xl"
            >
              Consultant
            </button>
            <button
              onClick={() => navigate("/auth/admin/login")}
              type="submit"
              className="bg-blue-500 text-white font-semibold btn rounded-full shadow-md  py-4 text-xl"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
      <div className="left-0 right-0 bottom-0 text-center fixed mb-1">
        <Footer />
      </div>
    </div>
  )
}

export default Home
