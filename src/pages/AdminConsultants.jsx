import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { getAdminProfile, getAllConsultants } from "../utils/api-interceptor"
import Loader from "../components/Loader"
import { format, parseISO } from "date-fns"
import { Link } from "react-router-dom"
import { FaTimes } from "react-icons/fa"

const AdminConsultants = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [consultants, setConsultants] = useState([])
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

    getAllConsultants()
      .then(({ data }) => {
        setConsultants(data)
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
          <div className="space-y-4">
            <Link to={"/platform/admin/dashboard"}>
              <div className="bg-blue-500 w-[100px] py-2 flex justify-center text-white">
                Go Back
              </div>
            </Link>
            <h1 className="text-2xl font-semiBold mb-6">All Consultants</h1>
            <table className="border-secondary-tint border-solid border-2 border-collapse w-full table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Cin</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date Naissance</th>
                  <th>Role</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {consultants.map((element, idx) => (
                  <tr key={idx}>
                    <td>{element?.id}</td>
                    <td>{element?.nom}</td>
                    <td>{element?.prenom}</td>
                    <td>{element?.cin}</td>
                    <td>{element?.email}</td>
                    <td>{element?.phone}</td>
                    <td>
                      {element.date_naissance &&
                        format(
                          parseISO(element.date_naissance),
                          "dd MMMM Y"
                        )}{" "}
                    </td>
                    <td>{element.role}</td>

                    <td>
                      <Link to={`/platform/admin/consultants/${element.id}`}>
                        <div className="h-full w-full flex items-center justify-center">
                          <FaTimes size={18} />
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminConsultants
