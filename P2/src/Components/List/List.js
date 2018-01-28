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
      mark : 1,
      newComment : "nouveau commentaire",
      clef : this.props.id,
    }

    this.onClick = this.onClick.bind(this);
    this.handleNewComment = this.handleNewComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onClick(){
    if(this.state.isCommentOn === false){
      this.setState({isCommentOn : true});
    }else{
      this.setState({isCommentOn : false})
    }
  }

  handleNewComment(e){
    const key = this.props.id
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name] : value,
      clef : key
    });
  }

  handleSubmit(){
    this.props.addComment(this.state.mark, this.state.newComment, this.state.clef)
  }

  render(){
    return(
      <div key={this.props.id}>
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
              <select name="mark" defaultValue="1" onChange={this.handleNewComment}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <textarea rows="3" cols="30" name="newComment" onChange={this.handleNewComment}></textarea>
              <button onClick={this.handleSubmit}>valider</button>
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
            <Item datas={data} key={key} id={key} addComment={this.props.addComment}/>
      		))
      	}
      </div>
    );
  }
}
