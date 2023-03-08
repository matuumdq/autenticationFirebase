import { Route, Routes } from 'react-router-dom'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import SignIn from './components/SignIn'
import SingUp from './components/SingUp'
import { AuthContextProvider } from './context/AuthContext'
import { FaTasks } from 'react-icons/fa'
import { ParticlesComponent } from './components/Particles'
import PageNotFound from './components/PageNotFound'

function App() {
  
  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center'>
        <div className='flex items-center'>
            <FaTasks size={24} color={'#1CB5E0'}/>
            <h1 className='text-4xl font-medium text-center text-black p-2'>
                todo
            </h1>
        </div>
        <AuthContextProvider>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/singup' element={<SingUp />} />
                <Route path='/account' 
                    element = {
                    <ProtectedRoute>
                        <Account />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </AuthContextProvider>
        <ParticlesComponent id="tsparticles" />
    </div>
  )
}

export default App
