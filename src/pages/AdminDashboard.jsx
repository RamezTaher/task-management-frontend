import React, { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import Header from "../components/Header"
import { getAdminProfile } from "../utils/api-interceptor"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

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
          <div className="grid grid-cols-2 gap-12">
            <div className="col-span-1 flex flex-col gap-6">
              <h1 className="text-2xl font-semiBold mb-4">Admin Info</h1>
              <div className="flex items-center justify-between text-lg font bold">
                <div> Nom</div>
                <div>{user.nom}</div>
              </div>
              <div className="flex items-center justify-between text-lg font bold">
                <div> Prenom</div>
                <div>{user.prenom}</div>
              </div>
              <div className="flex items-center justify-between text-lg font bold">
                <div> Email</div>
                <div>{user.email}</div>
              </div>
              <div className="flex items-center justify-between text-lg font bold">
                <div> Role</div>
                <div>{user.role}</div>
              </div>
            </div>
            <div className="col-span-1 h-[600px] flex flex-col gap-6">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1541560052-5e137f229371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
            </div>
          </div>
        </div>{" "}
      </section>
    </>
  )
}

export default AdminDashboard
