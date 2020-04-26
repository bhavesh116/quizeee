import { quizActions } from '../actionTypes'

export const createNewQuizInitiate = (data) => ({
 type: quizActions.CREATE_NEW_QUIZ_INITIATE,
 payload: data
})

export const createNewQuizSuccess = (data) => ({
 type: quizActions.CREATE_NEW_QUIZ_SUCCESS,
 payload: data 
})

export const createNewQuizFailure = (data) => ({
 type: quizActions.CREATE_NEW_QUIZ_FAILURE,
 payload: data
})

export const getQuizDataInitiate = (data) => ({
 type: quizActions.GET_QUIZ_DATA_INITIATE,
 payload: data
})
  
export const getQuizDataSuccess = (data) => ({
 type: quizActions.GET_QUIZ_DATA_SUCCESS,
 payload: data 
})
  
export const getQuizDataIFailure = (data) => ({
 type: quizActions.GET_QUIZ_DATA_FAILURE,
 payload: data
})

export const submitQuizInitiate = (data) => ({
 type: quizActions.SUBMIT_QUIZ_INITIATE,
 payload: data 
})

export const submitQuizSuccess = (data) => ({
 type: quizActions.SUBMIT_QUIZ_SUCCESS,
 payload: data 
})

export const submitQuizFailure = (data) => ({
 type: quizActions.SUBMIT_QUIZ_FAILURE,
 payload: data
})