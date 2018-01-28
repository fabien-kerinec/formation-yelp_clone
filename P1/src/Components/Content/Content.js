import React, {Component} from 'react';
// import du css de l'app
import './Content.css'
// import de data l'app
import Data from '../../Data.json';

// import de composent secondaire
import Filter from '../Filter/Filter';
import List from '../List/List';
import GoogleMaps from '../GoogleMaps/GoogleMaps';

// declaration du composent principal qui sera exporté dans le composant parent
export default class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	final_data : [],
      position: [],
    	min : 1,
    	max : 5,
    }
  	
  	this.onChangeMin = this.onChangeMin.bind(this);
  	this.onChangeMax = this.onChangeMax.bind(this);
  }

  componentWillMount() {
  	this.setData(this.state.min, this.state.max);
  }

  setData(min, max){
  	console.log(min)
  	console.log(max)
  	let tmpData = [];
    let tmpPos = [];
  	for(let i=0; i<Data.restaurants.length;i++){
  		let resto = {};
      let position = {};
  		let mark = 0;
      let comments = [];
  		resto.name = Data.restaurants[i].Name;
  		resto.address = Data.restaurants[i].address;
  		resto.position = Data.restaurants[i].position;
      position = Data.restaurants[i].position;
  		for(let j=0; j<Data.restaurants[i].ratings.length;j++){
  			mark += Data.restaurants[i].ratings[j].stars;
        comments.push(Data.restaurants[i].ratings[j].comment);
  		}
  		mark = mark / Data.restaurants[i].ratings.length;
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

  render() {
    return (
    	<div className="Content">
      	<Filter onChangeMax={this.onChangeMax} onChangeMin={this.onChangeMin}/>
      	<List datas={this.state.final_data} />
        <GoogleMaps datas={this.state.position}/>
    	</div>
    );
  }
}
