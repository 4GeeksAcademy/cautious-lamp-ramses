import React from "react";
import { useState } from "react";
import Tarea from "./Tarea";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

const Home = () => {
	let [listaDeTareas, setlistaDeTareas] = useState([
		"practicar react",
		"bañar al perro",
		"sacar la basura",
		"hacer la cena",
		"hacer las compras",

	])

	const [nuevaTarea, setNuevaTarea] = useState()
	let agregarTarea = (key) => {
		if (key === "Enter" && nuevaTarea?.trim()) {
			setlistaDeTareas([...listaDeTareas, nuevaTarea.trim()]);
			setNuevaTarea("");  // Limpia el input
		}
	}
	let deleteTarea = (index) => {
		setlistaDeTareas(listaDeTareas.filter((item, i) => index !== i))
	}
	return (
		<div className="card text-center mt-5 container d-flex justify-content-center align-items-center">
			<div className="card-body">
				<div>
					<h1 className="card-title">To do list </h1>
					<input onChange={event => { setNuevaTarea(event.target.value) }} type="text" placeholder="Que ahi por hacer" value={nuevaTarea || ""}
						onKeyUp={event => { agregarTarea(event.key) }}
					/>
				</div>
				{
					listaDeTareas.map((tarea, index) => {
						return (<Tarea key={index} descripcion={tarea} onDelete={() => deleteTarea(index)} />)
					})
				}
			</div>
            {
				<div className="d-flex justify-content-between aliggn-items-center mt-3 pt-3 border-top">
					<small className="text-muted">
						{listaDeTareas.length === 0
							? "No hay tareas ,añadir tareas"
							: listaDeTareas.length === 1 ? "1 tarea" : `${listaDeTareas.length} tareas`}
					</small>
				</div>
			}
		</div >
	);
};

export default Home;