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

export default class AddRecipeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  
    return (
      <div>
        <Modal
        isOpen={this.props.modalIsOpen}
        style={customStyles}
        contentLabel="Recipe Modal"
        >
          <h2 className="text-primary">{this.props.create ? "Add Recipe" : "Edit Recipe"}</h2>
          {this.props.error && <div className="alert alert-danger">
          <strong>{this.props.error}</strong>
          </div>}
          <form onSubmit={this.props.onSubmit}>
            <div className="form-group">
              <label>Recipe Name</label>
              <input type="text" defaultValue={this.props.modalData[0]} name="recipe" className="form-control" 
              autoFocus 
              placeholder="Recipe Name" 
              />
            </div>
            <label>Ingredients List</label>
            <div className="form-group">
              <input type="text" defaultValue={this.props.modalData[1]}  name="ingredients" className="form-control" 
              autoFocus 
              placeholder="Please enter your ingredients, separated by a comma" 
              />
            </div>
            <button  type="submit" className="btn btn-primary mt-2 mr-2">{this.props.create ? "Add Recipe" : "Edit Recipe"}</button>
            <button onClick={this.props.closeModal} className="btn btn-warning mt-2 text-light">Close</button>
          </form>
        </Modal>
      </div>   
    ) 
  }
}