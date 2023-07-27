// Importar los módulos y componentes necesarios
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../components/Layout";

// Definir el componente funcional
function ProjectShow() {
    // Obtener el parámetro "id" desde la URL mediante el hook useParams()
    const [id, setId] = useState(useParams().id);
    
    // Estado para almacenar los datos del proyecto
    const [project, setProject] = useState({ name: '', description: '' });

    // Obtener los datos del proyecto desde la API al cargar el componente
    useEffect(() => {
        axios.get(`/api/projects/${id}`)
            .then(function (response) {
                setProject(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // Renderizar el componente
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Ver Proyecto</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/"> Ver Todos los Proyectos
                        </Link>
                    </div>
                    <div className="card-body">
                        {/* Mostrar el nombre y descripción del proyecto */}
                        <b className="text-muted">Nombre:</b>
                        <p>{project.name}</p>
                        <b className="text-muted">Descripción:</b>
                        <p>{project.description}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectShow;
