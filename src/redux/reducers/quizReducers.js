import { quizActions } from '../actionTypes'

const initialState = {
   createQuizLoader: false,
   createdQuizData: {},
   getQuizDataLoader: false,
   quizData: {},
   submitQuizLoader: false,
   quizSubmitBool: false,
}

export default function quizReducer(state = initialState, { type, payload }) {
  switch (type) {
    case quizActions.CREATE_NEW_QUIZ_INITIATE:
      return { ...state, createQuizLoader: true }

    case quizActions.CREATE_NEW_QUIZ_SUCCESS:
      return { ...state, createQuizLoader: false, createdQuizData: payload }

    case quizActions.CREATE_NEW_QUIZ_FAILURE:
      return { ...state, createQuizLoader: false }

    case quizActions.GET_QUIZ_DATA_INITIATE:
        return { ...state, getQuizDataLoader: true }
  
    case quizActions.GET_QUIZ_DATA_SUCCESS:
        return { ...state, getQuizDataLoader: false, quizData: payload }
  
    case quizActions.GET_QUIZ_DATA_FAILURE:
        return { ...state, getQuizDataLoader: false }

    case quizActions.SUBMIT_QUIZ_INITIATE:
      return { ...state, submitQuizLoader: true }

    case quizActions.SUBMIT_QUIZ_SUCCESS:
      return { ...state, submitQuizLoader: false, quizSubmitBool: !state.quizSubmitBool }

    case quizActions.SUBMIT_QUIZ_FAILURE:
      return { ...state, submitQuizLoader: false }

    default:
      return state
  }
}
