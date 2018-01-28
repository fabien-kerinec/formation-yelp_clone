import React, {Component} from 'react';

// import css du composent filtre
import './Filter.css';


// creation du composent interne
const DropdownMin = (props) => (
	<select defaultValue="1" onChange={props.onChange}>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
	</select>
);

const DropdownMax = (props) => (
	<select defaultValue="5" onChange={props.onChange}>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
	</select>
)

export default class Filter extends Component {
  render() {
    return (
      <div className="Filter">
      	<p>Filtrer les resultats entre : </p>
      	<DropdownMin onChange={this.props.onChangeMin}/>
      	<p>et </p>
				<DropdownMax onChange={this.props.onChangeMax}/>
				<p>étoiles</p>
      </div>
    );
  }
}
