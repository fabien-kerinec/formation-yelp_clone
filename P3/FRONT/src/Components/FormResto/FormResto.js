import React, {Component} from 'react';

import './FormResto.css'
import ReactStars from 'react-stars'
export default class FormResto extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	name : 'Nom du restaurant',
    	address : 'adresse du restaurant',
      stars : 'Note de l\'avis',
      commentaire : 'commentaire de l\'avis',
      valueStars : 0
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewRating = this.handleNewRating.bind(this)
  }

  //Permet d'enregistrer dans un state local les modification fait dans les input
  handleInputChange(e){
  	const target = e.target;
  	const value = target.value;
  	const name = target.name;

  	this.setState({
  		[name] : value
  	});
  }

  handleNewRating(newRating){
    console.log(newRating);
    this.setState({
      stars : newRating,
      valueStars: newRating
    })
  }

  //Permet de passer au composent parent les données qui sont enregistré dans le state local
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
                  required
      					/>
                <label className="Name">Nom du restaurant</label>
    					</div>
              <div>
                
      					<input
      						name="address"
      						type="input"
      						onChange={this.handleInputChange}
                  required
      					/>
                <label className="Address">Adresse du restaurant</label>
              </div>
            </div>
            <h4>Ajouter un Commentaire</h4>
            <div className="avis">
              <p>Donnez une note à votre nouveau restaurant</p>
              <ReactStars count={5} size={35} value={this.state.valueStars} color2={"#3eb2aa"} half={false} onChange={this.handleNewRating} className="newCommentStars"/>
              
              <label>
                 
                <textarea
                  name="commentaire"
                  placeholder="commentaire"
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
