import { Navigate, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"
import { AiOutlinePlus } from 'react-icons/ai'
import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../firebase"
import Todo from "./Todo"
import { Toaster, toast} from "sonner"

const Account = () => {

    const { user, logout, input, setInput, createTodo, setTodos, todos} = UserAuth()
    const arroba = (user.email).indexOf('@')
    const name = (user.email).substr(0, arroba)
    const nameCap = name.charAt(0).toUpperCase() + name.slice(1)

     
    
    useEffect(() => {
        const q = query(collection(db, `${user.email}`))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = []
            querySnapshot.forEach((doc) => {
                todosArr.push({...doc.data(), id: doc.id})
            })
            setTodos(todosArr)
        }) 
        return() => unsubscribe()
    }, [user])

    const handleLogout = async() => {
        try {
            await logout()
            return <Navigate to='/' />
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='w-full p-4'>
        <div className="flex justify-between flex-col sm:flex-row">
            <h1 className='text-2xl font-thin py-5'>Welcome <span className="font-semibold"> {nameCap}</span> </h1>
            <button onClick={handleLogout} className='bg-blue-500 hover:bg-blue-400 text-white p-2 my-4 font-bold shadow-lg shadow-gray-500 hover:shadow-blue-300 ease-in duration-100 rounded-lg w-[100px]'>Logout</button>
        </div>
        
        <div className="border max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 mt-10">
            <form onSubmit={createTodo} className='flex justify-center items-center  my-6'>
                <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Add Todo" className="border p-2 w-full text-lg max-w-[400px]" />
                <button className="border p-2 ml-2 bg-green-500 text-slate-100"><AiOutlinePlus size={30}/> </button>
            </form>
            <ul className="pt-4" >
                    {todos.map((todo, i)=> (
                        <Todo 
                            key={i} 
                            todo={todo}
                        />
                    ))}
                </ul>
                {todos.length < 1 
                    ? <p className="text-center p-2 font-semibold text-slate-400 mt-4">Start adding todo</p>
                    :  <p className="text-center p-2 font-semibold text-slate-400 mt-4">{`You Have ${todos.length} todos`}</p>
                }
        </div>
        <Toaster />
    </div>
  )
}

export default Account