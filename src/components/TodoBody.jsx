import React, { useContext, useState } from 'react'
import { TodoContext } from './TodoContext'

const TodoBody = () => {
  const ct = useContext(TodoContext);
  const [text, setText] = useState('');

  const onclickbtn = (e) => {
    ct.dispatch({ type: 'add', payload: { date: ct.viewDate, todo: { text: text, id: Date.now(), isComplate: false } } });
  }

  const onToggle = (e) => {
    ct.dispatch({ type: 'toggle', payload: { date: ct.viewDate, id: e.target.className } })
  }

  const onDel = (e) => {
    ct.dispatch({ type: 'del', payload: { date: ct.viewDate, id: e.target.className } })
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className='todobody'>
        <ul>
          {ct.state.filter(p => p.date === ct.viewDate).length > 0 && ct.state.filter(p => p.date === ct.viewDate)[0].todos.map(p => <li key={p.id} ><span className={p.id} style={p.isComplate ? { textDecoration: 'line-through' } : {}} onClick={onToggle} onSelect={e => console.log(e)} onDragStart={e => { console.log(e); return false; }} >{p.text}</span><button className={p.id} onClick={onDel}>삭제</button></li>)}
        </ul>
      </div>
      <div className='inputbox' style={ct.viewInputbox ? { display: 'block' } : {}}>
        <input type='text' value={text} onChange={(e) => setText(e.target.value)} onKeyUp={(e) => {
          if (e.key === "Enter") {
            onclickbtn(e);
            setText('');
          }
        }} />
        <button onClick={onclickbtn} style={{ display: 'none' }}>추가</button>
      </div>
    </div>
  )
}

export default TodoBody