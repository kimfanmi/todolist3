import { createContext, useReducer, useState } from "react";


function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return state.filter(p => p.date === action.payload.date).length > 0 ? state.map(p => p.date === action.payload.date ? { ...p, todos: [...p.todos, action.payload.todo] } : p) : [...state, { id: Date.now(), date: action.payload.date, todos: [action.payload.todo] }];
    case 'del':
      return state.map(p => p.date === action.payload.date ? { ...p, todos: p.todos.filter(q => q.id / 1 !== action.payload.id / 1) } : p);
    case 'toggle':
      return state.map(p => p.date === action.payload.date ? { ...p, todos: p.todos.map(q => q.id / 1 === action.payload.id / 1 ? { ...q, isComplate: !q.isComplate } : q) } : p);
    case 'load':
      return action.payload.data.length>0 ? Object.keys(action.payload.data[0]).length===3 ? action.payload.data : state : state;
    default:
      return state;
  }
}

const first_state = [];


export const TodoContext = createContext();

export const TodoPV = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, first_state);
  const [viewDate, setViewDate] = useState(new Date().toLocaleDateString());
  const [viewInputbox, setViewInputbox] = useState(false);


  const value = { state, dispatch, viewDate, setViewDate, viewInputbox, setViewInputbox };
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}