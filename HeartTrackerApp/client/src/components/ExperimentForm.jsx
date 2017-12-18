import React from 'react';

const ExperimentForm = function(props) {
  const experimentTitle = props.experimentTitle;
  const experimentDescription = props.experimentDescription;
  const handleChange = props.handleChange;
  const submitExperiment = props.submitExperiment;
  const edit = props.edit;
  const cancelEditExperiment = props.cancelEditExperiment;

  return(
    <div>
      {!edit ? <h2>Create Your Experiment!</h2> : <h2>Edit Your Experiment!</h2>}
      <form onSubmit={submitExperiment}>
        <input 
          type='text'
          name='experimentTitle'
          placeholder='Title' 
          value={experimentTitle}
          onChange={handleChange}
        />
        <input 
          type='text'
          name='experimentDescription'
          placeholder='Description'
          value={experimentDescription}
          onChange={handleChange}
        />
        {/* input for warningFlags <input /> */}
        <input type='submit' value='Save' />
      </form>
      {edit && <button onClick={cancelEditExperiment}>Cancel</button>}
    </div>
  )
}

export default ExperimentForm;