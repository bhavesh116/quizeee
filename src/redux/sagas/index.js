/* eslint-disable import/prefer-default-export */
import { takeLatest } from 'redux-saga/effects';

import { quizActions } from '../actionTypes';

import {
    createQuizSaga, 
    getQuizSaga,
    submitQuizSaga
} from './quizSagas'

export default function* watcherSaga() {
 yield takeLatest(quizActions.CREATE_NEW_QUIZ_INITIATE, createQuizSaga)
 yield takeLatest(quizActions.GET_QUIZ_DATA_INITIATE, getQuizSaga)
 yield takeLatest(quizActions.SUBMIT_QUIZ_INITIATE, submitQuizSaga)
}