import { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Header from "./Components/Header";
import Main from "./Main";
import Footer from "./Components/Footer";

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Header />
        <Main />
        <Footer />
      </Container>
    );
  }
}
export default App;
