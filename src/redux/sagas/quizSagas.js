import { put } from 'redux-saga/effects'
import axios from 'axios'
import config from '../../config/config.json'
import {
  createNewQuizSuccess,
  createNewQuizFailure,
  submitQuizSuccess,
  submitQuizFailure,
  getQuizDataSuccess,
  getQuizDataIFailure
} from '../actions/quizActions'

const { devUrl } = config

export function* createQuizSaga({payload}) {
   try {
      const res = yield axios.post(`${devUrl}/createQuiz`, payload)
      yield put(createNewQuizSuccess(res.data))
   } catch (err) {
      yield put(createNewQuizFailure(err.response.data || err))
   }
}

export function* getQuizSaga({payload}) {

    try {
       const res = yield axios.get(`${devUrl}/quiz/${payload}`)
       yield put(getQuizDataSuccess(res.data.data))
    } catch (err) {
       yield put(getQuizDataIFailure(err.response.data || err))
    }
}

export function* submitQuizSaga({payload}) {
    try {
        const res = yield axios.post(`${devUrl}/submitQuiz`, payload)
        yield put(submitQuizSuccess(res.data.data))
    } catch (err) {
        yield put(submitQuizFailure(err.response.data || err))
    }
}