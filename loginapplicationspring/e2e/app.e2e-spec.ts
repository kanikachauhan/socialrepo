import { LoginapplicationspringPage } from './app.po';

describe('loginapplicationspring App', () => {
  let page: LoginapplicationspringPage;

  beforeEach(() => {
    page = new LoginapplicationspringPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
