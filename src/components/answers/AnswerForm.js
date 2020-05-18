import React, { useState } from 'react';

function QuestionForm({ doAnswerQuestion, questionId, isQuestionOK }) {
  const [values, setValue] = useState({user: '', text: ''})

  const handleInput = (event) => {
    const auxValue = { ...values }
    auxValue[event.target.name] = event.target.value;
    setValue(auxValue);
  }

  const submitForm = (event) => {
    event.preventDefault();
    doAnswerQuestion({ ...values, questionId });
  }

  const cleanForm = () => {
    if (isQuestionOK) {
      setValue({});
    }
  }

  return (
    <>
      <div className="row">
        <form 
          data-testid="answer-form"
          className="col s12"
          onSubmit={submitForm}>

          {/* Username */}
          <div className="row">
            <div className="input-field col s12">
              <input
                data-testid="answer-form-user"
                id="user"
                name="user"
                type="text"
                className="validate"
                value={values.user}
                onChange={handleInput}
              />
              <label
                data-testid="answer-form-user-label"
                htmlFor="user">Username</label>
            </div>
          </div>

          {/* Answer Text */}
          <div className="row">
            <div className="input-field col s12">
              <textarea
                data-testid="answer-form-text"
                id="text"
                name="text"
                className="materialize-textarea"
                style={{ minHeight: '5em' }}
                onChange={handleInput}
              ></textarea>
              <label
                data-testid="answer-form-text-label"
                htmlFor="text">Answer</label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="row">
            <div className="col s12 right-align">
              <button
                data-testid="answer-form-button"
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