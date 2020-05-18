import React, { useState } from 'react';

function QuestionForm({ doCreateQuestion }) {
  const [values, setValue] = useState({})

  const handleInput = (event) => {
    const auxValue = { ...values }
    auxValue[event.target.name] = event.target.value;
    setValue(auxValue);
  }

  const submitForm = (event) => {
    event.preventDefault();
    doCreateQuestion({ ...values });
  }

  return (
    <>
      <div className="row">
        <form data-testid="question-form" className="col s12" onSubmit={submitForm}>

          {/* Username */}
          <div className="row">
            <div className="input-field col s12">
              <input
                data-testid="question-form-user"
                id="user"
                name="user"
                type="text"
                className="validate"
                onChange={handleInput}
              />
              <label
                data-testid="question-form-user-label"
                htmlFor="user">Username</label>
            </div>
          </div>

          {/* Question Text */}
          <div className="row">
            <div className="input-field col s12">
              <textarea
                data-testid="question-form-text"
                id="text"
                name="text"
                className="materialize-textarea"
                style={{ minHeight: '5em' }}
                onChange={handleInput}
              ></textarea>
              <label
                data-testid="question-form-text-label"
                htmlFor="text">Question</label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="row">
            <div className="col s12 right-align">
              <button
                data-testid="create-question-button"
                className="waves-effect waves-light btn green darken-2"
              >button</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuestionForm;