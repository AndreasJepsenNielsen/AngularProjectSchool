import { QuizActions } from './quiz.actions';
import { QuizState } from './store';
import { tassign } from 'tassign';

const INITIAL_STATE: QuizState = {isLoggedIn: false, quizzes: [], isLoading: false }

export function quizReducer(state: QuizState = INITIAL_STATE, action:any) {
 
  switch (action.type) {

    case QuizActions.GET_QUIZZES_LOADING:
      return tassign(state, { isLoading: true });


    case QuizActions.GET_QUIZZES_SUCCESS:
      return tassign(state, {isLoading: false, quizzes: action.payload });


    case QuizActions.GET_QUIZZES_FAILED:
      return tassign(state, {isLoading: false});


    case QuizActions.CREATE_QUIZ:  
      return tassign(state, { quizzes: [...state.quizzes, action.payload] });


    case QuizActions.UPDATE_QUIZ:
      return tassign(state, {quizzes: [...state.quizzes.splice(action.payload._id, 1, action.payload)]});


    case QuizActions.DELETE_QUIZ:
      return tassign(state, {quizzes: state.quizzes.filter(quiz => quiz._id !== action.payload.quizId)});


    case QuizActions.LOG_IN:
      return tassign(state, {isLoggedIn: action.payload});


    default:
      return state;
  }
}
