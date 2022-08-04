import { Component } from "react";
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citySearch: "",
      locationObj: {}
    }
  }

  getLocation = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.theCityWeSearchedFor}&format=json`;
    console.log("URL: ", url);
    const response = await axios.get(url);
    console.log("Response Display Name: ", response.data[0]);
    this.setState({ locationObj: response.data[0] });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <input 
          onChange={(event) => this.setState({citySearch: event.target.value })} 
          placeholder='search for a city' ></input>
        <button onClick={this.getLocation} >Explore!</button>

        {this.state.locationObj.place_id && 
        <>
          <h2>City we searched for: {this.state.locationObj.display_name}</h2>
          <p>Lat/Lon: {this.state.locationObj.lat},  {this.state.locationObj.lon}</p>
        </>
        }
      </div>
    );
  }
}
export default App;
