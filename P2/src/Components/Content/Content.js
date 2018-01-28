import React, {Component} from 'react';
// import du css de l'app
import './Content.css'
// import de data l'app
import Data from '../../Data.json';

// import de composent secondaire
import Filter from '../Filter/Filter';
import List from '../List/List';
import GoogleMaps from '../GoogleMaps/GoogleMaps';

import FormResto from '../FormResto/FormResto';
// declaration du composent principal qui sera exporté dans le composant parent
export default class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	final_data : Data.restaurants,
      all_data : Data.restaurants,
      position: [],
    	min : 1,
    	max : 5,
      isAddResto : false,
      newResto : {},
    }
  	
  	this.onChangeMin = this.onChangeMin.bind(this);
  	this.onChangeMax = this.onChangeMax.bind(this);

    this.openWindow = this.openWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);

    this.addResto = this.addResto.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  componentWillMount() {
  	this.setData(this.state.min, this.state.max);
  }

  setData(min, max){
  	console.log(min)
  	console.log(max)
  	let tmpData = [];
    let tmpPos = [];
  	for(let i=0; i<this.state.all_data.length;i++){
  		let resto = {};
      let position = {};
  		let mark = 0;
      let comments = [];
  		resto.name = this.state.all_data[i].Name;
  		resto.address = this.state.all_data[i].address;
  		resto.position = this.state.all_data[i].position;
      position = this.state.all_data[i].position;
      resto.ratings = this.state.all_data[i].ratings;
  		for(let j=0; j<this.state.all_data[i].ratings.length;j++){
  			mark += this.state.all_data[i].ratings[j].stars;
        comments.push(this.state.all_data[i].ratings[j].comment);
  		}
  		mark = mark / this.state.all_data[i].ratings.length;
  		resto.mark = mark;
  		mark = Math.trunc(mark);
  		resto.stars = mark
      resto.comments = comments
  		if(min <= resto.mark && resto.mark <= max){
  			tmpData.push(resto);
        tmpPos.push(position);
  		}
  	}
    this.setState({position : tmpPos});
  	this.setState({final_data : tmpData}, () => {console.log(this.state.final_data);})
  }

  updateData(newResto){
    let tmpData=this.state.final_data;
    let tmpPos = this.state.position;

    tmpData.push(newResto);
    tmpPos.push(newResto.position)
    this.setState({
      final_data : tmpData,
      position : tmpPos
    })
  }

  onChangeMin(e){
  	console.log(e.target.value);
  	this.setState({min : e.target.value}, () => {
  		console.log(`min ${this.state.min}`);
			this.setData(this.state.min, this.state.max);
  	})
  	
  }
  onChangeMax(e){
  	this.setState({max : e.target.value}, () => {
  		console.log(`max ${this.state.max}`);
			this.setData(this.state.min, this.state.max);
  	})
  }

  openWindow(posResto){
    let tmpResto = {};
    tmpResto.position = posResto;
    this.setState({isAddResto : true, newResto : tmpResto})
    
  }

  closeWindow(){
    console.log('isaddfalse')
    this.setState({isAddResto : false})
  }

  addResto(name, address, comment, stars){
    let tmpResto = this.state.newResto;
    tmpResto.name = name;
    tmpResto.address = address;
    tmpResto.comments = [comment];
    tmpResto.mark = stars;
    tmpResto.stars = stars;
    this.setState({isAddResto : false, newResto :tmpResto});
    console.log(name);
    console.log(address);
    this.updateData(this.state.newResto)
  }

  addComment(mark, comment, clef){
    console.log(mark);
    console.log(comment);
    console.log(clef);
    let note = 0
    let comments = [];
    let tmpComment = this.state.final_data;
    let tmpRatings = {
      "comment" : comment,
      "stars" : parseInt(mark, 1000000)
    }
    console.log(tmpComment)
    console.log(tmpRatings)
    tmpComment[clef].ratings.push(tmpRatings)
    console.log(tmpComment[clef].ratings)
    for(let i=0; i<tmpComment[clef].ratings.length;i++){
      note += tmpComment[clef].ratings[i].stars;
      comments.push(tmpComment[clef].ratings[i].comment);
      console.log(note)
    }
    console.log('sortie de for')
    console.log(note)
    note = note / tmpComment[clef].ratings.length;
    console.log('moyenne')
    console.log(note)
    tmpComment[clef].comments = comments
    tmpComment[clef].mark = note;
    console.log(tmpComment[clef].mark)
    note = Math.trunc(note);
    console.log("trunc")
    console.log(note)
    tmpComment[clef].stars = note;

    this.setState({
      final_data : tmpComment
    })
  }

  render() {
    return (
    	<div className="Content">
      	<Filter onChangeMax={this.onChangeMax} onChangeMin={this.onChangeMin}/>
      	<List datas={this.state.final_data} addComment={this.addComment}/>
        <GoogleMaps datas={this.state.position} onAddResto={this.openWindow}/>
        {
          this.state.isAddResto ?
          <FormResto onClose={this.closeWindow} addResto={this.addResto}/>
          :null
        }
    	</div>
    );
  }
}
