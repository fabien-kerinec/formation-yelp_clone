import React, {Component} from 'react';

// import du css
import './Stars.css';


// creation du composent interne

const List = (props) => (
	<ul className="starlist">
		{
			props.stars.map((star, key) => (
				<li key={key}>{star}</li>
			))
		}
	</ul>
)


export default class Stars extends Component {
  constructor(props) {
    super(props);

    this.state = {
    	listStar : [],
    }
  }

  componentWillMount() {
  	this.setStars();
  }

  setStars(){
  	let starList = [];
  	for(let i=0; i<this.props.stars;i++){
  		starList.push(<i className="fa fa-star active"></i>);
  	}
  	for(let j=0; j<(5 - this.props.stars); j++){
  		starList.push(<i className="fa fa-star"></i>)
  	}
  	this.setState({listStar : starList});
  }

  render() {
    return (
      <div className="Stars">     	
				<List stars={this.state.listStar} />
      </div>
    );
  }
}
