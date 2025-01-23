import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'
// import DropArea from './DropArea';
import TaskColumns from './TaskColumns';

export default function Dashboard() {
   const [user, setUser] = useState([]); 
  const [task, setTask] = useState([])
  const [activeTask, setActiveTask] = useState(null)
  const [inpData, setInpData] = useState({
    title: "",
    description: "",
    assignedto: ""
  })

  useEffect(() => {
    axios.get('https://task-backend-rkdl.onrender.com/user/get')
      .then((res) => {
        setUser(res.data)
      })
      .catch((error) => { console.log(error) })

  }, [user])

  useEffect(() => {
    axios.get("https://task-backend-rkdl.onrender.com/task/get")
      .then((res) => {
        setTask(res.data)
      })
      .catch((err) => console.log(err))
  }, [task])

  const handleInpChange = (e) => {
    const { name, value } = e.target;

    setInpData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const [show, setShow] = useState(false);
  const [delShow, setDelShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setDelShow(false)
  };
  const handleShow = (id) => {
    axios.get('https://task-backend-rkdl.onrender.com/task/get/' + id)
      .then((res) => {
        setInpData({
          title: res.data.Title,
          description: res.data.Description,
          assignedto: res.data.AssignedUser
        })
        localStorage.setItem("_id", id)
        setShow(true)
      })
      .catch((error) => { console.log(error) })
  };
  const handleEdit = () => {
    const id = localStorage.getItem('_id');

    axios.put("https://task-backend-rkdl.onrender.com/task/put/" + id, inpData)
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
      axios.delete("https://task-backend-rkdl.onrender.com/task/delete/" + id)
        .then(() => {
          localStorage.clear();
          setDelShow(false)
        })
        .catch((err) => console.log(err))
  }

  const onDrop = (status, postion) => {
    
    if(activeTask === null || activeTask === undefined) return;

    const taskToMove = task[activeTask];
    const updatedTask = task.filter((item,index)=>index !== activeTask)

    updatedTask.splice(postion,0,{
      ...taskToMove,
      TaskStatus: status
    })

    axios
    .put(`https://task-backend-rkdl.onrender.com/task/put/${taskToMove._id}`, {
      ...taskToMove,
      taskstatus: status,
    })
    .then(() => {
      console.log('Task status updated successfully');
    })
    .catch((err) => console.error('Error updating task status:', err));
  }
  


  return (
    <>
    {/* Dasboard */}
      <div className="dashboard p-4" >
        
        <header>
          <nav className='d-flex align-items-center justify-content-between'>
            <h3>Task Management System</h3>
            <div className="d-flex gap-4 align-items-center">
              <Link className='btn btn-primary h-75' to={"/task"}>Add Task</Link>
              <div className="profile">
                <Link to={"/profile"} className='fs-1 text-secondary'>
                  <i className="bi bi-person-circle"></i>
                </Link>
              </div>
            </div>
          </nav>
        </header>


        <div className="Task-status-card mt-5 d-md-flex justify-content-between">
          <TaskColumns title="To Do" status="todo" setActiveTask={setActiveTask} task={task} handleShow={handleShow} handleDelete={handleDelete} onDrop={onDrop} confirmDelete={confirmDelete}/>
          <TaskColumns title="Inprogress" status="inprogress" setActiveTask={setActiveTask} task={task} handleShow={handleShow} handleDelete={handleDelete} onDrop={onDrop} confirmDelete={confirmDelete}/>
          <TaskColumns title="Done" status="done" setActiveTask={setActiveTask} task={task} handleShow={handleShow} handleDelete={handleDelete} onDrop={onDrop} confirmDelete={confirmDelete}/>

        </div>

      </div>


      {/* Model */}

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


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <label htmlFor="title" className='form-label'>Title</label>
          <input type="text" name="title" id="title" className='form-control' value={inpData.title} onChange={handleInpChange} required />

          <label htmlFor="description" className='form-label'>Description</label>
          <textarea type="text" name="description" id="description" className='form-control' value={inpData.description} onChange={handleInpChange} required />

          <label htmlFor="assignedto" className='form-label'>Assigned User</label>
          <select className="form-select" id='assignedto' value={inpData.assignedto} onChange={handleInpChange} name='assignedto'>

            <option selected>Select the User</option>
            {
              user.map((item)=>{
                return <option key={item._id} value={item.Name}>{item.Name}</option>
              })
            }
          </select>


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
    </>
  )
}

