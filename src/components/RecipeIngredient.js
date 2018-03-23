import React from 'react';
import ReactDOM from 'react-dom';

const RecipeIngredient = (props) => {
  return (
    <li className="list-group-item w-75">{props.ingredient}</li>
  );
};

export default RecipeIngredient;