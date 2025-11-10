import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { $fetch } from "../fetch"

export default function Register() {
    
    const form = useRef()

    const [errors, setErrors] = useState(null)

    const navigate = useNavigate()
    
    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(form.current)

        const response = await $fetch("auth/register", {
            method:"POST",
            body:formData
        })

        const err = response?.json?.errors

        if (err) {
            setErrors(err)
        }

        alert(response?.json?.message)

        if (response?.response?.status === 201) {
            navigate("/login")
        }
        
    }
    
    return (
        <form ref={form} onSubmit={handleSubmit}>
            <div className="item">
                <input type="string" name="first_name" placeholder="first_name"/>
                <span className="error">{errors?.first_name}</span>
            </div>
            <div className="item">
                <input type="string" name="last_name" placeholder="last_name"/>
                <span className="error">{errors?.last_name}</span>
            </div>
            <div className="item">
                <input type="string" name="patronymic" placeholder="patronymic"/>
                <span className="error">{errors?.patronymic}</span>
            </div>
            <div className="item">
                <label htmlFor="birth_date">birth_date</label>
                <input type="date" name="birth_date" />
                <span className="error">{errors?.birth_date}</span>
            </div>
            <div className="item">
                <input type="string" name="email" placeholder="email"/>
                <span className="error">{errors?.email}</span>
            </div>
            <div className="item">
                <input type="string" name="password" placeholder="password"/>
                <span className="error">{errors?.password}</span>
            </div>

            <input type="submit" value="Регистрация" />
        </form>
    )
}