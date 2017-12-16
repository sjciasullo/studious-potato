import React from 'react';

const Dashboard = function(props) {
  // prop list
  const experiments = props.experiments;

  return(
    <div className='dash_container'>
      <h2>Your Experiments</h2>
      {experiments.map( experiment => {
        return (
          <div className='experiment-short'>
            <h3>{experiment.title}</h3>
            <p>Created at: {experiment.created_at}</p>
            <p>Updated at: {experiment.updated_at}</p>
            <p>{experiment.description}</p>
          </div>
        )
      })}
    </div>
  )
}

/*

*/

export default Dashboard;