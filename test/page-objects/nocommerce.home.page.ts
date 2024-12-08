import Page from "../page-objects/page.ts";
import reporter from "../helper/reporter.ts";
import { expect } from "chai";

class HomePage extends Page {
  constructor() {
    super();
  }
  /**Page Objects */
  get userNameInputBox() {
    return $(`#Email`);
  }
  get passwordInputBox() {
    return $(`#Password`);
  }
  get loginButton() {
    return $(`button=Login in`);
  }
  /**Page Actions */
  async loginToNopCommerceWeb(testId: string, url:string,userName: string,password:string) {
    if (!url||!userName||!password) throw Error(`Given data is not valid ${userName}`);
    //false, notAnumber, undefined ,null,0, emptystring
    try {
      userName = userName.trim();
      url = url.trim();
      await this.navigateTo(url)
      await this.typeInto( await this.userNameInputBox, userName);
      await this.typeInto( await this.passwordInputBox, password);
      await this.click( await this.loginButton);
      reporter.addStep(
        testId,
        "info",
        `Login to : ${url} is entered successfully`
      );
    } catch (err) {
      err.message = `Failed to login to  ${url},${err.message}`;
      throw err;
    }
  }

  
}

export default new HomePage();
