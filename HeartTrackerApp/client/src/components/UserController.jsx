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
      message: null,

      //redirecter
      fireRedirect: false,
      redirectRoute: '',

      // for forms
      experimentTitle: '',
      experimentDescription: '',
      experimentId: null,
      edit: false,
      //experimentFlag: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitExperiment = this.submitExperiment.bind(this);
    this.deleteExperiment = this.deleteExperiment.bind(this);
    this.submitEditExperiment = this.submitEditExperiment.bind(this);
    this.editExperiment = this.editExperiment.bind(this);
    this.cancelEditExperiment = this.cancelEditExperiment.bind(this);
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

  deleteExperiment(id) {
    fetch(`/experiments/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then( res => res.json())
    .then( json => {
      this.setState({
        fireRedirect: true,
        redirectPath: '/dashboard',
      });
    }).catch( err => {
      console.log(err);
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

  //switch to edit page from show
  editExperiment(title, description, id){
    this.setState({
      experimentTitle: title,
      experimentDescription: description,
      experimentId: id,
      edit: true
    })
  }

  cancelEditExperiment(){
    this.setState({
      experimentTitle: '',
      experimentDescription: '',
      edit: false,
    })
  }

  //could modularize submitExperiment to submit an edit
  submitEditExperiment(e) {
    e.preventDefault();
    fetch(`/experiments/${this.state.experimentId}`, {
      method: 'PUT',
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
        redirectRoute: `/dashboard`,
        edit: false,        
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
      
      //redundant but keeping for brevity, history of experimentSingle, functionality
      case 'experimentSingle':
        this.setState({
          apiLoaded: true,
        })
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
        if(this.state.edit) {
          return <ExperimentForm
                    experimentTitle={this.state.experimentTitle}
                    experimentDescription={this.state.experimentDescription}
                    handleChange={this.handleChange}
                    submitExperiment={this.submitEditExperiment}
                    edit={true}
                    cancelEditExperiment={this.cancelEditExperiment}
                  />
        } else {
          return <ExperimentSingle 
                    id={this.props.experimentId}
                    deleteExperiment={this.deleteExperiment}
                    editExperiment={this.editExperiment}
                  />
        }
      case 'experimentCreate':
        return <ExperimentForm 
                  experimentTitle={this.state.experimentTitle}
                  experimentDescription={this.state.experimentDescription}
                  handleChange={this.handleChange}
                  submitExperiment={this.submitExperiment}
                  edit={false}
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
          <p>Loading. . .</p>
        )}
      </div>
    )
  }
}

export default UserController;