import React from "react";
import { useState, useEffect } from "react";
import Tarea from "./Tarea";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

const Home = () => {
	const apiUrl = "https://playground.4geeks.com/todo/users/Ramses";

	let [listaDeTareas, setlistaDeTareas] = useState([])

	const [nuevaTarea, setNuevaTarea] = useState()
	const onload = () => {
		fetch(apiUrl).then(Response => {
			return Response.json()
		}).then(datos => {
			setlistaDeTareas(datos.todos)
		})
	}

	useEffect(onload, [])

	let agregarTarea = (key) => {
		if (key === "Enter" && nuevaTarea?.trim()) {
			//setlistaDeTareas([...listaDeTareas, nuevaTarea.trim()]);
			//setNuevaTarea("");  // Limpia el input

			fetch('https://playground.4geeks.com/todo/todos/Ramses', {
				method: "POST",
				body: JSON.stringify({
					label: nuevaTarea, is_dine: false
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					console.log(resp.ok); // Será true si la respuesta es exitosa
					if (resp.ok) {
						onload()
						setNuevaTarea("");  // Limpia el input
					}
					console.log(resp.status); // El código de estado 201, 300, 400, etc.
					return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
					console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});
		}
	}
	let deleteTarea = (id) => {
		//setlistaDeTareas(listaDeTareas.filter((item, i) => index !== i))
		fetch('https://playground.4geeks.com/todo/todos/'+ id, {
			method: "DELETE",
			
		})
			.then(resp => {
				console.log(resp.ok); // Será true si la respuesta es exitosa
				if (resp.ok) {
					onload()
				
				}
				console.log(resp.status); // El código de estado 201, 300, 400, etc.
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});

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
						return (<Tarea key={index} descripcion={tarea.label} onDelete={() => deleteTarea(tarea.id)} />)
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