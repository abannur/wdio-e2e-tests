import Page from "../page-objects/page.ts";
import reporter from "../helper/reporter.ts";
import { expect } from "chai";

class HomePage extends Page {
  constructor() {
    super();
  }
  /**Page Objects */
  get userNameInputBox() {
    return $(`#user-name`);
  }
  get passwordInputBox() {
    return $(`#password`);
  }
  get loginButton() {
    return $(`#login-button`);
  }
  /**Page Actions */
  async enterUserName(testId: string, userName: string) {
    if (!userName) throw Error(`Given user name is not valid ${userName}`);
    //false, notAnumber, undefined ,null,0, emptystring
    try {
      userName = userName.trim();
      await this.typeInto( await this.userNameInputBox, userName);
      reporter.addStep(
        testId,
        "info",
        `username ${userName} is entered successfully`
      );
    } catch (err) {
      err.message = `Error entering username ${userName},${err.message}`;
      throw err;
    }
  }

  async enterPassword(testId: string, password: string) {
    if (!password) throw Error(`Given password is not valid `);
    //false, notAnumber, undefined ,null,0, emptystring
    try {
      password = password.trim();
      await this.typeInto(await this.passwordInputBox, password);
      reporter.addStep(testId, "info", `password is entered successfully`);
    } catch (err) {
      err.message = `Error entering password,${err.message}`;
      throw err;
    }
  }

  async clickLoginBtn(testId: string) {
    try {
      await this.click(this.loginButton);
      reporter.addStep(testId, "info", `Login clicked successfully`);
    } catch (err) {
      err.message = `Error clicking login button,${err.message}`;
      throw err;
    }
  }

  async loginToSauceApp(testId: string,userName:string,password:string)
  {
    try {
        await this.enterUserName(testId,userName);
        await this.enterPassword(testId,password);
        await this.clickLoginBtn(testId)
    } catch (err) {
        throw err
    }
  }
}

export default new HomePage();
