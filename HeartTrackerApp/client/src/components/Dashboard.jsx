import React from 'react';

const Dashboard = function(props) {
  // prop list
  const experiments = props.experiments;
  const deleteExperiment = props.deleteExperiment;

  return(
    <div className='dash_container'>
      <h2>Your Experiments</h2>
      <a href='create-experiment'><button>New Experiment</button></a>
      {experiments.map( (experiment, index) => {
        return (
          <div className='experiment-short' key={index}>
            <a href={`/experiment/${experiment.id}`} ><h3>{experiment.title}</h3></a>
            <p>Created at: {experiment.created_at}</p>
            <p>Updated at: {experiment.updated_at}</p>
            <p>{experiment.description}</p>
            <button onClick={() => deleteExperiment(experiment.id)}>Delete Experiment</button>
          </div>
        )
      })}
    </div>
  )
}

/*

*/

export default Dashboard;