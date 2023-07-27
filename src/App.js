// Importamos las librerías necesarias de React y React Router.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos los componentes de las páginas que se usarán en las rutas.
import ProjectList from './pages/ProjectList';
import ProjectCreate from './pages/ProjectCreate';
import ProjectEdit from './pages/ProjectEdit';
import ProjectShow from './pages/ProjectShow';
 
function App() {
  return (
    // Configuramos el enrutador utilizando BrowserRouter.
    <Router>
      <Routes>
        {/* Definimos las rutas y los componentes que se renderizarán para cada una. */}
        <Route exact path="/"  element={<ProjectList/>} />
        {/* La ruta "/create" mostrará el componente ProjectCreate */}
        <Route path="/create"  element={<ProjectCreate/>} />
        {/* La ruta "/edit/:id" mostrará el componente ProjectEdit, el ":id" es un parámetro dinámico */}
        <Route path="/edit/:id"  element={<ProjectEdit/>} />
        {/* La ruta "/show/:id" mostrará el componente ProjectShow, el ":id" es un parámetro dinámico */}
        <Route path="/show/:id"  element={<ProjectShow/>} />
      </Routes>
    </Router>
  );
}
 
export default App;
