import { QuizPipe } from './quiz.pipe';
import { Quiz } from './entities/quiz';

describe('QuizPipe', () => {
  it('create an instance', () => {
    const pipe = new QuizPipe();
    expect(pipe).toBeTruthy();
  });

  let quiz = { title: 'Test quiz', questions: [] } as Quiz;
  let quiz2 = { title: 'Test quiz2', questions: [] } as Quiz;
  let quiz3 = { title: 'Animal', questions: [] } as Quiz;
  let quiz4 = { title: 'Test quiz4', questions: [] } as Quiz;
  let quizzes: Quiz[] = []
  quizzes.push(quiz);
  quizzes.push(quiz2);
  quizzes.push(quiz3);
  quizzes.push(quiz4);

  it('should show only quizzes that contains animal', () => {
    const pipe = new QuizPipe();
  
    let searchPipe = pipe.transform(quizzes,"Animal")
    expect(searchPipe.length).toBe(1);
  })

  it('should show a quiz length of 4', () => {
    const pipe = new QuizPipe();

    let searchPipe = pipe.transform(quizzes,"")
    expect(searchPipe.length).toBe(4);
  })
});
