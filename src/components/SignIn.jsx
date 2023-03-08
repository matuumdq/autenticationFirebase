import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { signIn } = UserAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError('')
        try {
            await signIn(email, password)
            navigate('/account')
        } catch (error) {
            setError(error.message)
            console.log(error.message)
        }
    }

  return (
    <div className='max-w[700px] mx-auto my-16 p-4'>
        <div>
            <h1 className='text-2xl font-bold py-2'>Sing in to your Account</h1>
            <p className='py-2'>
                Dont't have an account yet? <Link to='/singup' className='underline'>Sing up</Link>
            </p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Email Address</label>
                <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email" />
            </div>
            <div className='flex flex-col py-2'>
                <label className='py-2 font-medium'>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password" />
            </div>
            <button className='border border-gray-400 bg-gray-600 hover:bg-gray-500 w-full text-white p-4 my-2 font-bold shadow-lg shadow-gray-500 ease-in duration-100 rounded-lg'>Sing In</button>
        </form>
    </div>  
  )
}

export default SignIn