import { Component } from "react";
import Card from "react-bootstrap/Card";


class WeatherDay extends Component {
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

export default WeatherDay;