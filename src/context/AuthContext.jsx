import { createContext, useContext, useEffect, useState } from "react";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";
import { auth, db } from '../firebase'
import { Toaster, toast } from 'sonner';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    const createTodo = async(e) => {
        e.preventDefault()
        if(input === '' ) {
            // TODO add toast
            (toast.error('Describe todo'))
            return
        }

    await addDoc(collection(db, `${user.email}`), {
        text: input,
        completed: false,
    })
    .then(toast.success('ToDo Added'))
    setInput('')
    }

    // Update todo in Firebase
    const toggleComplete = async(todo) => {
        
        await updateDoc(doc(db, `${user.email}`, todo.id), {
            completed: !todo.completed
        })
        if(!todo.completed) return toast.success('To do finished successfully')
        if(todo.completed) return toast.error('To do unfinished')

    }

    // delete todo
    const deleteTodo = async(id) => {
        await deleteDoc(doc(db,  `${user.email}`, id))
            .then(toast.error('ToDo removed successfully'))
    }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setTodos([])
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    

    return (
        <UserContext.Provider value={{ 
            createUser, 
            user, 
            logout, 
            signIn,
            createTodo,
            toggleComplete,
            deleteTodo,
            todos,
            setTodos,
            input,
            setInput
            }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}