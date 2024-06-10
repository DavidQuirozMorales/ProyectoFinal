// src/components/Mexicana.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Mexicana() {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    const obtenerRecetas = async () => {
      try {
        const respuesta = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
            cuisine: 'Mexican',
            number: 24,
          },
        });
        setRecetas(respuesta.data.results);
      } catch (error) {
        Swal.fire('Error', 'No se pudo obtener las recetas', 'error');
      }
    };
    obtenerRecetas();
  }, []);

  return (
    <div className="row">
      {recetas.map((receta) => (
        <div className="col-md-4" key={receta.id}>
          <div className="card mb-4">
            <img src={receta.image} className="card-img-top" alt={receta.title} />
            <div className="card-body">
              <h5 className="card-title">{receta.title}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Mexicana;
