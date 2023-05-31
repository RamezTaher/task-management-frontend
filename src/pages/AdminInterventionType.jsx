import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import {
  getAdminProfile,
  getAllInterventionTypes,
} from "../utils/api-interceptor"
import Loader from "../components/Loader"
import { Link } from "react-router-dom"
import { FaTimes } from "react-icons/fa"
import NewInterventionModal from "../components/NewInterventionModal"

const AdminInterventionType = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [types, setTypes] = useState([])
  const [isNewOpen, setIsNewOpen] = useState(false)

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
  useEffect(() => {
    setLoading(true)

    getAllInterventionTypes()
      .then(({ data }) => {
        setTypes(data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [])

  const createNewOne = (e) => {
    e.preventDefault()
    setIsNewOpen(true)
  }
  return (
    <>
      {isNewOpen && <NewInterventionModal setIsNewOpen={setIsNewOpen} />}
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
            <h1 className="text-2xl font-semiBold mb-6 flex items-center justify-between gap-3">
              All Intervention Types
              <button
                className="btn bg-green-500 text-white font-normal w-[250px]"
                onClick={(e) => createNewOne(e)}
              >
                New Intervention Type
              </button>
            </h1>

            {types.length > 0 ? (
              <table className="border-secondary-tint border-solid border-2 border-collapse w-full table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {types.map((type) => (
                    <tr key={type.id}>
                      <td>{type?.id}</td>
                      <td>{type?.name}</td>
                      <td>{type?.description}</td>

                      <td>
                        <Link
                          to={`/platform/admin/intervention-type/${type.id}`}
                        >
                          <div className="h-full w-full flex items-center justify-center">
                            <FaTimes size={18} />
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No Intervention Types Yet</div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminInterventionType
