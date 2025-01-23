import React, { useState } from 'react'

export default function DropArea({onDrop}) {
  const [showDrop,setShowDrop] = useState(false)
  return (
    <div>
      <section 
      onDragEnter={()=>setShowDrop(true)}
      onDragLeave={()=>setShowDrop(false)}
      onDrop={()=>{
        onDrop()
        setShowDrop(false)
      }}
      onDragOver={e => e.preventDefault()}
      className={showDrop ? "drop-area" : "hide-drop"}>
        Drop here
      </section>
    </div>
  )
}
