import React, { Component } from 'react';
import Auth from '../modules/Auth'

class ExperimentSingle extends Component{
  /*
  const experiment = props.experiment;
  const message = props.message;
  const deleteExperiment = props.deleteExperiment;
  const editExperiment = props.editExperiment;
  */

  constructor(props) {
    super(props);
    this.state={
      apiLoaded: false,
      id: null,
      title: null,
      created_at: null,
      updated_at: null,
      description: null,
      trials: null   // data: props.experiment.data,
    }

    this.createTrial = this.createTrial.bind(this);

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
        id: json.experiment.id,
        title: json.experiment.title,
        created_at: json.experiment.created_at,
        updated_at: json.experiment.updated_at,
        description: json.experiment.description,
        trials: json.trials,
        message: json.message,
      })
    }).catch( err => {
      console.log(err);
    })
  }

  createTrial(){
    fetch(`/experiments/${this.state.id}/trials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      body: JSON.stringify({
        trial: {
          notes: '',
        }
      })
    }).then(res => res.json())
    .then(json => {
      console.log(json);
      /*
      this.setState( (prevState) => {
        return {
          trials: prevState.trials.push(json.trial)
        }
      })
      */
      // const trialsArr = this.state.trials.push(json.trial);
      // this.setState({
      //   trials: trialsArr
      // })
      this.getSingleExperiment(this.state.id);
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount(){
    this.getSingleExperiment(this.props.id);
  }

  render(){
    return(
      <div>
        {this.state.apiLoaded ? (
          <div>
          {this.state.message === 'Not your experiment!' ? (
            <p>Not your experiment!</p>
          ) : (
            <div>
              <h3>{this.state.title}</h3>
              <button onClick={() => this.props.deleteExperiment(this.state.id)}>Delete Experiment</button>
              <button onClick={this.props.editExperiment}>Edit Experiment</button>
              <p>{this.state.created_at}</p>
              <p>{this.state.updated_at}</p>
              <p>{this.state.description}</p>
              <div>put a graph of data here</div>
              
              <div className='trial-list'>
                <h4>Trials</h4>
                <button onClick={this.createTrial}>New Trial</button>
                {(this.state.trials !== null) && this.state.trials.map((trial, index) => {
                  return (
                    <div className='trial-short' key={index}>
                      Trial {trial.trial_num} Last Modified: {trial.updated_at}
                    </div>
                  )
                })}
              </div>
    
            </div>
            
          )}
          </div>
        
        ) : (
          <p>Loading. . . </p>
        )}
      </div>
        
    )
  }
  
}

export default ExperimentSingle;