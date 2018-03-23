import React from 'react';
import RecipeIngredient from './RecipeIngredient';

export default class RecipeItem extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
  return (
    <div className="card">
      <div className="card-header" id={"heading"+ this.props.id}>
        <h5 className="mb-0">
          <button className="btn btn-link" data-toggle="collapse" data-target={"#collapse"+ this.props.id}  aria-expanded="true" aria-controls={"collapse"+ this.props.id} >
          <div>{this.props.recipe.name}</div>
          </button>
        </h5>
      </div>
      <div id={"collapse"+ this.props.id}  className="collapse" aria-labelledby={"heading"+ this.props.id} data-parent="#accordion">
        <div className="card-body">
        {this.props.recipe.ingredients.map((el, i) => {
          let ingredient = el.trim();
          return <RecipeIngredient key={i+el} ingredient={ingredient[0].toUpperCase() + ingredient.slice(1)}/>
        })}
        <div className="d-flex flex-sm-row flex-column w-75">
          <button id={"edit-"+this.props.id} onClick={this.props.abiliyToOpenModal} className="btn btn-success mt-2 edit">Edit Recipe</button>
          <button id={"delete-"+this.props.id} onClick={this.props.abilityToDeleteRecipe} className="btn btn-danger btn-delete mt-2 edit">Delete Recipe</button>
        </div>
        </div>
      </div>
    </div>
    );
  }
}