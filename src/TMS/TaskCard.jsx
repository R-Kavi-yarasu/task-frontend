import React from 'react'

export default function TaskCard({ setActiveTask, item, handleShow, index, confirmDelete }) {
  return (
    <>
      <div className="task-card border bg-light p-2 my-3"
        draggable onDragStart={() => setActiveTask(index)} onDragEnd={() => setActiveTask(null)} >
        <div className="edit-delete d-flex gap-3 justify-content-end">
          <button className='btn btn-primary fs-6' onClick={() => handleShow(item._id)}>
            <i className="bi bi-pencil-square"></i>
          </button>
          <button className='btn btn-primary fs-6' onClick={() => confirmDelete(item._id)}>
            <i className="bi bi-trash3-fill"></i>
          </button>
        </div>
        <div className="task-body lh-lg">
          <div>
            <span className='fw-bold'>Title : </span>
            <span>{item.Title}</span>
          </div>
          <div>
            <span className='fw-bold'>Description :
            </span>
            <span >{item.Description}</span>
          </div>
          <div>
            <span className='fw-bold'>Assigned to :
            </span>
            <span>{item.AssignedUser}</span>
          </div>
        </div>
        <div className="task-footer mt-2 text-end text-secondary">
          <span>Created At</span> <br />
          <span>{item.CreatedAt}</span>
        </div>
      </div>
    </>
  )
}
