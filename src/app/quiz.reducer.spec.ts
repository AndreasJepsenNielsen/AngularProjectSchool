import { QuizActions } from './quiz.actions';
import { quizReducer } from './quiz.reducer';
import { Quiz } from './entities/quiz';
import { QuizState } from './store';
var deepFreeze = require('deep-freeze');

describe('quiz reducer tests', () => {
  it('should set state to true when logging in', () => {
    let startState = {isLoggedIn: undefined, quizzes: [], isLoading: false};

    deepFreeze(startState);

    let actionObj = { 
      type: QuizActions.LOG_IN, payload: true};
    let newStateObj = quizReducer(startState, actionObj);
    expect(newStateObj).toEqual({isLoggedIn: true, quizzes: [], isLoading: false});
  });

  it('should create new ', () => {
    // Arrange - Act - Assert

    // Arrange
    let startState = {quizzes: []} as QuizState;
    deepFreeze(startState);
    let quiz = { title: 'Test quiz', questions: [] } as Quiz;
    let actionObj = { type: QuizActions.CREATE_QUIZ, payload: quiz };
    
    // Act
    let newStateObj = quizReducer(startState, actionObj);
    
    // Assert (expect)
    expect(newStateObj.quizzes.length).toBe(1);
    expect(newStateObj.quizzes[0].title).toBe('Test quiz');
  });
  
  it('should delete the new quiz', () => {
    // Arrange - Act - Assert

    // Arrange
    let startState = {quizzes: []} as QuizState;
    deepFreeze(startState);
    let quiz = { title: 'Test quiz', questions: [] } as Quiz;
    let actionObj = { type: QuizActions.DELETE_QUIZ, payload: quiz };
    
    // Act
    let newStateObj = quizReducer(startState, actionObj);
    
    // Assert (expect)
    expect(newStateObj.quizzes.length).toBe(0);
  });
});