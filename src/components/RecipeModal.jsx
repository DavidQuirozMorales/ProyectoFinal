// src/components/RecipeModal.jsx
import React from 'react';
import './RecipeModal.css';

function RecipeModal({ isOpen, closeModal, recipe }) {
  if (!isOpen || !recipe) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <div className="recipe-details">
          <h3>Ingredients</h3>
          <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
