import { FaRegTrashAlt } from 'react-icons/fa'
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

const Todo = ({todo}) => {
    const { toggleComplete, deleteTodo } = UserAuth()
    const todoCap = (todo.text).charAt(0).toUpperCase() + (todo.text).slice(1)
    
  return (
    <li className={`flex justify-between p-4 my-3 rounded-sm shadow-md shadow-slate-300 ${todo.completed ? 'bg-slate-200 text-black' : 'bg-slate-400 text-white'} ease-in duration-200`}>
        <div className='flex max-w-[500px]'>
            <input onChange={ ()=> toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''}/>
            <p onClick={ () => toggleComplete(todo)} className={`ml-4 cursor-pointer ${todo.completed ? 'line-through' : ''} ease-in duration-200`}>{todoCap}</p>
        </div>
        <button onClick={() => deleteTodo(todo.id)} className={` hover:text-slate-800 ease-in duration-300 ${todo.completed ? 'text-black' : 'text-white'}`} >{<FaRegTrashAlt/>}</button>
    </li>
  )
}

export default Todo