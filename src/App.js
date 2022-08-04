import { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Error from "./Error.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citySearch: "",
      locationObj: {},
      error: null,
      errorInfo: null,
    };
  }

  getLocation = async () => {
    try {
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.citySearch}&format=json`;
      const response = await axios.get(url);
      this.setState({ locationObj: response.data[0] });
    } catch (error) {
      if (error.response) {
        let message = `${error.response.data.error}. ${error.message} ${error.code}.`;
        this.setState({ error: { status: error.response, message: message } });
      }
    }
  };

  render() {
    console.log(this.state.error);
    return (
      <Container className="App">
        <h1>City Explorer</h1>
        <Form>
          <Form.Control
            id="formInput"
            onChange={(event) =>
              this.setState({ citySearch: event.target.value })
            }
            placeholder="search for a city"
          ></Form.Control>
          <Button onClick={this.getLocation}>Explore!</Button>
        </Form>

        {this.state.locationObj.place_id && (
          <Card id="city">
            <Card.Title className="cardTitle">
              City we searched for: {this.state.locationObj.display_name}
            </Card.Title>
            <Card.Text className="cardText">
              Lat/Lon: {this.state.locationObj.lat},{" "}
              {this.state.locationObj.lon}
            </Card.Text>
            <Card.Img
              id="mapImg"
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.locationObj.lat},${this.state.locationObj.lon}&zoom=12&size=480x480`}
            />
          </Card>
        )}
        {this.state.error && <Error id="errorMessage" {...this.state}></Error>}
      </Container>
    );
  }
}
export default App;
