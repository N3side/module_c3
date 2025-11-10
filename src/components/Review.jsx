import { useContext, useEffect, useRef } from "react"
import { UserContext } from "../App"
import { $fetch } from "../fetch"
import { useState } from "react"

export default function Review({review, mode, setMode}) {

    
    const {user} = useContext(UserContext)

    const form = useRef()

    async function sendData(e) {

        e.preventDefault()

        const formData = new FormData(form.current)

        for (let [key, value] of formData) {
            console.log(key, value);
        }

        const response = await $fetch(`reviews/${review?.id}`, {
            method: "POST",
            body: formData
        })

        if (response?.json?.errors) {
            setErrors(response?.json?.errors)
        }

        if (response?.json?.message) {
            
            alert(response?.json?.message)
        }


    }


    async function destroy(e) {
        e.preventDefault()

        const response = await $fetch(`books/${book?.id}/reviews`, {
            method: "DELETE",
            body: formData
        })
    }

    const [errors, setErrors] = useState(null)

    return (
        <div className="user" key={review.id}>

            {
                mode == "read" && (
                    <>
                        <h2>Анонимный пользователь</h2>
            
                        <div className="review">
                            <div className="rating">{review?.rating}</div>
                            <div className="text">{review?.text}</div>
                        </div>
            
                        {
                            user?.id === review?.user_id && (
                                <div className="buttons">
                                    <button onClick={() => setMode("edit")}>Изменить отзыв</button>
                                    <button>Удалить отзыв</button>
                                </div>
                            )
                        }
                    </>
                )
            }

            {
                mode === "edit" && user?.id === review?.user_id && (
                    <form ref={form} onSubmit={sendData}>
                        <div className="item">
                            <input type="number" name="rating" placeholder="rating" defaultValue={review?.rating}/>
                            <span className="error">{errors?.rating}</span>
                        </div>
                        <div className="item">
                            <textarea name="text" id="" placeholder="Текст" defaultValue={review?.text}></textarea>
                            <span className="error">{errors?.rating}</span>
                        </div>

                        <input type="hidden" name="_method" value="PATCH" />

                        <button>Сохранить</button>
                        <button onClick={() => setMode("read")}>Не сохранять</button>
                    </form>
                )
            }

        </div>
    )
}