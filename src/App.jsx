import { createContext, useContext, useEffect, useState } from 'react'
import './App.css'
import { $fetch } from './fetch'
import {HashRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom"
import LayoutPage from './pages/layoutPage'

import Index from './pages/Index'
import Register from './pages/register'
import Login from './pages/login'
import Profile from './pages/Profile'
import Logout from './pages/Logout'

export function ProtectedRoute({ children }) {
    const { user, isAuthChecking } = useContext(UserContext);

    if (isAuthChecking) {
        return
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export function OnlyUnauthorized({ children }) {
    const { user, isAuthChecking } = useContext(UserContext);

    if (isAuthChecking) {
        return
    }

    if (user) {
        return <Navigate to="/profile" replace />;
    }

    return children;
}


export const UserContext = createContext(null)

function App() {

    const [user, setUser] = useState(null)
    const [isAuthChecking, setIsAuthChecking] = useState(true)

    useEffect(() => {

        async function getData() {
            const response = await $fetch("user")

            const data = response?.json?.data

            setUser(data)
            setIsAuthChecking(false)
            return;
        }

        getData()
    }, [])

    return (
        <UserContext.Provider value={{user,setUser,isAuthChecking}}>
            <HashRouter>
                <Routes>
                    <Route element={<LayoutPage />}>
                        <Route index element={<Index />}/>

                        <Route path='/login' element={
                            <OnlyUnauthorized>
                                <Login />
                            </OnlyUnauthorized>
                        }/>
                        <Route path='/logout' element={
                            <ProtectedRoute>
                                <Logout />
                            </ProtectedRoute>
                        }/>
                        <Route path='/register' element={<Register />}/>
                        <Route path='/profile' element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }/>
                    </Route>
                </Routes>
            </HashRouter>
        </UserContext.Provider>
    )
}

export default App
