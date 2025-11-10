import { createContext, useContext, useEffect } from "react"
import { $fetch } from "./fetch"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import LayoutPage from "./pages/layoutPage"


import { useState } from "react"

import Index from "./pages/Index"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Logout from "./pages/Logout"
import Profile from "./pages/Profile"
import FullBook from "./pages/FullBook"



export function CheckIsUser({children}) {
    const token = localStorage.getItem("token")

    const {user,isAuthChecking} = useContext(UserContext)

    if (isAuthChecking) {
        return
    }

    if (!user || !token) {
        return <Navigate to="/login"/>
    }

    return children

}

export function CheckIsNotUser({children}) {
    const token = localStorage.getItem("token")

    const {user,isAuthChecking} = useContext(UserContext)

    if (isAuthChecking) {
        return
    }

    if (user && token) {
        return <Navigate to="/profile"/>
    }

    return children
}


export const UserContext = createContext(null)

export default function App() {
    
    const [user,setUser] = useState(null)
    const [isAuthChecking, setIsAuthChecking] = useState(true)

    const token = localStorage.getItem('token') 

    useEffect(() => {

        async function getData() {
            if (token) {
                const response = await $fetch("user")
                
                const user_response = response?.json?.data

                if (user_response) {
                    setUser(user_response)
                }
            }
            setIsAuthChecking(false)
        }

        getData()
    }, [])
    
    return (
        <UserContext.Provider value={{user,setUser,isAuthChecking}}>
            <HashRouter>
                <Routes>
                    <Route element={<LayoutPage />}>
                        <Route index element={<Index />}/>
                        <Route path="/login" element={
                            <CheckIsNotUser>
                                <Login />
                            </CheckIsNotUser>
                        }/>
                        <Route path="/book/:id" element={
                            <CheckIsUser>
                                <FullBook />
                            </CheckIsUser>
                        }/>
                        <Route path="/register" element={
                            <CheckIsNotUser>
                                <Register />
                            </CheckIsNotUser>
                        }/>
                        <Route path="/logout" element={
                            <CheckIsUser>
                                <Logout />
                            </CheckIsUser>
                        }/>
                        <Route path="/profile" element={
                            <CheckIsUser>
                                <Profile />
                            </CheckIsUser>
                        }/>
                    </Route>
                </Routes>
            </HashRouter>
        </UserContext.Provider>
    )
}