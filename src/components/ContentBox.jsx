import React from 'react'
import TodoBody from './TodoBody'
import TodoHeader from './TodoHeader'
import { TodoPV } from './TodoContext'
import TodoInputBox from './TodoInputBox'

const ContentBox = () => {
  return (
    <div className='mainbody'>
      <TodoPV>
        <div className='contentbox'>
          <TodoHeader />
          <TodoBody />
        </div>
        <TodoInputBox />
      </TodoPV>
    </div>
  )
}

export default ContentBox