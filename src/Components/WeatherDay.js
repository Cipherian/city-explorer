import React from "react";
import Card from "react-bootstrap/Card";

class WeatherDay extends React.Component {
  render() {
    return (
      <Card className="weather"key={this.key}>
        <Card.Title>Three Day Forecast</Card.Title>
            <Card.Text > 
              description {this.props.description}
              date: {this.props.date}
              </Card.Text>
            </Card>
    );
  }
}

export default WeatherDay;