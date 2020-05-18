import React, { useEffect } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import Home from './pages/Home/Home';
import Question from './pages/Questions/Question';

function Routes() {
  return (
    <Switch>
      <Route path="/questions/:questionId">
        <Question />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default Routes;