import { NgHuePage } from './app.po';

describe('ng-hue App', function() {
  let page: NgHuePage;

  beforeEach(() => {
    page = new NgHuePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
