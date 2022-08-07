import { Component } from "react";
import Card from "react-bootstrap/Card";

class Weather extends Component {
  render() {
    return (
      <Card className = "weather">
        <Card.Title>day: {this.props.weather.day}</Card.Title>
        <Card.Text> description {this.props.weather.description}</Card.Text>
        <Card.Text>latitude: {this.props.weather.lat}</Card.Text>
        <Card.Text>longitude: {this.props.weather.lon}</Card.Text>
      </Card>
    )
  }
}

export default Weather;
