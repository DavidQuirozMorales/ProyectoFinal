// src/components/SearchBar.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function SearchBar({ onSearch, onClear }) {
  const [consulta, setConsulta] = useState('');

  const manejarBusqueda = (e) => {
    e.preventDefault();
    if (consulta.trim() === '') {
      Swal.fire('Error', 'Por favor ingrese una palabra clave', 'error');
    } else {
      onSearch(consulta);
    }
  };

  const limpiarBusqueda = () => {
    setConsulta('');
    onClear();
  };

  return (
    <form onSubmit={manejarBusqueda}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar alimentos..."
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
        />
        <button className="btn btn-secondary" type="submit">
          Buscar
        </button>
        <button className="btn btn-secondary ms-2" type="button" onClick={limpiarBusqueda}>
          Limpiar
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
