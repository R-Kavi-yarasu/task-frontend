import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Task() {
  const navi = useNavigate()
  const [user, setUser] = useState([]);
  const [inpData, setInpData] = useState({
    title: "",
    description: "",
    assignedto: ""
  })

  const handleInpChange = (e) => {
    const { name, value } = e.target;

    setInpData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    axios.get('https://task-backend-rkdl.onrender.com/user/get')
      .then((res) => {
        setUser(res.data)
      })
      .catch((error) => { console.log(error) })

  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://task-backend-rkdl.onrender.com/task/post', inpData)
      .then(() => {
        alert("added")
        navi('/')
      })
      .catch((error) => console.log(error))
  }
  return (
    <div>
      <div className="task p-5">

        {/* Back button */}
        <Link to={"/"} className="back-button bg-primary">
          <i className="bi bi-arrow-left"></i>
        </Link>

        {/*Add Task Page */}
        <div className=" d-flex justify-content-center pt-4">
          <div className="task-main p-5 border lh-lg">
            <h1 className='text-center mb-4'>Task</h1>
            <form action="" onSubmit={handleSubmit}>
              <label htmlFor="title" className='form-label'>Title</label>
              <input type="text" name="title" id="title" className='form-control' value={inpData.title} onChange={handleInpChange} required />

              <label htmlFor="description" className='form-label'>Description</label>
              <textarea type="text" name="description" id="description" className='form-control' value={inpData.description} onChange={handleInpChange} required />

              <label htmlFor="assignedto" className='form-label'>Assigned User</label>
              <select className="form-select" id='assignedto' value={inpData.assignedto} onChange={handleInpChange} name='assignedto'>
                <option selected>Select the User</option>
                {
                  user.map((item) => {
                    return <option key={item._id} value={item.Name}>{item.Name}</option>
                  })
                }
              </select>

              <div className='task-btn text-end mt-4'>
                <button className='btn btn-primary w-50 '>Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
