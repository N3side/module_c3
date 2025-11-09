import {useNavigate} from "react-router-dom"
import { $fetch } from "../fetch"
import { useContext, useEffect } from "react"
import { UserContext } from "../App"

export default function Logout() {
    
    const Navigate = useNavigate()

    const token = localStorage.getItem("token")

    const user = useContext(UserContext)

    useEffect(() => {

        async function query() {
            if (user && token) {
                const response = await $fetch("auth/logout")
        
                if (response?.response?.status === 204) {
                    localStorage.removeItem("token")
                    alert("Успешный выход из системы")
                    return Navigate("/login")
                }
            }
        }

        query()

    }, [])


    return;
}