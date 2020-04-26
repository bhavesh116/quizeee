import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CreateQuiz from './components/CreateQuiz'
import QuizResults from './components/QuizResults'
import AnswerAQuiz from './components/AnswerAQuiz'

const history = createBrowserHistory();

// eslint-disable-next-line import/prefer-default-export
export const RootRoutes = () => (
  <BrowserRouter history={history}>
    <Switch>
      <Route
        path="/createQuiz"
        component={CreateQuiz}
      />
      <Route
        path="/quizResults/:quizId"
        component={QuizResults}
      />
      <Route
        path="/quiz/:quizId"
        component={AnswerAQuiz}
      />
      <Redirect
        from="/"
        to="/createQuiz"
      />
    </Switch>
  </BrowserRouter>
);
