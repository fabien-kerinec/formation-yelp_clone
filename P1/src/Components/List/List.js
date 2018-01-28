import React, {Component} from 'react';
// import css du composent list
import './List.css'

// import du composent stars
import Stars from '../Stars/Stars'

class Item extends Component{
  constructor(props){
    super(props);

    this.state = {
      isCommentOn : false,
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    if(this.state.isCommentOn === false){
      this.setState({isCommentOn : true});
    }else{
      this.setState({isCommentOn : false})
    }
  }

  render(){
    return(
      <div key={this.props.key}>
        <h1>{this.props.datas.name}</h1>
        <h2>{this.props.datas.address}</h2>
        <p>{this.props.datas.mark}</p>
        <Stars stars={this.props.datas.stars}/>
        <p onClick={this.onClick}>Voir les Commentaires</p>
        {
          this.state.isCommentOn ?
            <div className="comments">
              {
                this.props.datas.comments.map((comment, key) => (
                  <p key={key}>{comment}</p>
                ))
              }
            </div>
          : null
        }
      </div>
    )
  }
}

export default class List extends Component {
  render() {
    return (
      <div className="List">
      	{
      		this.props.datas.map((data, key) => (
            <Item datas={data} key={key} />
      		))
      	}
      </div>
    );
  }
}
