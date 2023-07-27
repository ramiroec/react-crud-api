import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from '../components/Layout';

function ProjecCreate() {
    // Definimos tres estados locales usando el hook useState para manejar el estado del formulario.
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Función que se ejecuta al hacer clic en el botón "Save Project".
    const handleSave = () => {
        setIsSaving(true);

        // Hacemos una solicitud POST a la API para guardar el proyecto.
        axios.post('/api/projects', {
            name: name,
            description: description
        })
            .then(function (response) {
                // Si la solicitud tiene éxito, mostramos una notificación de éxito usando SweetAlert2.
                Swal.fire({
                    icon: 'success',
                    title: 'Project saved successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Reseteamos los estados y vaciamos los campos del formulario después de guardar el proyecto.
                setIsSaving(false);
                setName('');
                setDescription('');
            })
            .catch(function (error) {
                // Si la solicitud falla, mostramos una notificación de error usando SweetAlert2.
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occurred!',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Reseteamos el estado de "isSaving" para permitir que el usuario intente guardar nuevamente.
                setIsSaving(false);
            });
    }

    return (
        <Layout>
            {/* Componente Layout para envolver el contenido */}
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Project</h2>
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
                        {/* Formulario para crear un nuevo proyecto */}
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                {/* Campo de entrada para el nombre del proyecto */}
                                <input
                                    onChange={(event) => { setName(event.target.value) }}
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
                                    onChange={(event) => { setDescription(event.target.value) }}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="description"
                                ></textarea>
                            </div>
                            {/* Botón para guardar el proyecto */}
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-primary mt-3"
                            >
                                Save Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjecCreate;
