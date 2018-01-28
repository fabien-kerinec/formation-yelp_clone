import React, {Component} from 'react';

import './FormResto.css'

export default class FormResto extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	name : 'Nom du restaurant',
    	address : 'adresse du restaurant',
      stars : 'Note de l\'avis',
      commentaire : 'commentaire de l\'avis'
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e){
  	const target = e.target;
  	const value = target.value;
  	const name = target.name;

  	this.setState({
  		[name] : value
  	});
  }

  handleSubmit(){
    this.props.addResto(this.state.name, this.state.address, this.state.commentaire, this.state.stars);
  }

  render() {
    return (
      <div className="FormResto">
        <div className="blur"></div>
        <div className="Popup">
        	<p onClick={this.props.onClose} className="close">x</p>
  				<h3>formulaire d'ajout de restaurant</h3>

  				<form>
            <div className="general">
              <div>
      					
      					<input
      						name="name"
      						type="input"
      						onChange={this.handleInputChange}
      					/>
                <label className="Name">Nom du restaurant</label>
    					</div>
              <div>
                
      					<input
      						name="address"
      						type="input"
      						onChange={this.handleInputChange}
      					/>
                <label className="Address">Adresse du restaurant</label>
              </div>
            </div>
            <h4>Ajouter un Commentaire</h4>
            <div className="avis">
              <div>
                <label className="addStar">
                  note </label>
                  <input
                    name="stars"
                    type="input"
                    onChange={this.handleInputChange}
                  />
                
              </div>
              <label>
                Commentaire 
                <textarea
                  name="commentaire"
                  
                  rows="10"
                  cols="50"
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <p onClick={this.handleSubmit} className="submit">submit</p>
  				</form>
        </div>
      </div>
    );
  }
}
