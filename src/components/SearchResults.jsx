// src/components/SearchResults.jsx
import React from 'react';

function SearchResults({ resultados, onRecipeSelect }) {
  return (
    <div className="row">
      {resultados.map((resultado) => (
        <div className="col-md-4" key={resultado.id}>
          <div className="card mb-4" onClick={() => onRecipeSelect(resultado.id)}>
            <img src={resultado.image} className="card-img-top" alt={resultado.title} />
            <div className="card-body">
              <h5 className="card-title">{resultado.title}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
