import React from 'react';
import ReactDOM from 'react-dom';
import RecipeItem from './RecipeItem';
import AddRecipeModal from './AddRecipeModal';

export default class RecipeBox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = JSON.parse(localStorage.getItem( 'recipes' )) || {
      recipes: [{name: "Lasagna", ingredients: ["Pasta sheets", "Onions", "Bechamel", "Cheese", "Garlic", "Tomato Sauce"]}, {name: "Vegetarian Pizza", ingredients: ["Cheese", "Onions", "Tomato sauce"]}, {name: "Scrambled Eggs", ingredients: ["Eggs", "Cheese", "Butter"]}],
      modalIsOpen: false,
      createRecipeMode: true,
      modalData: [],
      modalIndex: -1
    };
  }

  openModal = (e) => {
    let id = e.target.id;
    let index = id.split('-')[1];

    if(id.includes('add')){
      this.setState(
        {
          modalIsOpen: true, 
          createRecipeMode: true, 
          modalData: [],
          modalIndex: -1,
          error: ''
        });      
    } else {
      this.setState((prevState) => {
        console.log(id.split('-')[1])
        return {
          modalIsOpen: true, 
          createRecipeMode: false, 
          modalData: [prevState.recipes[index].name, prevState.recipes[index].ingredients.join(", ")],
          modalIndex: index
        }
      });
    }
   }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  saveToLocalStorage = (state) => { 
    localStorage.setItem('recipes', JSON.stringify(state));
  }

  deleteRecipe = (e) => {
    let id = e.target.id;
    let index = id.split('-')[1];

    if(id.includes('delete')){
      this.setState((prevState) => {
        return {
          recipes: prevState.recipes.filter((el, i) => {
            if(i == index){
              return false;
            } 
            return true;
          }),
          modalIsOpen: false
        }
      }, () => {
        this.saveToLocalStorage(this.state);
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    if(!e.target.elements.recipe.value|| e.target.elements.ingredients.value.split(',').indexOf("") > -1) { 
      this.setState({error: "Please provide recipe name and ingredients (separated by a comma)"});
      return;
    }

    const newRecipe = {
      name: e.target.elements.recipe.value.trim(),
      ingredients: e.target.elements.ingredients.value.split(",")
    }

    let updatedState;

    if(e.target.innerHTML.includes('Add Recipe')) {
      updatedState = {
        recipes: [...this.state.recipes, newRecipe],
        modalIsOpen: false,
        error: ''
      }  
    } else {
      updatedState = {
          recipes: this.state.recipes.map((el, i) => {
            if(i == this.state.modalIndex){
              return newRecipe;
            } 
            return el;
          }),
          modalIsOpen: false,
          error: ''
        }
      }
    
    this.setState(updatedState, () => {
      this.saveToLocalStorage(this.state);
    });
  }

  render() {   
    console.log(JSON.parse(localStorage.getItem( 'recipes' )));
    return (   
      <div className="container-fluid mt-5 d-flex flex-column align-items-center justify-content-center">
        <div id="accordion" className="w-75">
        <div className="alert alert-info">
          <strong>Currently, you have {this.state.recipes.length} recipes in the recipe box.</strong>
        </div>
          {this.state.recipes.map((el, i) => {
          return <RecipeItem abilityToDeleteRecipe={this.deleteRecipe} abiliyToOpenModal={this.openModal} key={el+i} recipe={el} id={i} />   
        })}
        </div>
        <AddRecipeModal onSubmit={this.onSubmit} error={this.state.error} create={this.state.createRecipeMode} modalData={this.state.modalData} closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}/>
        <div className="w-75">
          <button  id="add" onClick={this.openModal} className="btn btn-primary mt-2 mr-auto">Add Recipe</button>
        </div>
      </div>
    );
  }
}

