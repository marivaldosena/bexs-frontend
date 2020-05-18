import React from 'react';

function AnswerItem({ answer }) {
  return (
    <>
      <li
        data-testtype="answer-item"
        data-testid={`answer-item-id-${answer.id}`}
        className="collection-item">
        <div>{answer.text}
          <a href="#" className="secondary-content">
            <i className="material-icons">star</i>
          </a>
          <div className="text-green text-darken-4" style={{ fontSize: '0.85em' }}>
            User: {answer.user} | Date: {answer.creationDate}
          </div>
        </div>
      </li>
    </>
  );
}

export default AnswerItem;