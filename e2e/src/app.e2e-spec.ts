import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // 1.0: Verify that I can go to the login component
  // 1.1: ...

  it('1.0: Verify that I can go to the login component', () => {
    browser.get('home/login');
    let loginText = element(by.id('username')).getText();

    expect(loginText).toEqual("");
  });

  it('1.1: login by filling out username and password, landing page afterwards', () => {
    element(by.id('username')).sendKeys('administrator');
    element(by.id('password')).sendKeys('administrator');

    element(by.id('submitLogin')).click();

    // Cleaner way to check that you are in the right place.
    expect(browser.getCurrentUrl()).toContain('/portal/display-quizzes');

  });

  it('1.2: access a quiz, navigate back and access the second quiz', () => {
    element(by.id('1')).click();

    browser.navigate().back();

    element(by.id('2')).click();
  });


  it('1.3: create a new quiz and access it', () => {
    element(by.id('createQuiz')).click();

    expect(browser.getCurrentUrl()).toContain('/portal/create-quiz');

    element(by.id('quizTitle')).sendKeys('e2eTitle');
    element(by.id('question1')).sendKeys('e2eQuestion');
    element(by.id('option1_1')).sendKeys('e2eOption');
    element(by.id('option1_2')).sendKeys('e2eOption');
    element(by.id('option1_3')).sendKeys('e2eOption');
    element(by.id('option1_4')).sendKeys('e2eOption');
    element(by.id('question2')).sendKeys('e2eQuestion2');
    element(by.id('option2_1')).sendKeys('e2eOption');
    element(by.id('option2_2')).sendKeys('e2eOption');
    element(by.id('option2_3')).sendKeys('e2eOption');
    element(by.id('option2_4')).sendKeys('e2eOption');

    element(by.id('saveQuiz')).click();

    expect(browser.getCurrentUrl()).toContain('/portal/display-quizzes');


    element(by.id('3')).click();


  })
it('1.4: logout', () => {
    element(by.id('options')).click();

    element(by.id('logout')).click();

    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('2.0: Verify that I can go to the login component', () => {
    browser.get('/login');
    let loginText = element(by.id('username')).getText();

    expect(loginText).toEqual("");
  });

  it('2.1: Try to login using bad credentials', () => {
    element(by.id('username')).sendKeys('admin');
    element(by.id('password')).sendKeys('admin');

    element(by.id('submitLogin')).click();

    // Cleaner way to check that you are in the right place.
    expect(browser.getCurrentUrl()).toContain('/login');
  })


  it('3.0: Verify that I can go to the login component', () => {
    browser.get('/login');
    let loginText = element(by.id('username')).getText();

    expect(loginText).toEqual("");
  });

  it('3.1: login by filling out username and password, as a normal user', () => {
    element(by.id('username')).sendKeys('username');
    element(by.id('password')).sendKeys('password');

    element(by.id('submitLogin')).click();

    expect(browser.getCurrentUrl()).toContain('/portal/display-quizzes');
  });

  it('3.2: Try to navigate to admin page', () => {
    browser.navigate().to('http://localhost:4200/portal/admin');

    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('3.3: logout', () => {
    element(by.id('options')).click();

    element(by.id('logout')).click();

    expect(browser.getCurrentUrl()).toContain('/login');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});