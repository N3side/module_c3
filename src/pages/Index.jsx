import { useState, useEffect, useRef } from "react"
import { $fetch } from "../fetch"

import Book from "../components/Book"
import UniversalModal from "../components/modal"

export default function Index() {

    const [books, setBooks] = useState(null)

    async function getData() {

        const response = await $fetch("books")

        if (response?.json?.data) {
            console.log(response?.json?.data)
            setBooks(response?.json?.data)
        }

    }

    useEffect(() => {
        getData()
    }, [])
    
    return (
        <div className="Books">

            {books && Array.isArray(books) && (
                books.map((book) => {
                    return <Book book={book}/>
                })
            )}

        </div>
    )
}