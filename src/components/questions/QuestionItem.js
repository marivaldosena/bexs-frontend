import React from 'react';
import { Link } from 'react-router-dom';

function QuestionItem({ question }) {
  return (
    <li data-testtype="question-item" data-testid={`question-item-id-${question.id}`}>
      <Link to={`/questions/${question.id}`} className="collection-item">
        <span className="new badge" data-badge-caption="answers">{question.answersQty}</span>
        {question.text}
        <div className="text-green text-darken-4" style={{fontSize: '0.85em'}}>
          User: {question.user} | Date: {question.creationDate}
        </div>
      </Link>
    </li>
  );
}

export default QuestionItem;