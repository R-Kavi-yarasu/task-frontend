import React from 'react'
import TaskCard from './TaskCard'
import DropArea from './DropArea'

export default function TaskColumns({ title, setActiveTask, task, handleShow, handleDelete, status, onDrop,confirmDelete }) {
  return (
    <div className="task-column border p-3">
      <h4 className='text-center'>{title}</h4>
      <hr />
      {
        task.filter((item) => item.TaskStatus === status).length === 0 && (
          <DropArea onDrop={() => onDrop(status, 0)} />
        )
      }
      {
        task.map((item, index) => (
          item.TaskStatus === status &&
          <React.Fragment key={index}>
            <DropArea onDrop={() => onDrop(status, 0)} />
            <TaskCard setActiveTask={setActiveTask} handleShow={handleShow} handleDelete={handleDelete} item={item} index={index} confirmDelete={confirmDelete} />
            <DropArea onDrop={() => onDrop(status, index + 1)} />
          </React.Fragment>
        ))
      }
    </div>


  )
}
