import {Component} from 'react';
import Card from 'react-bootstrap/Card';

const apiKey = process.env.REACT_APP_LOCATION_KEY;

class CityMap extends Component {
  render() {
    return (
      <Card id = "map">
        <Card.Title>City: {this.props.name}</Card.Title>
        <Card.Text>Latitude: {this.props.lat}</Card.Text>
        <Card.Text>Longitude: {this.props.lon}</Card.Text>
        <Card.Img id ="mapImg" src={`https://maps.locationiq.com/v3/staticmap?key=${apiKey}&center=${this.props.lat},${this.props.lon}&zoom=12&size=480x480`}/>
      </Card>
    )
  }
}

export default CityMap