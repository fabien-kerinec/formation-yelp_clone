import React, {Component} from 'react';
import raf from 'raf';
import canUseDOM from 'can-use-dom';
// import component react-google-maps
import{withGoogleMap, GoogleMap, Circle, InfoWindow, Marker} from 'react-google-maps';
// import Css composent google maps
import './GoogleMaps.css';


// definit la gélocalisation
const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation : 
  ({
    getCurrentPosition(success, failure){
      failure(`Ton navigateur ne supporte pas la geolocalisation`);
    },
  })
);

// Composant qui affiche la map
const SimpleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={16}
    center={props.center}
    onClick={props.onMapClick}
  >
    {props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
    {props.center && (
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.20,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    )}
    {
      props.markers.map((marker, key) => {
        return(
          <Marker
            key={key}
            position={marker}
          />

        )
      })
    }
    {
      props.tests.map((test, key) => (
        <Marker
          key={key}
          position={test.position}
        />
      ))
    }
  </GoogleMap>
));


export default class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: null,
      content: null,
      radius: 700,
      tests:[],
    };
    
    this.isUnmounted = false;
    this.handleClickEvent = this.handleClickEvent.bind(this)
  }

  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({ radius: Math.max(this.state.radius - 20, 0) });

      if (this.state.radius > 20) {
        raf(tick);
      }
    };
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `Vous êtes ici`,
      });

      raf(tick);
    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 48.450821, 
          lng: -4.248437, 
        },
        content: `Error: The Geolocation service failed ( ${reason} ).`,
      });

      raf(tick);
    });
  }



  componentWillUnmount() {
    this.isUnmounted = true;
  }


  handleClickEvent(event){
    const test = event.latLng;
    this.props.onAddResto(test);
  }

  render() {
    return (
        <SimpleMap
          containerElement={
            <div style={{ height: `100%`, width:`100%` }} />
          }
          mapElement={
            <div style={{ height: `100%`, width:`100%` }} />
          }
          onMapClick={this.handleClickEvent}
          markers={this.props.datas}
          center={this.state.center}
          content={this.state.content}
          radius={this.state.radius}
          tests={this.state.tests}
        />
    );
  }
}
