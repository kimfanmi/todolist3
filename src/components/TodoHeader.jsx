import React, { useContext } from 'react'
import { TodoContext } from './TodoContext'

const week = ['일', '월', '화', '수', '목', '금', '토'];


function setDate(date) {
  date = new Date(date);
  return [date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일', week[date.getDay()] + '요일']
}



const TodoHeader = () => {
  const ct = useContext(TodoContext);
  const onClickBtn = (e) => {
    let dt = new Date(ct.viewDate);
    dt.setDate(dt.getDate() + e.target.value / 1)
    ct.setViewDate(dt.toLocaleDateString());
  }
  const saveData = (e) => {
    let div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.left = e.pageX + 'px';
    div.style.top = e.pageY + 15 + 'px';
    div.style.background = '#999';
    div.style.padding = '11px';
    div.style.borderRadius = '5px';
    div.style.width = '350px';
    div.style.height = '200px';
    div.id = 'modal';

    let textarea = document.createElement('textarea');
    textarea.value = JSON.stringify(ct.state);
    textarea.style.width = '349px';
    textarea.style.height = '163px';

    div.appendChild(textarea);
    div.appendChild(document.createElement('br'));

    let button = document.createElement('button');
    button.innerText = 'OK';
    div.appendChild(button);
    button.style.position = 'absolute';
    button.style.bottom = '5px';
    button.style.right = '10px';
    button.style.fontSize = '1.5rem';
    button.style.padding = '2px 5px';
    button.onclick = (e) => {
      div.remove();
    }

    document.querySelector('#modal') ? document.querySelector('#modal').replaceWith(div) :
      document.querySelector('#root').appendChild(div);
    textarea.select();
  };
  const loadData = (e) => {
    let div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.left = e.pageX - 35 + 'px';
    div.style.top = e.pageY + 15 + 'px';
    div.style.background = '#999';
    div.style.padding = '11px';
    div.style.borderRadius = '5px';
    div.style.width = '350px';
    div.style.height = '200px';
    div.id = 'modal';

    let textarea = document.createElement('textarea');
    textarea.style.width = '349px';
    textarea.style.height = '163px';

    div.appendChild(textarea);
    div.appendChild(document.createElement('br'));

    let button = document.createElement('button');
    button.innerText = 'Load';
    div.appendChild(button);
    button.style.position = 'absolute';
    button.style.bottom = '5px';
    button.style.right = '10px';
    button.style.fontSize = '1.5rem';
    button.style.padding = '2px 5px';
    button.onclick = (e) => {
      let data;
      try {
        data = JSON.parse(textarea.value);
        ct.dispatch({ type: 'load', payload: { data } })
      } catch { }
      div.remove();
    }


    document.querySelector('#modal') ? document.querySelector('#modal').replaceWith(div) :
      document.querySelector('#root').appendChild(div);
    textarea.select();
  };
  return (
    <div className='todoheader'>
      <div className='vhewdatebox'>{setDate(ct.viewDate)[0]}</div>
      <button className='todoheaderbtn btnleft' value={-1} onClick={onClickBtn}>{'<--'}</button>
      <button className='todoheaderbtn btnright' value={1} onClick={onClickBtn}>{'-->'}</button>
      <div className='vhewdatebox2'>{setDate(ct.viewDate)[1]}</div>
      <button className='savebtn' style={ct.viewInputbox ? {} : { display: 'none' }} onClick={saveData}>Save</button>
      <button className='loadbtn' style={ct.viewInputbox ? {} : { display: 'none' }} onClick={loadData}>Load</button>
    </div>
  )
}

export default TodoHeader