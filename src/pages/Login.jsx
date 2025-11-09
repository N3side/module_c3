import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { $fetch } from "../fetch";
import { useState } from "react";


export default function Login() {
    const form = useRef();

    const Navigate = useNavigate()

    const [errors, setErrors] = useState(null)

    async function handleSubmit(e) {

        e.preventDefault()

        const formData = new FormData(form.current);

        const response = await $fetch("auth/login", {
            "method": "POST",
            "body": formData
        })

        if (response?.response?.errors) {
            setErrors(response?.response?.errors)
        }

        const token = response?.json?.data?.token

        if (token) {
            localStorage.setItem("token", token)
            alert("Успешный вход")
            Navigate("/profile")
        }
    }

    return (
        <form ref={form} onSubmit={handleSubmit}>
            <span>{errors?.email}</span>

            <input type="email" name="email" id="" placeholder="email"/>
            <span>{errors?.email}</span>
            <br />
            <input type="password" name="password" id="" placeholder="password"/>
            <span>{errors?.email}</span>
            <br />
            <input type="submit" value="Войти"/>
        </form>
    )
}