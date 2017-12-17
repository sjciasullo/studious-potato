import React, { Component } from 'react';
import Auth from '../modules/Auth';
import Dashboard from './Dashboard';
import ExperimentSingle from './ExperimentSingle';

class UserController extends Component {
  constructor(props) {
    // prop list
    //    > page = which userpage we want to render
    super(props);
    this.state = {
      apiLoaded: false,
      experiments: [],
      experimentSingle: null,
      message: null,
    }
    this.getUserExperiments = this.getUserExperiments.bind(this);
  }

  // ----- possible user fetches -----
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

  getSingleExperiment(id) {
    fetch(`/experiments/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then( res => res.json())
    .then( json => {
      this.setState({
        apiLoaded: true,
        experimentSingle: json.experiment,
        message: json.message,
      })
    }).catch( err => {
      console.log(err);
    })
  }

  // ----- end user fetches -----

  decideFetch(){
    switch(this.props.page) {
      case 'dashboard':
        this.getUserExperiments();
        break;
      case 'experimentSingle':
        this.getSingleExperiment(this.props.experimentId);
        break;
      default:
        //this should never happen
    }
  }

  componentDidMount(){
    this.decideFetch();
  }

  // returns jsx of component as selected by page prop which is decided from Router
  decideRender(){
    switch(this.props.page) {
      case 'dashboard':
        return <Dashboard experiments={this.state.experiments} />
      case 'experimentSingle':
        return <ExperimentSingle 
                  experiment={this.state.experimentSingle} 
                  message={this.state.message}
                />
      default:
        return <p>An error has occurred! Please contact the developer, you hacker</p>
    }
  }

  render() {
    return(
      <div className='dash-container'>
        { this.state.apiLoaded ? (
          <div className='component-container'>
            {this.decideRender()}
          </div>
          
        ) : (
          <p>loading</p>
        )}
      </div>
    )
  }
}

export default UserController;