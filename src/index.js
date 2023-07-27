// Importaciones
import React from 'react';
import ReactDOM from 'react-dom'; // Actualizamos la importación para usar react-dom directamente
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// Crear el nodo raíz para renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

// Configurar la URL base para las solicitudes Axios utilizando una variable de entorno
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Renderizar la aplicación en el nodo raíz
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Iniciar la medición del rendimiento de la aplicación
reportWebVitals(console.log); // Actualizamos el parámetro para pasar la función de registro de resultados
