import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from '../components/Layout';
 
function ProjectEdit() {
    // Obtenemos el ID del proyecto de los parámetros de la URL utilizando el hook useParams.
    const [id, setId] = useState(useParams().id);

    // Definimos estados locales para manejar el nombre, descripción y estado del formulario.
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);
  
    // Utilizamos useEffect para realizar una solicitud GET a la API y cargar los datos del proyecto al cargar la página.
    useEffect(() => {
        axios.get(`/api/projects/${id}`)
        .then(function (response) {
            // Si la solicitud tiene éxito, actualizamos los estados con los datos del proyecto.
            let project = response.data;
            setName(project.name);
            setDescription(project.description);
        })
        .catch(function (error) {
            // Si la solicitud falla, mostramos una notificación de error usando SweetAlert2.
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred!',
                showConfirmButton: false,
                timer: 1500
            });
        })
    }, []);
  
    // Función que se ejecuta al hacer clic en el botón "Update Project".
    const handleSave = () => {
        setIsSaving(true);

        // Hacemos una solicitud PATCH a la API para actualizar los datos del proyecto.
        axios.patch(`/api/projects/${id}`, {
            name: name,
            description: description
        })
        .then(function (response) {
            // Si la solicitud tiene éxito, mostramos una notificación de éxito usando SweetAlert2.
            Swal.fire({
                icon: 'success',
                title: 'Project updated successfully!',
                showConfirmButton: false,
                timer: 3000
            });

            // Reseteamos el estado de "isSaving" para permitir que el usuario intente guardar nuevamente.
            setIsSaving(false);
        })
        .catch(function (error) {
            // Si la solicitud falla, mostramos una notificación de error usando SweetAlert2.
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred!',
                showConfirmButton: false,
                timer: 3000
            });

            // Reseteamos el estado de "isSaving" para permitir que el usuario intente guardar nuevamente.
            setIsSaving(false);
        });
    }
  
    return (
        <Layout>
            {/* Componente Layout para envolver el contenido */}
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit Project</h2>
                {/* Título del formulario */}
                <div className="card">
                    <div className="card-header">
                        {/* Enlace para ver todos los proyectos */}
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/">View All Projects
                        </Link>
                    </div>
                    <div className="card-body">
                        {/* Formulario para editar el proyecto */}
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                {/* Campo de entrada para el nombre del proyecto */}
                                <input 
                                    onChange={(event)=>{setName(event.target.value)}}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                {/* Área de texto para la descripción del proyecto */}
                                <textarea 
                                    value={description}
                                    onChange={(event)=>{setDescription(event.target.value)}}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="description"
                                ></textarea>
                            </div>
                            {/* Botón para guardar los cambios del proyecto */}
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-success mt-3"
                            >
                                Update Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjectEdit;
