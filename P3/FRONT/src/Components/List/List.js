import React, {Component} from 'react';
// import css du composent list
import './List.css'

import ReactStars from 'react-stars'
// Création du composent interne Item > corresponds a un item dans la liste des restaurant
class Item extends Component{
  constructor(props){
    super(props);
    //Initialisation du state
    this.state = {
      isCommentOn : false,
      mark : 1,
      newComment : null,
      clef : this.props.id,
      valueStars : 0,
      commentFalse:false
    }

    this.onClick = this.onClick.bind(this);
    this.handleNewComment = this.handleNewComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewRating = this.handleNewRating.bind(this);
  }


  //Fonction qui s'execute au clique sur l'affichage des commentaires
  onClick(){
    if(this.state.isCommentOn === false){
      this.setState({isCommentOn : true});
    }else{
      this.setState({isCommentOn : false})
    }
  }

  //Enregistre un local les données qui sont passé dans les inputs de l'ajout de commentaire
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
  handleNewRating(newRating){
    const key = this.props.id
    console.log(newRating);
    this.setState({
      mark : newRating,
      clef: key,
      valueStars: newRating
    })
  }
  //Fait passer les données de l'ajout de commentaire dans le state global via la fonction envoyé en props
  handleSubmit(){
    if(this.state.newComment === null){
      this.setState({
        commentFalse : true
      })
    }else{
      this.props.addComment(this.state.mark, this.state.newComment, this.state.clef)
      this.setState({
        commentFalse : false
      })
    }
    
  }

  //Rendu visiel d'un item
  render(){
    return(
      <div key={this.props.id}>
        <h1>{this.props.datas.name}</h1>
        <h2>{this.props.datas.address}</h2>
        <ReactStars count={5} size={35} value={this.props.datas.stars} color2={"#3eb2aa"} half={false} edit={false}/>
        
        
        <p onClick={this.onClick} className="addComment">Voir les Commentaires</p>
        {
          this.state.isCommentOn ?
            <div className="comments">
              {
                this.props.datas.comments.map((comment, key) => (
                  <p key={key}>{comment}</p>
                ))
              }
              <p className="infoNote">Donnez une note a votre commentaire !</p>
              <ReactStars count={5} size={35} value={this.state.valueStars} color2={"#3eb2aa"} half={false} onChange={this.handleNewRating} className="newCommentStars"/>
              <textarea rows="3" cols="30" name="newComment" onChange={this.handleNewComment} placeholder="Ajoutez votre commentaire" required></textarea>
              <button onClick={this.handleSubmit} className="submitNewComm">valider</button>
              {
                this.state.commentFalse ?
                  <p>Il manque le commentaire !!</p>
                :null
              }
            </div>

          : null
        }
        <div className="separator"></div>
      </div>
    )
  }
}


//Component principal permettant de mapper la liste global en item.
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
