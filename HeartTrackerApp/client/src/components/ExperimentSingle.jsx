import React from 'react';

const ExperimentSingle= function (props) {
  const experiment = props.experiment;
  return(
    <div>
      <h3>{experiment.title}</h3>
    </div>
  )
}

export default ExperimentSingle;