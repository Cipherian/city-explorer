import { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citySearch: "",
      locationObj: {}
    }
  }

  getLocation = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.citySearch}&format=json`;
    console.log("URL: ", url);
    const response = await axios.get(url);
    console.log("Response Display Name: ", response.data[0]);
    this.setState({ locationObj: response.data[0] });
  }

  render() {
    console.log(this.state);
    return (
      <Container className="App">
        <h1>
          City Explorer
        </h1>
        <input 
          onChange={(event) => this.setState({citySearch: event.target.value })} 
          placeholder='search for a city' ></input>
        <button onClick={this.getLocation} >Explore!</button>

        {this.state.locationObj.place_id && 
        <Card id = "city">
          <Card.Title className = "cardTitle">City we searched for: {this.state.locationObj.display_name}</Card.Title>
          <Card.Text className = "cardText">Lat/Lon: {this.state.locationObj.lat},  {this.state.locationObj.lon}</Card.Text>
          <Card.Img id ="mapImg" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_KEY}&center=${this.state.locationObj.lat},${this.state.locationObj.lon}&zoom=12&size=480x480`}/>
        </Card>
        }
      </Container>
    );
  }
}
export default App;
