import React, { useState } from 'react'
import axios from 'axios';
export default function Register() {
  const [inpData,setInpData] = useState({
    username:"",
    email:"",
    role:""
  })

  function handleInpChange(e){
    const{name , value} = e.target;

    setInpData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();

    axios.post('https://task-backend-rkdl.onrender.com/user/post',inpData)
    .then(()=>{
      alert("added")
      window.location.reload()
    })
    .catch((error)=>console.log(error))
  }

  return (
    <div className='profile py-lg-5'>
      <div className=" border p-5 login-main">
        <h1 className="head-login text-center mb-4">Register</h1>
        <div className="form-login">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name" className='form-label'>Name</label>
            <input type="text" className='form-control' name="username" id="name" required placeholder='username' value={inpData.username} onChange={handleInpChange} />

            <label htmlFor="email" className='mt-3 form-label'>Email</label>
            <input type="email" className='form-control' name="email" id="email" required placeholder='email@mail.com' value={inpData.email} onChange={handleInpChange} />

            <label htmlFor="role" className='mt-3 form-label'>Role</label>
            <input type="text" className='form-control' name="role" id="role" required placeholder='eg.webdeveloper' value={inpData.role} onChange={handleInpChange} />
            <div className="text-center">
              <button type="submit" className='mt-4 w-100 btn btn-primary py-2'>Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
