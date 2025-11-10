import { useContext } from "react"
import { UserContext } from "../App"

export default function Profile() {
    
    const {user} = useContext(UserContext)
    
    return (
        <>
            <h2>Профиль</h2>

            <div className="profile">
                <h3>{user?.id}</h3>
                <h3>{user?.first_name}</h3>
                <h3>{user?.last_name}</h3>
                <h3>{user?.patronymic}</h3>
                <h3>{user?.email}</h3>
                <h3>{user?.role}</h3>
                <h3>{user?.birth_date}</h3>
            </div>

        </>
    )
}