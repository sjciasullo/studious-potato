import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Auth from '../modules/Auth';
import Dashboard from './Dashboard';
import ExperimentSingle from './ExperimentSingle';
import ExperimentForm from './ExperimentForm';

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

      //redirecter
      fireRedirect: false,
      redirectRoute: '',

      // for forms
      experimentTitle: '',
      experimentDescription: '',
      //experimentFlag: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitExperiment = this.submitExperiment.bind(this);
    this.deleteExperiment = this.deleteExperiment.bind(this);
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

  deleteExperiment(id) {
    fetch(`/experiment/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then( res => res.json())
    .then( json => {
      this.setState({
        fireRedirect: true,
        redirectPath: '/dashboard',
      })
    })
  }

  // ----- end user fetches -----

  // ----- functions for forms -----

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value
    })
  }

  submitExperiment(e) {
    e.preventDefault();
    fetch('/experiments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      body: JSON.stringify({
        experiment: {
          title: this.state.experimentTitle,
          description: this.state.experimentDescription,
        }
      })
    }).then( res => res.json())
    .then( json => {
      this.setState({
        fireRedirect: true,
        redirectRoute: `/experiment/${json.experiment.id}`
      })
    }).catch( err => {
      console.log(err);
    })
  }

  // ----- end form functions -----

  // 
  decideFetch(){
    switch(this.props.page) {
      case 'dashboard':
        this.getUserExperiments();
        break;
      case 'experimentSingle':
        this.getSingleExperiment(this.props.experimentId);
        break;
      default:
        //set loaded to true because no data needed
        this.setState({
          apiLoaded: true,
        })
    }
  }

  componentDidMount(){
    //reset 
    this.setState({
      fireRedirect: false,
      redirectPath: ''
    })
    this.decideFetch();
  }

  // returns jsx of component as selected by page prop which is decided from Router
  decideRender(){
    switch(this.props.page) {
      case 'dashboard':
        return <Dashboard 
                  experiments={this.state.experiments} 
                  deleteExperiment={this.deleteExperiment}
                />
      case 'experimentSingle':
        return <ExperimentSingle 
                  experiment={this.state.experimentSingle} 
                  message={this.state.message}
                  deleteExperiment={this.deleteExperiment}
                />
      case 'experimentCreate':
        return <ExperimentForm 
                  experimentTitle={this.state.experimentTitle}
                  experimentDescription={this.state.experimentDescription}
                  handleChange={this.handleChange}
                  submitExperiment={this.submitExperiment}
                />
      default:
        return <p>An error has occurred! Please contact the developer, you hacker</p>
    }
  }

  render() {
    return(
      <div className='dash-container'>
        {this.state.fireRedirect && <Redirect to={this.state.redirectRoute} />}
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