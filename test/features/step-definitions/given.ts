import { Given } from "@wdio/cucumber-framework";
import {expect }from "chai"
import reporter from "../../helper/reporter.ts"
import constants from "data/constants.json" assert { type: "json" };
import apiHelper from "../../helper/apiHelper.ts";
import fs from "fs"
Given(/^Login to the inventory web app$/, async()=>{
    reporter.addStep(this.testid,"info","Login to sauce demo")
    console.log(`>>Test User: ${process.env.TEST_USERNAME}`);
    /**Login into the inventory app */
    //@ts-ignore
    //await browser.url(browser.options.sauceDemoUrl);
    await browser.url("https://www.saucedemo.com/");
    console.log(`>> test config values ${JSON.stringify(browser.options)}`);
    //await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
   // await browser.maximizeWindow();
    /*Login*/
    try {
        await $('#user-name').setValue(process.env.TEST_STANDARD_USERNAME);
        await $('#password').setValue(process.env.TEST_STANDARD_PASSWORD);
        await $('#login-button').click();
    } catch (err) {
        console.log(`error in the first login`);
       
        await browser.refresh()
        await browser.pause(5000)
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        await browser.pause(5000)
    }
    //await browser.debug();
    /*await browser.back()
    await browser.pause(5000)
    await browser.forward()
    await browser.pause(5000)
   //Login with another user 
    await browser.pause(5000)
    await browser.reloadSession()
    await browser.url("https://www.saucedemo.com/");
    //await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
   // await browser.maximizeWindow();
    //Login
    await $('#user-name').setValue('problem_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').click();
    await browser.pause(5000) */
    this.aapId="ABC123";
})
//data tables
Given(/^As (a|as) (.*) user I login to the inventory web app$/,async(prefixTxt,userType,dataTables)=>
{
    //Get the testId
    console.log(`>> Given step test id : ${this.testId}`);
    let dataTable = dataTables.hashes()
    console.log(`>>> The type of dt${typeof dataTable}`);//object
    console.log(`>>> The type of dt${dataTable.constructor}`);// function
    console.log(`>> The values are ${JSON.stringify(dataTable)}`);
    console.log(`>> user Type ${prefixTxt}${userType}`);

    await $('#id').setValue(dataTable[0].UserName)


})

/**
 * Get list of users from reqres API
 * Sub-steps:
 * 1.Get payload data 
 * 2.Make get call by using API helper
 * 3.Store results
 */
Given(/^Get list of (.*) from reqres.in$/,async(endpoint)=>{
    if(!endpoint)throw  Error (`Given endpoint is not valid ${endpoint}`)
        /** Get the payload data */
    try {
        reporter.addStep(this.testid,"info",`Getting the payload data for endpoint ${endpoint}`)
        let edpt=""
        if(endpoint.trim().toUpperCase()==="USERS")
        {
            edpt = constants.REQRES.GET_USER
        }
        if(!edpt) throw Error (`Error getting from constants.json :${endpoint}`)
            /**2.Make get call by using API helper */
        let res
        await browser.call(async function(){
            //@ts-ignore
            res = await apiHelper.GET(this.testid,browser.options.reqresBaseUrl,endpoint,"",constants.QUERY_PARAM)  
        })
        //@ts-ignore
        if(res.status!==200) expect.fail(`Failed getting users from :${browser.options.reqresBaseUrl}/${endpoint}`)
        reporter.addStep(this.testid,"debug",`API response received ${JSON.stringify(res.body)}`)
        /** Store the results */
        let data = JSON.stringify(res.body,undefined,4)
        let fileName=`${process.cwd()}/data/APIReponse/reqresAPIUsers.json`
        fs.writeFileSync(fileName,data)
        reporter.addStep(this.testid,"info",`API response from ${endpoint} stored in json`)
    } catch (err) {
        err.message=`${this.testid}:Failed at getting API users from reqres,${err.message}`
    }

})