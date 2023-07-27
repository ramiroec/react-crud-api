// Importar los módulos y componentes necesarios
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from "../components/Layout";

// Definir el componente funcional
function ProjectList() {
    // Estado para almacenar la lista de proyectos
    const [projectList, setProjectList] = useState([]);

    // Obtener la lista de proyectos al montar el componente
    useEffect(() => {
        fetchProjectList();
    }, []);

    // Función para obtener la lista de proyectos desde la API
    const fetchProjectList = () => {
        axios.get('/api/projects')
            .then(function (response) {
                setProjectList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Función para manejar la eliminación de un proyecto
    const handleDelete = (id) => {
        // Mostrar una ventana emergente de confirmación antes de eliminar
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma la eliminación, hacer una solicitud DELETE a la API
                axios.delete(`/api/projects/${id}`)
                    .then(function (response) {
                        // Mostrar un mensaje de éxito y actualizar la lista de proyectos
                        Swal.fire({
                            icon: 'success',
                            title: '¡Proyecto eliminado exitosamente!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        fetchProjectList(); // Obtener la lista de proyectos actualizada
                    })
                    .catch(function (error) {
                        // Mostrar un mensaje de error si falla la eliminación
                        Swal.fire({
                            icon: 'error',
                            title: '¡Ocurrió un error!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }
        });
    }

    // Renderizar el componente
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Administrador de Proyectos</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/create">Crear Nuevo Proyecto
                        </Link>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th width="240px">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Iterar a través de projectList para mostrar cada proyecto */}
                                {projectList.map((project, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{project.name}</td>
                                            <td>{project.description}</td>
                                            <td>
                                                {/* Enlaces para ver, editar y eliminar cada proyecto */}
                                                <Link
                                                    to={`/show/${project.id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Ver
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${project.id}`}>
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectList;
