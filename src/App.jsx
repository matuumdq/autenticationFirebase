import { Route, Routes } from 'react-router-dom'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import SignIn from './components/SignIn'
import SingUp from './components/SingUp'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  
  return (
    <div>
        <h1 className='text-center text-3xl font-bold'>
            Firebase Auth & Context
        </h1>
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
            </Routes>
        </AuthContextProvider>
    </div>
  )
}

export default App
