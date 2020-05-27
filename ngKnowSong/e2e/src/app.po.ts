import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(){
    return browser.get(browser.baseUrl);
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
