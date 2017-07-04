import { Ng4ReactiveFormsCoursePage } from './app.po';

describe('ng4-reactive-forms-course App', () => {
  let page: Ng4ReactiveFormsCoursePage;

  beforeEach(() => {
    page = new Ng4ReactiveFormsCoursePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
