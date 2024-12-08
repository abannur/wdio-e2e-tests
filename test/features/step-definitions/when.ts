import { When } from "@wdio/cucumber-framework";
import expect from "chai";
import reporter from "../../helper/reporter.ts"
import nopCommerceHomePage from "../../page-objects/nocommerce.home.page.ts"

When(/^As a (.*) user login to nopcommerce site$/,async(user)=>{
    if(!user) throw Error (`Given user:${user} is not valid`)
        user = user.trim().toUpperCase()
    try {
        reporter.addStep(this.testid,"info","Login to the nop commerce demo site...")
        await nopCommerceHomePage.loginToNopCommerceWeb(this.testid,
            browser.options.nopCommerceBaseURL,
            process.env[`TEST_NOP_${user}_USERNAME`],
            process.env[`TEST_NOP_${user}_PASSWORD]
        )
    } catch (err) {
        err.message=`${this.testid}:Failed at nopcommerce login step,${err.message}`
        throw err
    }


})

When(/^Search (.*) in customer list$/,async(user)
{
    
})