import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app')

export default class EditRecipeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  
    return (
      <div>
        <Modal
        isOpen={this.props.modalIsOpen}
        style={customStyles}
        contentLabel="Edit Modal"
        >
          <h2 className="text-primary">Edit Recipe</h2>
          <form onSubmit={this.props.onSubmit}>
            <div className="form-group">
              <label>Recipe Name</label>
              <input type="text" value={this.state} name="recipe" className="form-control" 
              autoFocus 
              placeholder="Recipe Name" 
              />
            </div>
            <label>Ingredients List</label>
            <div className="form-group">
              <input type="text" name="ingredients" className="form-control" 
              autoFocus 
              placeholder="Please enter your ingredients, separated by a comma" 
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2 mr-2">Add Recipe</button>
            <button onClick={this.props.closeModal} className="btn btn-warning mt-2 text-light">Close</button>
          </form>
        </Modal>
      </div>   
    ) 
  }
}