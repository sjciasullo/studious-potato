import React, { Component } from 'react';
import Auth from '../modules/Auth'

class ExperimentSingle extends Component{
  /* prop list
  const deleteExperiment = props.deleteExperiment;
  const editExperiment = props.editExperiment;
  */

  constructor(props) {
    super(props);
    this.state={
      apiLoaded: false,
      message: null,
      id: null,
      title: null,
      created_at: null,
      updated_at: null,
      description: null,
      current_trial: null,
      trials: null, 
      trialView: false,
      selectedTrial: null,
      trialNotes: '',
    }

    this.createTrial = this.createTrial.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitTrialNotes = this.submitTrialNotes.bind(this);

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
        current_trial: json.experiment.current_trial,
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
      this.getSingleExperiment(this.state.id);
      return json
    }).catch(err => {
      console.log(err);
    })
  }

  trialView(id) {
    const notes = this.state.trials[id].notes
    this.setState({
      trialView: true,
      selectedTrial: id,
      trialNotes: notes
    })
  }

  handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    this.setState({
      [key]: value
    })
  }

  submitTrialNotes(e) {
    e.preventDefault();
    console.log(this.state.trialNotes);
    const trial_id = this.state.trials[this.state.selectedTrial].id
    fetch(`/experiments/${this.state.id}/trials/${trial_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      body: JSON.stringify({
        trial: {
          notes: this.state.trialNotes,
        }
      })
    }).then( res => res.json())
    .then( json => {
      
    }).catch(err => {
        console.log(err);
    })
  }

  getTrials(){
    
  }

  componentDidMount(){
    this.getSingleExperiment(this.props.id);
  }

  render(){
    return(
      <div>
        {this.state.apiLoaded ? (
          <div>
            
          {this.state.message !== 'Not your experiment!' && (
            <div>
              <a href={`/experiment/${this.state.id}`}><h3>{this.state.title}</h3></a>
              {!this.state.trialView && (
                <div className='experiment-info-container'>
                  <button onClick={() => this.props.deleteExperiment(this.state.id)}>Delete Experiment</button>
                  <button 
                    onClick={() => this.props.editExperiment(this.state.title, this.state.description, this.state.id)}>
                    Edit Experiment
                  </button>
                  <p>{this.state.created_at}</p>
                  <p>{this.state.updated_at}</p>
                  <p>{this.state.description}</p>
                  <p>current trial: {this.state.current_trial}</p>
                  <div>put a graph of data here</div>
                </div>
              )}
              
              
              <div className='trial-list'>
                {!this.state.trialView && <h4>Trials</h4>}
                <button onClick={this.createTrial}>New Trial</button>
                {(this.state.trials !== null) && this.state.trials.map((trial, index) => {
                  return (
                    <div className='trial-short' key={index}>
                      <span onClick={()=>this.trialView(index)}>Trial {trial.trial_num}</span> 
                      Last Modified: {trial.updated_at}
                    </div>
                  )
                })}
              </div>

              {this.state.trialView && (
                <div className='trial-container'>
                  <h4>Trial {this.state.trials[this.state.selectedTrial].trial_num}</h4>
                  <div>Last Modified: {this.state.trials[this.state.selectedTrial].updated_at}</div>
                  <div>this will be a graph of the data</div>
                  <div>this will be a list of the datapoints</div>
                  <div>
                    Notes:
                    <form onSubmit={this.submitTrialNotes}>
                      <input type='text' name='trialNotes' onChange={this.handleChange} value={this.state.trialNotes}/>
                      <input type='submit' value='Save' />
                    </form>
                  </div>
                </div>
              )}
    
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