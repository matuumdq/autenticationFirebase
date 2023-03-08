import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const SingUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { createUser } = UserAuth()
    const navigate = useNavigate()
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        setError('')
        try {
            await createUser(email, password)
            navigate('/account')
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        }
    }
    
  return (

    <div className='max-w-[500px] w-full rounded-md shadow-xl p-4 mt-6 border'>
        <div>
            <h1 className='text-2xl font-normal py-4 '>Create your account</h1>
            <p className='py-2 font-thin'>
                Already have an account? <Link to='/' className='underline font-semibold text-[#1CB5E0]'>Log in</Link>
            </p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Email Address</label>
                <input onChange={(e) => setEmail(e.target.value)} className='border p-3 rounded-md shadow-md' placeholder='email@email.com' type="email" />
            </div>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} className='border p-3 rounded-md shadow-md' placeholder='Your password' type="password" />
            </div>
            <button className=' bg-blue-500 hover:bg-blue-400 w-full text-white p-4 my-4 font-bold shadow-lg shadow-gray-500 ease-in duration-100 rounded-lg'>Sing Up</button>
        </form>
    </div>
  )
}

export default SingUp