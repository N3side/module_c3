import { createPortal } from "react-dom"

export default function modal({title="Модальное окно", children, isOpen, setIsOpen }) {

    // if (!isOpen) {
    //     return null
    // }

    return createPortal(
        <div className={isOpen ? "modal active" : "modal"} onClick={() => setIsOpen(false)}>
            <div className="inner" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body

    )
}