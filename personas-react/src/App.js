import React, { useState } from 'react';
import PersonForm from './components/PersonForm';
import PersonDetail from './components/PersonDetail';
import './App.css'; // Importamos el archivo CSS

function App() {
  const [view, setView] = useState(''); // Estado para controlar qué componente mostrar

  const handleShowDetail = () => {
    setView('detail'); // Muestra el componente PersonDetail
  };

  const handleShowForm = () => {
    setView('form'); // Muestra el componente PersonForm
  };

  return (
    <div className="App">
      <h1>Person Management</h1>
      <div className="button-container">
        <button className="action-button" onClick={handleShowDetail}>
          Consultar
        </button>
        <button className="action-button" onClick={handleShowForm}>
          Modificar
        </button>
      </div>
      <hr />
      <div className="content">
        {view === 'detail' && <PersonDetail />}
        {view === 'form' && <PersonForm />}
      </div>
    </div>
  );
}

export default App;
