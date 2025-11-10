import { useEffect, useRef, useState } from "react"
import { $fetch } from "../fetch"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import UniversalModal from "../components/modal"

export default function FullBook() {

    const [book, setBook] = useState(null)

    const location = useLocation()

    const arr = location.pathname.split("/")
    const book_id = arr[arr.length - 1]
    
    async function getData() {
        const response = await $fetch(`books/${book_id}`)

        setBook(response?.json?.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const [errors, setErrors] = useState(null)

    const [isOpen, setIsOpen] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)

    const form = useRef()


    async function sendData(e) {
        e.preventDefault()

        const formData = new FormData(form.current)

        const response = await $fetch(`books/${book?.id}/reviews`, {
            method: "POST",
            body: formData
        })

        if (response?.json?.errors) {
            setErrors(response?.json?.errors)
        } else {
            alert(response?.json?.message)
        }

    }

    const [reviews, setReviews] = useState(null)

    async function getReviews() {
        const response = await $fetch(`books/${book?.id}/reviews`)

        console.log(response?.json?.data?.items)
        
        setReviews(response?.json?.data)
    }

    const [bookText, setBookText] = useState(null)
    async function Read() {
        const response = await $fetch(`books/${book?.id}/read`)

        setBookText(response?.json?.data?.text)
    }



    return (
        <div className="Book">
            <img src={book?.preview} alt="" style={{width: "200px", aspectRatio: "1 / 1.3", objectFit: "cover"}} />

            <div className="info">
                <h4>{book?.id}</h4>
                <h3>{book?.title}</h3>
                <h4>{book?.author?.author}</h4>
                <h4>{book?.price}</h4>
                <h4>{book?.rating}</h4>
                <h4>кол-во отзывов: {book?.count_reviews}</h4>

                {
                    book?.genres && (
                        <div className="genres">
                            {
                                book?.genres.map((genre) => {
                                    return <div className="genre">{genre?.genre}</div>
                                })
                            }
                        </div>
                    )
                }

            </div>

            <UniversalModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                Создать отзыв к книге
                <form ref={form} onSubmit={sendData}>
                    <div className="item">
                        <input type="number" name="rating" placeholder="rating"/>
                        <span className="error">{errors?.rating}</span>
                    </div>
                    <div className="item">
                        <textarea name="text" id="" placeholder="Текст"></textarea>
                        <span className="error">{errors?.rating}</span>
                    </div>
                    <button>Создать</button>
                </form>
            </UniversalModal>

            <UniversalModal
                isOpen={isOpen1}
                setIsOpen={setIsOpen1}
            >
                Отзывы книги
                {
                    reviews && Array.isArray(reviews?.items) && reviews.items.map((review) => (
                        <div className="user" key={review.id}>
                        <img src="" alt="" />
                        <h2>Анонимный пользователь</h2>

                        <div className="review">
                            <div className="rating">{review?.rating}</div>
                            <div className="text">{review?.text}</div>
                        </div>
                        </div>
                    ))
}


            </UniversalModal>

            <UniversalModal
                isOpen={isOpen2}
                setIsOpen={setIsOpen2}
            >
                Читать книгу "{book?.title}"
                <br />
                <br />
                {bookText}



            </UniversalModal>

            <div className="buttons">
                <button onClick={() => {setIsOpen(true)}}>Оставить отзыв</button>
                
                <button onClick={() => {setIsOpen1(true); getReviews()}}>Отзывы</button>

                <button onClick={() => {setIsOpen2(true); Read()}}>Читать</button>

            </div>
        </div>
    )
}