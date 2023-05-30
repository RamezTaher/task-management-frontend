import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  deleteConsultant,
  deleteInterventionType,
  getAdminProfile,
  getConsultantById,
  getInterventionTypeById,
  updateConsultant,
  updateInterventionType,
} from "../utils/api-interceptor"
import { DatePicker } from "antd"
import Loader from "../components/Loader"
import { format, parseISO } from "date-fns"

const AdminInterventionTypeDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    setLoading(true)

    getInterventionTypeById(id)
      .then(({ data }) => {
        setName(data.name)
        setDescription(data.description)

        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [id])

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

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (isUpdate === true) {
      try {
        const res = await updateInterventionType(id, {
          name,
          description,
        })
        setIsUpdate(false)
        if (res.status === 200) {
          alert("Intervention Type Updated Successfully")
          navigate("/platform/admin/intervention-type")
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setIsUpdate(!isUpdate)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    alert("Are You Sure You Want To Delete This Intervention Type")
    try {
      const res = await deleteInterventionType(id)
      const deleteType = res.data
      alert(deleteType.message)
      navigate("/platform/admin/intervention-type")
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
            <Link to={"/platform/admin/intervention-type"}>
              <div className="bg-blue-500 w-[100px] py-2 flex justify-center text-white">
                Go Back
              </div>
            </Link>
            <h1 className="text-2xl font-semiBold mb-6">
              Intervention Type Info:
            </h1>

            <form className="grid grid-cols-2 gap-6">
              <label htmlFor="id">
                Id
                <input type="text" placeholder="Id" value={id} readOnly />
              </label>
              <label>
                Intervention Name
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  value={name}
                  readOnly={!isUpdate}
                />
              </label>

              <label>
                Description
                <textarea
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="description"
                  value={description}
                  readOnly={!isUpdate}
                />
              </label>

              <div className=" col-span-2 flex justify-center gap-2">
                <button
                  className="bg-blue-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md w-[200px]"
                  onClick={(e) => handleUpdate(e)}
                >
                  {isUpdate ? "Submit" : "Edit"}
                </button>
                <button
                  className="bg-red-500 text-white btn px-3 py-2 rounded-md mt-4  text-lg font-semibold shadow-md w-[200px]"
                  onClick={(e) => handleDelete(e)}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminInterventionTypeDetails
