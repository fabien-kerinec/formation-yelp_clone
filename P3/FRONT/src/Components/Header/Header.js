import React, {Component} from 'react';
import logo from '../../logo.svg';
// import css du composent
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
      	<img src={logo} className="Logo" alt="logo"/>
      	<p>Pour ajouter un établissement et lui ajouter un avis, cliquez sur la map a l'endroit du restaurant</p>
      </div>
    );
  }
}
