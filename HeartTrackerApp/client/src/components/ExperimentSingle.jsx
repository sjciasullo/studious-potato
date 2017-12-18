import React from 'react';

const ExperimentSingle= function (props) {
  const experiment = props.experiment;
  const message = props.message;
  const deleteExperiment = props.deleteExperiment;
  return(
    <div>
      {message === 'Not your experiment!' ? (
        <p>Not your experiment!</p>
      ) : (
        <div>
          <h3>{experiment.title}</h3>
          <p>{experiment.created_at}</p>
          <p>{experiment.updated_at}</p>
          <p>{experiment.description}</p>
          <p>do something with data here</p>
          <button onClick={() => deleteExperiment(experiment.id)}>Delete Experiment</button>
        </div>
        
      )}
      
    </div>
  )
}

export default ExperimentSingle;