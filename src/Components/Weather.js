import { Component } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

class Weather extends Component {
  render() {
    return (
      <Card className="weather">
        <Card.Title>Three Day Forecast</Card.Title>
        {this.props.weather.map((day, idx) => (
            <Card.Text key={idx}> 
              description {day.description}
              date: {day.date}
              </Card.Text>
            ))}
            </Card>
    );
  }
}

export default Weather;
