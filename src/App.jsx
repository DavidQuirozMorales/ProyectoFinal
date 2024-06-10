import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import CategoryButtons from './components/CategoryButtons.jsx';
import RecipeModal from './components/RecipeModal.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';

function App() {
  const [recetas, setRecetas] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    obtenerRecetasAleatorias();
  }, []); // Se ejecuta solo al cargar la página

  useEffect(() => {
    const recetasGuardadas = localStorage.getItem('recetas');
    if (recetasGuardadas) {
      setRecetas(JSON.parse(recetasGuardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recetas', JSON.stringify(recetas));
  }, [recetas]);

  const obtenerRecetasAleatorias = async () => {
    try {
      const respuesta = await axios.get('https://api.spoonacular.com/recipes/random', {
        params: {
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          number: 30, // Obtener un máximo de 30 recetas aleatorias
        },
      });
      setRecetas(respuesta.data.recipes);
    } catch (error) {
      console.error('Error al obtener recetas aleatorias:', error);
      Swal.fire('Error', 'No se pudo obtener las recetas aleatorias', 'error');
    }
  };

  const obtenerRecetas = async (palabraClave) => {
    try {
      const respuesta = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          query: palabraClave,
          number: 24,
        },
      });

      if (respuesta.data.results.length === 0) {
        Swal.fire('Error', `No se encontraron recetas para la palabra clave ingresada: ${palabraClave}`, 'error');
      } else {
        setRecetas(respuesta.data.results);
        setCategoria(null);
      }
    } catch (error) {
      console.error('Error al obtener recetas:', error);
      Swal.fire('Error', 'No se pudo obtener las recetas', 'error');
    }
  };

  const obtenerComidasTipicas = async (pais) => {
    try {
      const respuesta = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          cuisine: pais,
          number: 24,
        },
      });

      if (respuesta.data.results.length === 0) {
        Swal.fire('Error', `No se encontraron comidas típicas de ${pais}`, 'error');
      } else {
        setRecetas(respuesta.data.results);
        setCategoria(null);
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudo obtener las comidas típicas', 'error');
    }
  };

  const seleccionarCategoria = (categoria) => {
    setCategoria(categoria);
    if (categoria === 'Americana') {
      obtenerComidasTipicas('American');
    } else if (categoria === 'Italiana') {
      obtenerComidasTipicas('Italian');
    } else if (categoria === 'Japonesa') {
      obtenerComidasTipicas('Japanese');
    } else if (categoria === 'Mexicana') {
      obtenerComidasTipicas('Mexican');
    }
  };

  const limpiarBusqueda = () => {
    obtenerRecetasAleatorias(); // Llama a la función para obtener recetas aleatorias
    setCategoria(null);
  };

  const abrirModal = async (id) => {
    try {
      const respuesta = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
        },
      });
  
      setSelectedRecipe(respuesta.data);
      setModalOpen(true);
    } catch (error) {
      console.error('Error al obtener detalles de la receta:', error);
      Swal.fire('Error', 'No se pudo obtener los detalles de la receta', 'error');
    }
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <h1 className="my-4 title">Spoonacular</h1>
      <SearchBar onSearch={obtenerRecetas} onClear={limpiarBusqueda} />
      <CategoryButtons onCategorySelect={seleccionarCategoria} />
      <div className="row">
        {recetas.map((receta) => (
          <div className="col-md-4" key={receta.id}>
            <div className="card mb-4">
              <img src={receta.image} className="card-img-top" alt={receta.title} />
              <div className="card-body">
                <h5 className="card-title">{receta.title}</h5>
                <button onClick={() => abrirModal(receta.id)} className="btn btn-primary">Ver receta</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <RecipeModal isOpen={modalOpen} closeModal={cerrarModal} recipe={selectedRecipe} />
    </div>
  );
}

export default App;
