import React, { useEffect, useState } from 'react';
import axios from 'axios';
import M from 'materialize-css';

import QuestionForm from './QuestionForm';
import QuestionItem from './QuestionItem';

function QuestionList() {
  const [questionList, setQuestionList] = useState({});
  const [allQuestions, setAllQuestions] = useState({})
  const [showOnlyUnansweredQuestions, setShowOnlyUnansweredQuestions] = useState(false);
  const [sorting, setSortingOption] = useState('');

  useEffect(() => {
    M.AutoInit();

    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('select');
      const instances = M.FormSelect.init(elems, {});
      console.log(instances);
    });
    
    if (!questionList.hasOwnProperty('questions')) {
      axios.get('http://localhost:5000/api/v1/questions/')
        .then(result => {
          setQuestionList(result.data);
          setAllQuestions(result.data);
        })
        .catch(err => {
          console.error(err);
        })
    }
  });

  useEffect(() => {
    setQuestionList(allQuestions);

    const auxQuestionList = { ...allQuestions };

    if (questionList.hasOwnProperty('questions') && showOnlyUnansweredQuestions) {
      
      const foundQuestions = auxQuestionList.questions.filter(item => {
        return item.answers.length === 0;
      });
      
      auxQuestionList['questions'] = foundQuestions;
    }

    setQuestionList(auxQuestionList);
  }, [showOnlyUnansweredQuestions]);

  useEffect(() => {
    const auxQuestionList = { ...questionList };
    let sortedQuestions = [];

    if (questionList.hasOwnProperty('questions')) {
      switch(sorting) {
        case 'DtAsc':
          sortedQuestions = questionList.questions.sort((questionA, questionB) => {
            if (questionA.creationDate < questionB.creationDate) {
              return -1;
            } else if (questionA.creationDate > questionB.creationDate) {
              return 1;
            } else {
              return 0;
            }
          })
          break;

        case 'DtDesc':
          sortedQuestions = questionList.questions.sort((questionA, questionB) => {
            if (questionA.creationDate < questionB.creationDate) {
              return 1;
            } else if (questionA.creationDate > questionB.creationDate) {
              return -1;
            } else {
              return 0;
            }
          })
          break;

        case 'ZA':
          sortedQuestions = questionList.questions.sort((questionA, questionB) => {
            if (questionA.text.toLowerCase() > questionB.text.toLowerCase()) {
              return -1;
            } else if (questionA.text.toLowerCase() < questionB.text.toLowerCase()) {
              return 1;
            } else {
              return 0;
            }
          })
          break;

        case 'AZ':
          sortedQuestions = questionList.questions.sort((questionA, questionB) => {
            if (questionA.text.toLowerCase() > questionB.text.toLowerCase()) {
              return 1;
            } else if (questionA.text.toLowerCase() < questionB.text.toLowerCase()) {
              return -1;
            } else {
              return 0;
            }
          })
          break;

          case 'answerAsc':
            sortedQuestions = questionList.questions.sort((questionA, questionB) => {
              if (questionA.answers.length < questionB.answers.length) {
                return -1;
              } else if (questionA.answers.length > questionB.answers.length) {
                return 1;
              } else {
                return 0;
              }
            })
            break;
  
          case 'answerDesc':
            sortedQuestions = questionList.questions.sort((questionA, questionB) => {
              if (questionA.answers.length < questionB.answers.length) {
                return 1;
              } else if (questionA.answers.length > questionB.answers.length) {
                return -1;
              } else {
                return 0;
              }
            })
            break;

        default:
          sortedQuestions = questionList.questions.sort((questionA, questionB) => {
            if (questionA.text.toLowerCase() > questionB.text.toLowerCase()) {
              return 1;
            } else if (questionA.text.toLowerCase() < questionB.text.toLowerCase()) {
              return -1;
            } else {
              return 0;
            }
          })
        }
        auxQuestionList['questions'] = sortedQuestions;

        setQuestionList(auxQuestionList);
    }

  }, [sorting]);

  const doCreateQuestion = ({ text, user }) => {
    axios.post('http://localhost:5000/api/v1/questions/', {
      text, user
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(result => {
      const auxQuestions = { ...allQuestions };

      if (result.status === 201) {
        const question = result.data.question;

        if (!auxQuestions.hasOwnProperty('questions')) {
          auxQuestions['questions'] = [];
        }

        auxQuestions.questions.unshift(question);
        setQuestionList(auxQuestions);
        setAllQuestions(auxQuestions);
      } else {
        console.error(result)
      }
    })
      .catch(err => console.error(err));
  }

  const doQuestionSearch = (event) => {
    event.preventDefault();
    setQuestionList(allQuestions);

    const questionText = event.target.value;
    const auxQuestionList = { ...allQuestions };

    if (questionList.hasOwnProperty('questions')) {
      const foundQuestions = auxQuestionList.questions.filter(item => {
        return item.text.includes(questionText);
      });
      
      auxQuestionList['questions'] = foundQuestions;
    }
    setQuestionList(auxQuestionList);
  }

  return (
    <>
      <ul data-testid="question-options" className="collapsible">
        
        {/* Create a Question */}
        <li data-testid="create-question">
          <div className="collapsible-header">
            <i className="material-icons">add</i>Create Question
          </div>
          <div className="collapsible-body">
            <QuestionForm doCreateQuestion={doCreateQuestion} />
          </div>
        </li>

        {/* Question Search */}
        <li data-testid="question-search">
          <div className="collapsible-header">
            <i className="material-icons">search</i>Search
          </div>
          <div className="collapsible-body">
            <form
              data-testid="question-search-form"
              id="question-search-form"
              className="col s12"
              onSubmit={(event) => event.preventDefault()}>
              <div className="input-field col s12">
                <input
                  type="text"
                  data-testid="question-search"
                  id="question-search"
                  className="validate"
                  onChange={doQuestionSearch}
                />
                <label htmlFor="question-search">Question Search</label>
              </div>
            </form>
          </div>
        </li>

        {/* Sorting and Filtering */}
        <li data-testid="question-sort-and-filter">
          <div className="collapsible-header">
            <i className="material-icons">import_export</i>Sorting and Filtering
          </div>
          <div className="collapsible-body">
            <form
              data-testid="order-and-filter-form"
              id="order-and-filter-form"
              onSubmit={(event) => event.preventDefault()}>
              
              {/* Show Only Unanswered Questions */}
              <div className="col s12">
                <p>
                  <label>
                    <input 
                      data-testid="showUnansweredQuestions"
                      name="showUnansweredQuestions"
                      type="checkbox"
                      className="filled-in"
                      value={showOnlyUnansweredQuestions}
                      onChange={() => setShowOnlyUnansweredQuestions(! showOnlyUnansweredQuestions)}
                    />
                    <span>Only Unanswered Questions?</span>
                  </label>
                </p>
              </div>

              {/* Sorting */}
              <div className="input-field col s12">
                <select
                  data-testid="sorting-questions"
                  name="sorting-questions"
                  id="sorting-questions"
                  value={sorting}
                  onChange={event => setSortingOption(event.target.value)}>
                  <option value="" disabled>Choose your sorting option</option>
                  <option value="AZ">A - Z</option>
                  <option value="ZA">Z - A</option>
                  <option value="DtAsc">Date Asc</option>
                  <option value="DtDesc">Date Desc</option>
                  <option value="answerAsc">Less Answers</option>
                  <option value="answerDesc">More Answers</option>
                </select>
                <label>Sorting</label>
              </div>
            </form>
          </div>
        </li>
      </ul>
      <div data-testid="question-list" className="collection">
        {(questionList.hasOwnProperty('questions') && questionList.questions.length > 0) ?
          questionList.questions.map((question, key) => {
            return (
              <QuestionItem key={key} question={question} />
            );
          }) :
          <p>There are no questions yet.</p>
        }
      </div>
    </>
  );
}

export default QuestionList;