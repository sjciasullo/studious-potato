import React, { Component } from 'react';

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
      title: props.experiment.title,
      created_at: props.experiment.created_at,
      updated_at: props.experiment.updated_at,
      description: props.experiment.description,
      trials: props.experiment.trials,
      data: props.experiment.data,
    }
  }

  render(){
    return(
      <div>
        {this.props.message === 'Not your experiment!' ? (
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
              {this.trials.map((trial, index) => {
                return (
                  <div className='trial-short'>
                    {trial.trial_num} Last Modified: {trial.updated_at}
                  </div>
                )
              })}
            </div>
  
          </div>
          
        )}
        
      </div>
    )
  }
  
}

export default ExperimentSingle;