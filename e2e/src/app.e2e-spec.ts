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
    expect(browser.getCurrentUrl()).toContain('/portal/index');
    

  });

  it('1.2: access a quiz, navigate back and access the second quiz', () => {
    

    element(by.id("display-quizzes")).click();

    element(by.id('5cea98c2684972602eb38bab')).element(by.id('startQuiz')).click();

    element(by.id("display-quizzes")).click();

    element(by.id('5cea990e684972602eb38baf')).element(by.id('startQuiz')).click();



  });


  it('1.3: create a new quiz and access it', () => {
    element(by.id('createQuiz')).click();

    expect(browser.getCurrentUrl()).toContain('/portal/create-quiz');
    element(by.id('quizTitle')).sendKeys('e2eTitle');
    element(by.id('newQuestion')).click()
    element(by.id('ques0')).sendKeys('e2eQuestion');
    element(by.id('00')).sendKeys('e2eOption');
    element(by.id('01')).sendKeys('e2eOption');
    element(by.id('00cor')).click();
    element(by.id('newQuestion')).click()
    element(by.id('ques1')).sendKeys('e2eQuestion2');
    element(by.id('10')).sendKeys('e2eOption');
  
    element(by.id('11')).sendKeys('e2eOption');

    element(by.id('11cor')).click();

    element(by.id('saveQuiz')).click();

    expect(browser.getCurrentUrl()).toContain('/portal/display-quizzes');

  })
it('1.4: logout', () => {

    element(by.id('logout')).click();

    expect(browser.getCurrentUrl()).toContain('home/login');
  });

  it('2.0: Verify that I can go to the login component', () => {
    browser.get('home/login');
    let loginText = element(by.id('username')).getText();

    expect(loginText).toEqual("");
  });

  it('2.1: login by filling out username and password, as a normal user', () => {
    element(by.id('username')).sendKeys('username');
    element(by.id('password')).sendKeys('password');

    element(by.id('submitLogin')).click();

    expect(browser.getCurrentUrl()).toContain('/portal/index');
  });


  it('2.2: logout', () => {
    //element(by.id('options')).click();

    element(by.id('logout')).click();

    expect(browser.getCurrentUrl()).toContain('home/login');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});