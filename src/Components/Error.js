import { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

class Error extends Component{

  render(){
    return(
      <Alert id="error" variant='danger'>
        Error:  {this.props.error.message}
      </Alert>
    )
  }
}

export default Error;