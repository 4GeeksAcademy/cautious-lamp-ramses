import { useState } from "react"

const Tarea = (  {descripcion, onDelete}) =>{
    const [isHover, setIsHover] = useState(false)
    return (
                <p className="border-bottom mt-2" onMouseEnter={() => setIsHover(true) } onMouseLeave={() => setIsHover(false)}>{descripcion}
                {isHover && <button className="btn btn-secondary text-white ms-2" onClick={onDelete} > X </button>}
                </p>
            )
}

export default Tarea ;