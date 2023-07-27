import React from 'react';
  
// Definimos un componente de diseño (Layout) que recibe 'children' como prop.
// Los 'children' son los componentes o elementos que se colocan dentro del Layout.
const Layout = ({ children }) => {
    return (
        // Utilizamos una <div> con la clase "container" para envolver los 'children'.
        // De esta manera, cualquier componente que utilice el Layout será contenido dentro de esta estructura.
        <div className="container">{children}</div>
    );
}
  
export default Layout;
