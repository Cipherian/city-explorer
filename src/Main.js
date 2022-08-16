import { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Error from "./Components/Error.js";
import CityMap from "./Components/CityMap.js";
import Weather from "./Components/Weather";
import Movies from "./Components/Movies";
import WeatherDay from "./Components/WeatherDay"

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citySearch: "",
      locationObj: {},
      error: null,
      weather: [],
      movies: [],
      map: null,
      lat: 0,
      lon: 0,
    };
  }

  getLocation = async () => {
    try {
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.citySearch}&format=json`;
      const response = await axios.get(url);
      let data = response.data[0];
      this.setState({
        locationObj: data,
        error: null,
        lat: data.lat,
        lon: data.lon,
      });
      this.getWeather(data.lat, data.lon);
      this.getMovies();
    } catch (error) {
      if (error.response) {
        let message = `${error.response.data.error}. ${error.message} ${error.code}.`;
        this.setState({
          error: { status: error.response, message: message },
          locationObj: {},
        });
      }
    }
  };

  getWeather = async (lat, lon) => {
    let url = `${process.env.REACT_APP_HEROKU}/weather?lat=${lat}1&lon=${lon}}`;
    try {
      let response = await axios.get(url);
      this.setState({
        weather: response.data,
      });
      console.log(response.data);
    } catch (error) {
      this.setState({ error: error });
    }
  };

  getMovies = async () => {
    const url = `${process.env.REACT_APP_HEROKU}/movies?searchQuery=${this.state.citySearch}`;
    const response = await axios.get(url);
    console.log(response);
    this.setState({ movies: response.data });
  };

  handleChange = (event) => {
    this.setState({ citySearch: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.getLocation(event.target.value);
  };

  render() {
    return (
      <Container>
        <Form id="city-form">
          <Form.Label>Search For A City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            id="formInput"
            onChange={this.handleChange}
          />
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Explore!
          </Button>
        </Form>
        {this.state.locationObj.place_id && (
          <CityMap
            name={this.state.locationObj.display_name}
            lat={this.state.locationObj.lat}
            lon={this.state.locationObj.lon}
          />
        )}
        {this.state.locationObj.place_id && (
            <Weather weather={this.state.weather} />
        )}
        {this.state.locationObj.place_id && (
          <Movies movies={this.state.movies} />
        )}
        {this.state.error && <Error error={this.state.error} />}
      </Container>
    );
  }
}

export default Main;
