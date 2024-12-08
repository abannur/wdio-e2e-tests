import { Given } from "@wdio/cucumber-framework";
import chai from "chai";
import reporter from "../../helper/reporter.ts";
import sauceHomePage from "../../page-objects/sauce.home.page.ts";

Given(
  /^As (a|as) (.*) user I login to the inventory web app$/,
  async (prefixTxt, userType, dataTables) => {
    reporter.addstep(this.testId, "info", "Login to sauce demo");
    let dataTable = dataTables.hashes();
    try {
      await sauceHomePage.navigateTo(browser.options.sauceDemoUrl);
      await sauceHomePage.loginToSauceApp(
        this.testId,
        process.env.TEST_STANDARD_USERNAME,
        process.env.TEST_STANDARD_PASSWORD
      );
    } catch (err) {
        err.message=`${this.testId} :Failed to login to saucedemo app ${err.message}`
        throw err
    }
  }
);
