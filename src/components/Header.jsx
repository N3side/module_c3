import { useContext, useEffectEvent } from "react"
import {Link} from "react-router-dom"
import { UserContext } from "../App"

export default function Header() {

    const {user} = useContext(UserContext)
    const token = localStorage.getItem("token")

    return (
        <header className="header">
            <p>Лого</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Главная</Link>
                    </li>

                    <li>
                        <Link to="/books">Книги</Link>
                    </li>

                    <li>
                        <Link to="/reviews">Отзывы</Link>
                    </li>
                </ul>
            </nav>
            {
                !token && (
                    <>
                        <Link to="/login">
                            <button>
                                    Войти
                            </button>
                        </Link>
                        <Link to="/register">
                            <button>
                                    регистрация
                            </button>
                        </Link>
                    </>
                )
            }
            {
                user && token && (
                    <>
                        <Link to="/profile">
                            <button>Профиль</button>
                        </Link>
                        <Link to="/logout">
                            <button>Выйти</button>
                        </Link>
                    </>
                )
            }
        </header>
    )
}