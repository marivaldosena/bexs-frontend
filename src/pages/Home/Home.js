import React from 'react';
import QuestionList from '../../components/questions/QuestionList';

function Home() {
  return (
    <>
      <h4>Questions</h4>
      <ul>
        <QuestionList />
      </ul>
    </>
  );
}

export default Home;