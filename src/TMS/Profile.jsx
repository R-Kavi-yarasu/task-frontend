import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import Register from './Register'
import axios from 'axios';
import { Link } from 'react-router-dom'
export default function Profile() {

  const [inpData, setInpData] = useState({
    username: "",
    email: "",
    role: ""
  })
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);

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
  const [delShow, setDelShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setDelShow(false)
  };
  
  const handleShow = (id) => {
    axios.get('https://task-backend-rkdl.onrender.com/user/get/' + id)
      .then((res) => {
        setInpData({
          username: res.data.Name,
          email: res.data.Email,
          role: res.data.Role
        })
        localStorage.setItem("_id", id)
        setShow(true)
      })
      .catch((error) => { console.log(error) })
  };
  const handleEdit = () => {
    const id = localStorage.getItem('_id');

    axios.put("https://task-backend-rkdl.onrender.com/user/put/" + id, inpData)
      .then(() => {
        localStorage.clear();
        handleClose()

      })
      .catch((err) => {
        console.log(err);
      })
  }

  const confirmDelete = (cid) =>{
    localStorage.setItem('_id',cid);
    setDelShow(true)
  }
  const handleDelete = () => {
    const id = localStorage.getItem('_id');
      axios.delete("https://task-backend-rkdl.onrender.com/user/delete/" + id)
        .then(() => {
          localStorage.clear()
          setDelShow(false)
        })
        .catch((err) => console.log(err))
  }

  return (
    <>
      <div className="register-main">

      {/* Register Form And User list*/}
      <Register />

      {/* Back button */}
      <Link to={"/"} className="back-button bg-primary">
        <i className="bi bi-arrow-left"></i>
      </Link>

        {/* User list */}
      <div className="user-list pb-5">
        <h2 className='text-center'>User List</h2>
        
        <table className='table text-center table-secondary table-bordered container mt-5 table-responsive'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit & Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              user.map((item, index) => (
                <tr key={index}>
                  <td>{item.Name}</td>
                  <td>{item.Email}</td>
                  <td>{item.Role}</td>
                  <td>
                    <Button variant="primary" className='mx-4' onClick={() => {
                      handleShow(item._id)
                    }}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button variant="dark" onClick={() => {
                      confirmDelete(item._id)
                    }}>
                      <i className="bi bi-trash3-fill"></i>
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* Model for edit */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <label htmlFor="name" className='form-label'>Name</label>
          <input type="text" className='form-control' name="username" value={inpData.username} onChange={handleInpChange} id="name" />

          <label htmlFor="email" className='mt-3 form-label'>Email</label>
          <input type="email" className='form-control' name="email" value={inpData.email} onChange={handleInpChange} id="email" />

          <label htmlFor="role" className='mt-3 form-label'>Role</label>
          <input type="text" className='form-control' name="role" value={inpData.role} onChange={handleInpChange} id="role" />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleEdit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

       {/* Model delete */}

         <Modal show={delShow} onHide={handleClose}>
               <Modal.Header closeButton>
                 <Modal.Title>confirm Delete</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                 <p className=''>
                   Are you sure to delete this task 
                 </p>
       
               </Modal.Body>
               <Modal.Footer>
                 <Button variant="secondary" onClick={handleDelete}>
                   Ok
                 </Button>
                 <Button variant="secondary" onClick={handleClose}>
                   Cencal
                 </Button>
               </Modal.Footer>
             </Modal>
                     
      </div>
    </>



  )
}


