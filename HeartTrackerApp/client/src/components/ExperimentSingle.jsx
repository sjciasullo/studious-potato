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
      trialData: null,
      newDataHeartrate: '',
      dataEditIndex: null,
      editHeartrate: '',
    }

    this.createTrial = this.createTrial.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitTrialNotes = this.submitTrialNotes.bind(this);
    this.submitData = this.submitData.bind(this);
    this.editHeartrateForm = this.editHeartrateForm.bind(this);
    this.submitEditData = this.submitEditData.bind(this);
    this.deleteDatapoint = this.deleteDatapoint.bind(this);
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

  getTrialData(id) {
    fetch(`/trials/${id}/data`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then( res => res.json())
    .then( json => {
      this.setState({
        trialData: json.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  trialView(id) {
    const notes = this.state.trials[id].notes
    this.getTrialData(this.state.trials[id].id);
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
      this.getTrials();
    }).catch(err => {
        console.log(err);
    })
  }

  submitData(e){
    e.preventDefault();
    const trial_id = this.state.trials[this.state.selectedTrial].id
    fetch(`/trials/${trial_id}/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      body: JSON.stringify({
        datapoint: {
          heartrate: this.state.newDataHeartrate,
        }
      })
    }).then( res => res.json())
    .then( json => {
      this.setState({
        newDataHeartrate: ''
      })
      this.getTrialData(trial_id);
    }).catch(err => {
        console.log(err);
    })
  }

  getTrials(){
    fetch(`/experiments/${this.state.id}/trials`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
    }).then(res => res.json())
    .then( json => {
      this.setState({
        trials: json.trials,
      })
    }).catch( err => {
      console.log(err);
    })
  }

  componentDidMount(){
    this.getSingleExperiment(this.props.id);
  }

  /*strategy for update a single point based on click

  -- onClick setState of dataEditIndex to the index?
  -- if dataEditIndex === index in the map, render a form instead
  -- on the edit submit, save it and set dataEditIndex back to null
  */

  editHeartrateForm(dataIndex){
    const heartrate = this.state.trialData[dataIndex].heartrate;
    this.setState({
      dataEditIndex: dataIndex,
      editHeartrate: heartrate,
    })
  }

  submitEditData(e){
    e.preventDefault();
    const trial_id = this.state.trials[this.state.selectedTrial].id
    const data_id = this.state.trialData[this.state.dataEditIndex].id
    fetch(`/trials/${trial_id}/data/${data_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
      body: JSON.stringify({
        datapoint: {
          heartrate: this.state.editHeartrate,
        }
      })
    }).then( res => res.json())
    .then( json => {
      this.setState({
        dataEditIndex: null,
        editHeartrate: '',
      })
      this.getTrialData(trial_id);
    }).catch( err => {
      console.log(err);
    })
  }

  deleteDatapoint(dataId){
    const trial_id = this.state.trials[this.state.selectedTrial].id
    fetch(`/trials/${trial_id}/data/${dataId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      },
    }).then( res => res.json())
    .then( json => {
      this.getTrialData(trial_id);
    }).catch ( err => {
      console.log(err);
    })
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
                  <div className="datapoints-list-container">
                    <h4>Datapoints list</h4>
                    <form onSubmit={this.submitData}>
                      <label> BPM
                      <input 
                        type='number'
                        name='newDataHeartrate'
                        onChange={this.handleChange}
                        value={this.state.newDataHeartrate}
                        placeholder='80'
                      />
                      <input type='submit' value='Create New Datapoint'/>
                      </label>
                    </form>
                    {this.state.trialData !== null && ( 
                      <div className="datapoints-list">
                        {this.state.trialData.map((data, index) => {
                          if(this.state.dataEditIndex === index) {
                            return (
                              <form onSubmit={this.submitEditData} key={index}>
                                <label>
                                  Heartrate:
                                  <input 
                                    type='number'
                                    name='editHeartrate'
                                    onChange={this.handleChange}
                                    value={this.state.editHeartrate}
                                  />
                                  BPM
                                </label>
                                <input type='submit' value='Save'/>
                              </form>
                            )
                          } else {
                            return (
                              <div className='data-list-container' key={index}>
                                <button onClick={() => this.deleteDatapoint(data.id)}>-</button>
                                <div onClick={() => this.editHeartrateForm(index)} 
                                className='data-list-item' 
                                >
                                Heartrate: {data.heartrate} BPM
                                </div>
                              </div>
                            )
                          }
                          
                        })}
                      </div> 
                    )}
                  </div>
                  <div>

                  </div>
                  <div>
                    Trial Notes:
                    <form onSubmit={this.submitTrialNotes}>
                      {/* <input type='text-area' name='trialNotes' onChange={this.handleChange} value={this.state.trialNotes}/> */}
                      <textarea name='trialNotes' onChange={this.handleChange} value={this.state.trialNotes}></textarea>
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