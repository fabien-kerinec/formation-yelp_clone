import React, {Component} from 'react';
// import du css de l'app
import './Content.css'
import axios from 'axios';


// import de composent secondaire
import Filter from '../Filter/Filter';
import List from '../List/List';
import GoogleMaps from '../GoogleMaps/GoogleMaps';

import FormResto from '../FormResto/FormResto';

const geolocation = (
  navigator.geolocation ? navigator.geolocation : 
  ({
    getCurrentPosition(success, failure){
      failure(`Ton navigateur ne supporte pas la geolocalisation`);
    },
  })
);


// declaration du composent principal qui sera exporté dans le composant parent
export default class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      final_yelp_data : [],
      position_yelp:[],
    	min : 1,
    	max : 5,
      isAddResto : false,
      newResto : {},
      data : [],
      center:null,
      content:null
    }
  	this.setData = this.setData.bind(this);

  	this.onChangeMin = this.onChangeMin.bind(this);
  	this.onChangeMax = this.onChangeMax.bind(this);

    this.openWindow = this.openWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);

    this.addResto = this.addResto.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  //Initialisation des donnée via le backend.
  //l'appel a l'api se fait par le module AXIOS qui permet de faire des call ajax
  //La réponse de l'api est ensuite enregistré dans le state global pour pouvoir exploiter les données
  componentWillMount() {
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `Vous êtes ici`
      });
      axios.post('http://164.132.104.178:3006', 
        {
          "term" : "restaurant",
          "latitude" : `${this.state.center.lat}`,
          "longitude" : `${this.state.center.lng}`,
          "radius" : 15000,
          "limit" : 21
        })
      .then(response => {
        let data = response.data.yelp;
        this.setState({
          data : data
        }, () => this.setYelpData(this.state.min, this.state.max))
      })
    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 48.45, 
          lng: -4.25, 
        },
        content: `Error: The Geolocation service failed ( ${reason} ).`,
      });
      axios.post('http://164.132.104.178:3006', 
        {
          "latitude" : `${this.state.center.lat}`,
          "longitude" : `${this.state.center.lng}`,
          "radius" : 15000,
          "limit" : 21
        })
      .then(response => {
        let data = response.data.yelp;
        this.setState({
          data : data
        }, () => this.setYelpData(this.state.min, this.state.max))
      })

    });
    

  }

  setData(){
    
  }

  //Fonction qui permet de traiter les données dans le format voulu
  //Permet de trier les info qui seront passé aux composents dans un array d'objet global (final_yelp_data)
  setYelpData(min, max){
    let tmpData = [];
    let tmpPos = [];

    for(let i=0; i<this.state.data.length;i++){
      let resto = {};
      let position = {};
      let comments = [];
      let starList = []
      resto.name = this.state.data[i].name;
      let tmpAddress = this.state.data[i].location.address1 + ', ' + this.state.data[i].location.zip_code + ' ' + this.state.data[i].location.city;
      resto.address = tmpAddress;
      resto.position = this.state.data[i].coordinates;
      position.lat = this.state.data[i].coordinates.latitude;
      position.lng = this.state.data[i].coordinates.longitude;
      let note = this.state.data[i].rating
      resto.mark = this.state.data[i].rating;
      resto.stars = Math.trunc(note);
      resto.comments = comments;
      resto.ratings = []
      for(let i=0; i<resto.stars;i++){
        starList.push(<i className="fa fa-star active"></i>);
      }
      for(let j=0; j<(5 - resto.stars); j++){
        starList.push(<i className="fa fa-star"></i>)
      }
      
      resto.listStar = starList;
      if(min <= resto.mark && resto.mark <= max){
        tmpData.push(resto);
        tmpPos.push(position);
      }

      this.setState({position_yelp : tmpPos});
      this.setState({final_yelp_data : tmpData})
    }
  }

  //Permet la mise a jour des donnée en local avec l'ajout d'un nouveau restaurant
  updateData(newResto){
    let tmpData=this.state.final_yelp_data;
    let tmpPos = this.state.position_yelp;

    tmpData.push(newResto);
    tmpPos.push(newResto.position)
    this.setState({
      final_yelp_data : tmpData,
      position_yelp : tmpPos
    })
  }

  //Permet de mettre a jour la liste en fonction de l'option de tri choisis
  onChangeMin(e){
  	console.log(e.target.value);
  	this.setState({min : e.target.value}, () => {
			this.setYelpData(this.state.min, this.state.max);
  	})
  }
  onChangeMax(e){
  	this.setState({max : e.target.value}, () => {
			this.setYelpData(this.state.min, this.state.max);
  	})
  }

  //Permet d'ouvrir/fermer la fenetre modal pour l'ajout d'un restaurant à la liste
  openWindow(posResto){
    let tmpResto = {};
    tmpResto.position = posResto;
    this.setState({isAddResto : true, newResto : tmpResto})
  }
  closeWindow(){
    this.setState({isAddResto : false})
  }

  //Fonction qui permet l'ajout d'un restaurant dans un state temporaire pour ajouter au global.
  addResto(name, address, comment, stars){
    let tmpResto = this.state.newResto;
    tmpResto.name = name;
    tmpResto.address = address;
    tmpResto.comments = [comment];
    tmpResto.mark = stars;
    tmpResto.stars = stars;
    this.setState({isAddResto : false, newResto :tmpResto});
    this.updateData(this.state.newResto)
  }

  //Permet l'ajout de commentaire dans un restaurant précis
  //la clef permet d'identifier celui ci
  addComment(mark, comment, clef){
    let note = 0;
    let comments = [];
    let tmpMark = parseInt(mark, 10);
    let tmpComment = this.state.final_yelp_data;

    let tmpRatings = {
      "comment" : comment,
      "stars" : tmpMark
    }
    tmpComment[clef].ratings.push(tmpRatings)
    for(let i=0; i<tmpComment[clef].ratings.length;i++){
      note += tmpComment[clef].ratings[i].stars;

      comments.push(tmpComment[clef].ratings[i].comment);
    }
    if(tmpComment[clef].ratings.length === 1){
      note += tmpComment[clef].mark
      note = note / (tmpComment[clef].ratings.length + 1 );
    }else{
      note = note / tmpComment[clef].ratings.length;
    }
    tmpComment[clef].comments = comments;
    tmpComment[clef].mark = note;
    note = Math.trunc(note);
    tmpComment[clef].stars = note;
    let starList = []
    for(let i=0; i<tmpComment[clef].stars;i++){
      starList.push(<i className="fa fa-star active"></i>);
    }
    for(let j=0; j<(5 - tmpComment[clef].stars); j++){
      starList.push(<i className="fa fa-star"></i>);
    }
    tmpComment[clef].listStar = starList;
    this.setState({
      final_yelp_data : tmpComment,
    })
  }

  //Rendu du composent global qui va contenir les
  render() {
    return (
    	<div className="Content">
      	<Filter onChangeMax={this.onChangeMax} onChangeMin={this.onChangeMin}/>
      	<List datas={this.state.final_yelp_data} addComment={this.addComment} />
        <GoogleMaps onAddResto={this.openWindow} yelpDatas={this.state.position_yelp} geolocation={this.state.center} content={this.state.content}/>
        {
          this.state.isAddResto ?
          <FormResto onClose={this.closeWindow} addResto={this.addResto}/>
          :null
        }
    	</div>
    );
  }
}
