import Page from "../page-objects/page.ts";
import reporter from "../helper/reporter.ts";
import { expect } from "chai";

class CustList extends Page {
  constructor() {
    super();
  }
  /**Page Objects */
  get firstNameInputBox() {
    return $(`#SearchFirstName`);
  }
  get lastNameInputBox() {
    return $(`#SearchLastName`);
  }
  get searchButton() {
    return $(`#search-customers`);
  }

  get noResultMessage(){
    return $(`td=No data available in table`)
  }
  /**Page Actions */
  async searchNameAndConfirm(testId: string, firstName:string,lastName: string):Promise<boolean> {
    if (!firstName||!lastName) throw Error(`Invalid firstName ${firstName} and lastName ${lastName}`);
    //false, notAnumber, undefined ,null,0, emptystring
    let nameNotExists=false;
    firstName = firstName.trim();
    lastName = lastName.trim();
      reporter.addStep(
        testId,
        "info",
        `Searching user: ${firstName} `
      );
    try {
      
      
      await this.typeInto( await this.firstNameInputBox, firstName);
      await this.typeInto( await this.lastNameInputBox, lastName);
      await this.click( await this.searchButton);
      browser.pause(1000)
      let isNotDisplayed= await this.noResultMessage.isDisplayed()
      if(!isNotDisplayed) nameNotExists=true
    } catch (err) {
      err.message = `Failed searching given firstName ${firstName} and lastName ${lastName} on customer page,${err.message}`;
      throw err;
    }
    return nameNotExists
  }

  
}

export default new CustList();
