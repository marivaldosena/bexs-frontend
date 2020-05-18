import React, { useState, useEffect } from 'react';
import AnswerList from '../../components/answers/AnswerList';
import AnswerForm from '../../components/answers/AnswerForm';
import { useParams } from 'react-router-dom';
import M from 'materialize-css';
import axios from 'axios';

function Questions() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState({})
  const [questionOK, setQuestionOK] = useState(false);
  const [sorting, setSortingOption] = useState('');

  useEffect(() => {
    M.AutoInit();

    document.addEventListener('DOMContentLoaded', function () {
      const elems = document.querySelectorAll('select');
      const instances = M.FormSelect.init(elems, {});
      console.log(instances);
    });

    if (!question.hasOwnProperty('id')) {
      axios.get(`http://localhost:5000/api/v1/questions/${questionId}/`)
        .then(result => {
          console.log(result.data);
          setQuestion(result.data.question);
        })
        .catch(err => console.error(err));
    }
  });

  useEffect(() => {
    const auxQuestion = { ...question };
    let sortedAnswers = [];

    if (question.hasOwnProperty('answers')) {
      switch (sorting) {
        case 'DtAsc':
          sortedAnswers = question.answers.sort((answerA, answerB) => {
            if (answerA.creationDate < answerB.creationDate) {
              return -1;
            } else if (answerA.creationDate > answerB.creationDate) {
              return 1;
            } else {
              return 0;
            }
          })
          break;

        case 'DtDesc':
          sortedAnswers = question.answers.sort((answerA, answerB) => {
            if (answerA.creationDate < answerB.creationDate) {
              return 1;
            } else if (answerA.creationDate > answerB.creationDate) {
              return -1;
            } else {
              return 0;
            }
          })
          break;

        case 'ZA':
          sortedAnswers = question.answers.sort((answerA, answerB) => {
            if (answerA.text.toLowerCase() > answerB.text.toLowerCase()) {
              return -1;
            } else if (answerA.text.toLowerCase() < answerB.text.toLowerCase()) {
              return 1;
            } else {
              return 0;
            }
          })
          break;

        case 'AZ':
          sortedAnswers = question.answers.sort((answerA, answerB) => {
            if (answerA.text.toLowerCase() > answerB.text.toLowerCase()) {
              return 1;
            } else if (answerA.text.toLowerCase() < answerB.text.toLowerCase()) {
              return -1;
            } else {
              return 0;
            }
          })
          break;

        default:
          sortedAnswers = question.answers.sort((answerA, answerB) => {
            if (answerA.text.toLowerCase() > answerB.text.toLowerCase()) {
              return 1;
            } else if (answerA.text.toLowerCase() < answerB.text.toLowerCase()) {
              return -1;
            } else {
              return 0;
            }
          })
      }
      auxQuestion['answers'] = sortedAnswers;

      setQuestion(auxQuestion);
    }

  }, [sorting]);

  const doAnswerQuestion = ({ questionId, text, user }) => {
    setQuestionOK(false);

    axios.post(`http://localhost:5000/api/v1/answers/`, {
      questionId, text, user
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        const auxQuestion = { ...question };

        if (result.status === 201) {
          const answer = result.data.answer;

          if (!auxQuestion.hasOwnProperty('answers')) {
            auxQuestion['answers'] = [];
          }

          auxQuestion.answers.unshift(answer);
          setQuestion(auxQuestion);
          setQuestionOK(true);
        } else {
          console.error(result);
        }
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <ul data-testid="answer-options" className="collapsible">

        {/* Answer a Question */}
        <li data-testid="answer-question">
          <div className="collapsible-header">
            <i className="material-icons">add</i>Answer a Question
          </div>
          <div className="collapsible-body">
            <AnswerForm
              doAnswerQuestion={doAnswerQuestion}
              questionId={question.id}
              isQuestionOK={questionOK}
            />
          </div>
        </li>


        {/* Sorting and Filtering */}
        <li data-testid="answer-sort-and-filter">
          <div className="collapsible-header">
            <i className="material-icons">import_export</i>Sorting and Filtering
          </div>
          <div className="collapsible-body">
            <form data-testid="order-and-filter-form" onSubmit={(event) => event.preventDefault()}>

              {/* Sorting */}
              <div className="input-field col s12">
                <select
                  data-testid="sort-answers"
                  name="sort-answers"
                  id="sort-answers"
                  value={sorting}
                  onChange={event => setSortingOption(event.target.value)}>
                  <option value="" disabled>Choose your sorting option</option>
                  <option value="AZ">A - Z</option>
                  <option value="ZA">Z - A</option>
                  <option value="DtAsc">Date Asc</option>
                  <option value="DtDesc">Date Desc</option>
                </select>
                <label>Sorting</label>
              </div>
            </form>
          </div>
        </li>
      </ul>

      <ul data-testid="answers" className="collection with-header">
        <li data-testid="question-header" className="collection-header">
          <h4>{question.text}</h4>
        </li>
        {(question.hasOwnProperty('answers') && question.answers.length > 0) ?
          <AnswerList answers={question.answers} />
          : <li className="collection-item">There are no answers.</li>
        }
      </ul>
    </>
  );
}

export default Questions;