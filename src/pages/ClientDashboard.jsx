import React, { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import Header from "../components/Header"
import { getClientProfile } from "../utils/api-interceptor"
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader"

const ClientDashboard = () => {
  const navigate = useNavigate()
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
              <h1 className="text-2xl font-semiBold mb-4">Client Info</h1>
              <div className="flex items-center justify-between text-lg font bold">
                <div>Client Nom</div>
                <div>{user.nom}</div>
              </div>
              <div className="flex items-center justify-between text-lg font bold">
                <div>Client Prenom</div>
                <div>{user.prenom}</div>
              </div>
              <div className="flex items-center justify-between text-lg font bold">
                <div>Client Email</div>
                <div>{user.email}</div>
              </div>
              <div className="flex items-center justify-between text-lg font bold">
                <div>Client Phone</div>
                <div>{user.phone}</div>
              </div>
              <div className="flex items-center justify-between text-lg font bold">
                <div>Client Cin</div>
                <div>{user.cin}</div>
              </div>
              <div className="flex items-center justify-between text-lg font bold">
                <div>Client Date Naissance</div>
                <div>
                  {user.date_naissance &&
                    format(parseISO(user.date_naissance), "dd MMMM Y")}{" "}
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center mt-10">
                <button
                  className="btn bg-blue-500 text-white font-normal rounded-md w-[220px]"
                  onClick={() => navigate("/platform/client/start-project")}
                >
                  Start Project
                </button>
                <button
                  className="btn bg-blue-500 text-white font-normal rounded-md w-[220px]"
                  onClick={() => navigate("/platform/client/projects")}
                >
                  Control Projects
                </button>
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-6">
              <img
                src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />
            </div>
          </div>
        </div>{" "}
      </section>
    </>
  )
}

export default ClientDashboard
