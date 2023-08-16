import React, { useContext } from 'react'
import { TodoContext } from './TodoContext'

const TodoInputBox = () => {
  const ct = useContext(TodoContext);
  return (
    <div className='inputboxtogglebtn' style={ct.viewInputbox?{transform: 'translate(-50%, -50%) rotate(45deg)'}:{}} onClick={(e)=>{ct.setViewInputbox(!ct.viewInputbox);}} >
      +
    </div>
  )
}

export default TodoInputBox