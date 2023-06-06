import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import {
  deleteIntervention,
  getAdminProfile,
  getAllInterventions,
  updateIntervention,
} from "../utils/api-interceptor"

import Loader from "../components/Loader"
import { format, parseISO } from "date-fns"
import { Link } from "react-router-dom"
import { BsFillTrashFill } from "react-icons/bs"
import { TiTick } from "react-icons/ti"
import { FaTimes } from "react-icons/fa"

const AdminInterventions = () => {
  const [interventionStatus, setInterventionStatus] = useState("")
  const [interventions, setInterventions] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [isNewInterventionOpen, setIsNewInterventionOpen] = useState(false)

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
    getAllInterventions(interventionStatus)
      .then(({ data }) => {
        setInterventions(data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [interventionStatus])

  const handleDelete = async (e, id) => {
    e.preventDefault()
    alert("Are You Sure You Want To Delete This Request")
    try {
      const res = await deleteIntervention(id)
      const deletedIntervention = res.data
      alert(deletedIntervention.message)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleAccept = async (e, id) => {
    e.preventDefault()
    try {
      const res = await updateIntervention(id, {
        status: "approved",
      })

      if (res.status === 200) {
        alert("Intervention Request Approved")
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDecline = async (e, id) => {
    e.preventDefault()
    try {
      const res = await updateIntervention(id, {
        status: "rejected",
      })

      if (res.status === 200) {
        alert("Intervention Request Rejected")
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
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
        <div className="container mx-auto h-full py-10">
          <div className="space-y-4">
            <Link to={"/platform/admin/dashboard"}>
              <div className="bg-blue-500 w-[100px] py-2 flex justify-center text-white">
                Go Back
              </div>
            </Link>
            <h1 className="text-2xl font-semiBold mb-6">
              All Interventions History :
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-between w-full mb-5">
                <div className="flex items-center gap-1">
                  <div>Status:</div>
                  <div
                    className="bg-yellow-500 text-white px-2 py-1 cursor-pointer"
                    onClick={() => setInterventionStatus("pending")}
                  >
                    Pending
                  </div>
                  <div
                    className="bg-green-500 text-white px-2 py-1 cursor-pointer"
                    onClick={() => setInterventionStatus("approved")}
                  >
                    Approved
                  </div>
                  <div
                    className="bg-red-500 text-white px-2 py-1 cursor-pointer"
                    onClick={() => setInterventionStatus("rejected")}
                  >
                    Rejected
                  </div>

                  <div
                    className="bg-violet-500 text-white px-2 py-1 cursor-pointer"
                    onClick={() => setInterventionStatus("")}
                  >
                    all
                  </div>
                </div>
              </div>
            </div>
            {interventions?.length > 0 && (
              <table className="border-secondary-tint border-solid border-2 border-collapse w-full table">
                <thead>
                  <tr>
                    <th>Intervention ID</th>
                    <th>Intervention Type</th>
                    <th>Intervention Description</th>
                    <th>Intervention Start Date</th>
                    <th>Intervention End Date</th>
                    <th>Consultant Name</th>
                    <th>Consultant Role</th>
                    <th>Intervention Status</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {interventions.map((element, idx) => (
                    <tr key={idx}>
                      <td>{element?.id}</td>
                      <td>{element?.interventionType?.name}</td>
                      <td>{element?.interventionType?.description}</td>
                      <td>
                        {element.startDate &&
                          format(parseISO(element.startDate), "dd MMMM Y")}{" "}
                      </td>
                      <td>
                        {element.endDate &&
                          format(parseISO(element.endDate), "dd MMMM Y")}{" "}
                      </td>
                      <td>
                        {element.consultant.nom} {element.consultant.prenom}
                      </td>
                      <td>{element.consultant.role}</td>

                      <td>
                        <div
                          className={`py-2 text-white ${
                            element.status === "approved"
                              ? "bg-green-500"
                              : element.status === "rejected"
                              ? "bg-red-500"
                              : element.status === "pending"
                              ? "bg-yellow-500"
                              : ""
                          }`}
                        >
                          {element.status}
                        </div>
                      </td>

                      <td>
                        <div className="h-full w-full flex items-center justify-center cursor-pointer gap-1">
                          <TiTick
                            size={22}
                            color="green"
                            onClick={(e) => handleAccept(e, element.id)}
                          />
                          <FaTimes
                            size={19}
                            color="red"
                            onClick={(e) => handleDecline(e, element.id)}
                          />
                          <BsFillTrashFill
                            size={16}
                            color="black"
                            onClick={(e) => handleDelete(e, element.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {interventions.length === 0 && <div>No Intervention</div>}
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminInterventions
