// src/components/CategoryButtons.jsx
import React from 'react';
import AmericanIcon from '../iconos/american.svg';
import PizzaIcon from '../iconos/pizza.svg';
import OnigiriIcon from '../iconos/onigiri.svg';
import TacoIcon from '../iconos/taco.svg';


function CategoryButtons({ onCategorySelect }) {
  const categorias = ['Americana', 'Italiana', 'Japonesa', 'Mexicana'];

  return (
    <div className="category-buttons mb-4 d-flex justify-content-center">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          className="btn btn-outline-secondary me-2 category-button"
          onClick={() => onCategorySelect(categoria)}
        >
          {categoria === 'Americana' && <img src={AmericanIcon} alt="Americana" className="icono" />}
          {categoria === 'Italiana' && <img src={PizzaIcon} alt="Italiana" className="icono" />}
          {categoria === 'Japonesa' && <img src={OnigiriIcon} alt="Japonesa" className="icono" />}
          {categoria === 'Mexicana' && <img src={TacoIcon} alt="Mexicana" className="icono" />}
          <span>{categoria}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryButtons;
