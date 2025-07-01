import React from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component



const Home = () => {
	let [nuevaTarea, setNuevaTarea] = useState()
	let [listaDeTareas,setlistaDeTareas] = useState([
		"practicar react",
		"bañar al perro",
		"sacar la basura",
		"hacer la cena",
		"hacer las compras",

	])
	let agregarTarea = (tecla) =>{
		if (tecla === "Enter"){
			setlistaDeTareas([...listaDeTareas, nuevaTarea.trim()]);
		}
	}
	return (
		<div className="text-center">
			<div>
				<h1>Todo </h1>
				<input onChange={event => setNuevaTarea(event.target.value)} type="text" value={nuevaTarea || " "} 
				onKeyUp={event=>agregarTarea(event.key)}
				/>
			</div>
			{
				listaDeTareas.map((tarea, index) => {
					return <p key={index}>{tarea} </p>
				})
			}
		</div>
	);
};

export default Home;