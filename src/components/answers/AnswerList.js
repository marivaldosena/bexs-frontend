import React from 'react';
import AnswerItem from './AnswerItem';

function AnswerList({ answers }) {
  return (
    answers.map((answer, key) => {
      return (
       <AnswerItem key={key} answer={answer} />
      );
    })
  );
} 

export default AnswerList;