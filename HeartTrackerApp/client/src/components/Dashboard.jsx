import React, { Component } from 'react';
import Auth from '../modules/Auth';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiLoaded: false,
      experiments: []
    }
    this.getUserExperiments = this.getUserExperiments.bind(this);
  }

  getUserExperiments(){
    fetch('/experiments', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then( res => res.json())
    .then( json => {
      this.setState({
        apiLoaded: true,
        experiments: json.experiments,
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount(){
    this.getUserExperiments();
  }

  render() {
    return(
      <div className='dash_container'>
        <h2>Your Experiments</h2>
        { this.state.apiLoaded ? (
          <p>experiments</p>
        ) : (
          <p>Loading</p>
        ) }
      </div>
    )
  }
}

export default Dashboard;