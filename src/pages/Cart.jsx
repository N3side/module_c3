import { useEffect, useState } from "react"
import { $fetch } from "../fetch"

import Book from "../components/Book"

export default function Cart() {

    const [cart, setCart] = useState(null)

    async function getData() {
        const response = await $fetch("cart")

        const message = response?.json?.message

        if (message) {
            alert(message)
        }

        const data = response?.json?.data

        console.log(data)

        if (data) {
            setCart(data)
        }

    }

    useEffect(() => {
        getData()
    }, [])
    
    return (
        <>
            <h2>Корзина</h2>

            {
                cart && Array.isArray(cart) && (
                    cart.map((book) => {
                        return <Book book={book} />
                    }) 
                )
            }
        </>
    )

}