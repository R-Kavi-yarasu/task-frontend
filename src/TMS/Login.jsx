import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [inpData, setInpData] = useState({
    username: '' ,
    password: ''
  })
  function handleInpChange(e) {
    const { name, value } = e.target;

    setInpData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  // console.log(inpData);
  
  return (
    <div className='login my-lg-5'>
      <div className=" border mt-5 p-5 login-main">
        <h1 className="head-login text-center mb-4">Login</h1>
        <div className="form-login">
          <form action="" >
            <label htmlFor="name" className='form-label'>Userame</label>
            <input type="text" className='form-control' name="username" id="name" placeholder='username' value={inpData.userName} onChange={handleInpChange}  required/>
            
            <label htmlFor="password" className='mt-3 form-label'>Password</label>
            <input type="password" className='form-control' name="password" id="password" placeholder='password' value={inpData.password} onChange={handleInpChange}  required/>
            
            <div className="text-center">
            <button type="submit" className='mt-4 w-100 btn btn-primary'>Login</button>
            </div>
          </form>
          <div className="goto-register text-center mt-3">
            <span>
              Don't have a account?  
              <Link to={'/register'} className='text-decoration-none'>Signup</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
