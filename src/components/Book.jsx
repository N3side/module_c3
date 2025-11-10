import { Link } from "react-router-dom"
import { $fetch } from "../fetch"

export default function Book({book, setCurrent}) {

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
                                    <div className="genre">{genre?.genre}</div>
                                })
                            }
                        </div>
                    )
                }

            </div>

            <div className="buttons">
                <Link to={"/book/" + book?.id}>
                    <button>Больше</button>
                </Link>
            </div>
        </div>
    )
}