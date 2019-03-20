import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, In } from 'google-maps-react';
import { isAbsolute } from 'path';
import store from '../../redux/store'
import {connect} from 'react-redux';

import ViewPinModal from './ViewPinModal';
import CardModal from './CardModal';
// import { func } from 'prop-types';

const mapStylesDefaults = {
  position: isAbsolute,  
  width: '100%',
  height: '100%',
};
export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewCardIsOpen: false,
      user: {},
      pins: [],
      }
      this.toggleCardModal = this.toggleCardModal.bind(this)
    };
  

  toggleCardModal = () => {
    console.log("open/closed")
    this.setState({
      viewCardIsOpen: !this.state.viewCardIsOpen,
    });
  }

  componentDidUpdate(prevProps) { 
    if (this.props.pins !== prevProps.pins) {
      this.props.pins.then((val) => { this.setState({ pins: val.pins }) })
    }
  }

  onClick(e){
    // console.log("this is ", e.name.stringValue, e)
    let tarObj = {name: e.name.stringValue, location: e.location}
    // this.fireDisplayViewPin(e)
    this.setState({showingInfoWindow:true})
    // this.CardModal

  }



 render() {
  if (!this.props.loaded) {
    return (<div>Loading...</div>)
  }
    return (
      <div className='map-container'>

<Map 
    google={this.props.google}
    style={mapStylesDefaults}
    className={'map'}
    zoom={14}  
    centerAroundCurrentLocation={true}
    draggable={true} 
    minZoom={13} 
    maxZoom={25}
>

{this.state.pins.map((pin) => {
 return (
 <Marker
    key={pin._ref._path.segments[1]}
    name={pin._fieldsProto.description}
    position={{ lat:pin._fieldsProto.location.mapValue.fields.lat.doubleValue,
                lng:pin._fieldsProto.location.mapValue.fields.lng.doubleValue }}
    onClick={this.toggleCardModal}
    />
 )})}

</Map>

 <div className="view-pin-container">
   <ViewPinModal  
    show={this.state.viewPinModalIsOpen} 
    onClose={this.state.viewPinModalIsOpen} 
    /></div>

<div className="view-pin-container">
  <CardModal show={this.state.viewCardIsOpen}/>
</div>
  
</div>


    );
  }

}

function mapStateToProps(reduxState){
  return {
    user: reduxState.user,
    pins: reduxState.pins
  }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey : 'AIzaSyDGqxNDh10YIbriH1cJpPt9cn8TJdCwbFM'
})(MapContainer));

