import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  deleteClient,
  deleteConsultant,
  getAdminProfile,
  getClientById,
  getConsultantById,
  updateClient,
  updateConsultant,
} from "../utils/api-interceptor"
import { DatePicker } from "antd"
import Loader from "../components/Loader"
import { format, parseISO } from "date-fns"

const AdminClientDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [cin, setCin] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date_naissance, setDate_naissance] = useState("")
  const [role, setRole] = useState("")

  useEffect(() => {
    setLoading(true)

    getClientById(id)
      .then(({ data }) => {
        setNom(data.nom)
        setPrenom(data.prenom)
        setEmail(data.email)
        setCin(data.cin)
        setEmail(data.email)
        setPhone(data.phone)
        setDate_naissance(data.date_naissance)
        setRole(data.role)

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
        const res = await updateClient(id, {
          nom,
          prenom,
          email,
          cin,
          phone,
          date_naissance,
        })
        setIsUpdate(false)
        if (res.status === 200) {
          alert("Client Updated Successfully")
          navigate("/platform/admin/clients")
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setIsUpdate(!isUpdate)
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

  const handleDelete = async (e) => {
    e.preventDefault()
    alert("Are You Sure You Want To Delete This Client")
    try {
      const res = await deleteClient(id)
      const deletedConsultant = res.data
      alert(deletedConsultant.message)
      navigate("/platform/admin/clients")
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
            <Link to={"/platform/admin/clients"}>
              <div className="bg-blue-500 w-[100px] py-2 flex justify-center text-white">
                Go Back
              </div>
            </Link>
            <h1 className="text-2xl font-semiBold mb-6">Client Info:</h1>

            <form className="grid grid-cols-2 gap-6">
              <label htmlFor="id">
                Id
                <input type="text" placeholder="Id" value={id} readOnly />
              </label>
              <label>
                Nom
                <input
                  type="text"
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Nom"
                  value={nom}
                  readOnly={!isUpdate}
                />
              </label>

              <label>
                Prenom
                <input
                  type="text"
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Prenom"
                  value={prenom}
                  readOnly={!isUpdate}
                />
              </label>
              <label>
                Cin
                <input
                  type="text"
                  onChange={(e) => setCin(e.target.value)}
                  placeholder="Cin"
                  value={cin}
                  readOnly={!isUpdate}
                />
              </label>
              <label>
                Email
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  value={email}
                  readOnly={!isUpdate}
                />
              </label>
              <label>
                Phone
                <input
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  value={phone}
                  readOnly={!isUpdate}
                />
              </label>
              <label>
                Date Naissance
                <DatePicker
                  onChange={handleDateChange}
                  format={"DD-MM-YYYY"}
                  className="w-full text-lg  p-2 border border-solid border-grayish text-black placeholder:text-black"
                />
                <div>
                  {date_naissance &&
                    format(parseISO(date_naissance), "dd MMMM Y")}{" "}
                </div>
              </label>

              <label>
                Role
                <input type="text" placeholder="Role" value={role} readOnly />
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

export default AdminClientDetails
