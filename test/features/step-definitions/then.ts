import {Then} from "@wdio/cucumber-framework";
import { expect } from "chai";
import reporter from "../../helper/reporter.ts";
import fs from "fs";
import nopCommerceCustListPage from "../../page-objects/nocommerce.custlist.page.ts"


Then(/^Inventory page should list (.*)$/,async(noOfProducts)=>{
if(!noOfProducts) throw Error(`Invalid number is provided : ${noOfProducts}`)
    console.log(`>> app id: ${this.aapId}`);
console.log(`>> Starting test id : ${this.testId}`);
 let eleArr =await $$(`.inventory_item_name `)
 expect(eleArr.length).to.equal(parseInt(noOfProducts)); //====
 
})

/**
 * Steps:
 * 1.Get the price
 * 2.Convert string to number
 * 3.Assert if the value is <=0
 */
Then(/^Validate all products have valid price$/,async()=>{
    
    let priceArr = await $$(`.ninventory_item_price`)
    let priceStringArr =[]
    for (let i = 0; i < await priceArr.length; i++) {
        let ele = await priceArr[i].getText();
        priceStringArr.push(+(ele.replace("$","")))
        expect(+(ele.replace("$",""))).to.greaterThan(0)
    }
    console.log(`>> prices are in $: ${priceStringArr}`);
    /**Convert string to number */
   //let priceNums = priceStringArr.map(ele => parseInt(ele.replace("$","")))
   // console.log(`>> prices are in num: ${priceNums}`);

   let invalidPriceArr =priceStringArr.filter(ele=>ele<=0);
   expect(invalidPriceArr.length).to.equal(1);


})

Then(/^Inventory page should (.*)\s?list (.*)$/,async(negativeCheck, noOfProducts)=>{
    console.log(`>> values ${negativeCheck} >> ${noOfProducts}`);
})


Then(/^Verify if all the users exists in customer list$/,async()=>{
    //navigatet to the customer search page from left menu
    //@ts-ignore
    try {
        await browser.url(`${browser.options.nopCommerceBaseURL}/Admin/Customer/List}`)
        reporter.addStep(this.testid,"info",`Navigate to the customer list page`)
        //Read API response from /data  folder
         let fileName=`${process.cwd()}/data/APIReponse/reqresAPIUsers.json`
         //we can have a file handler in helper folder for all file operations
        let data = fs.readFileSync(fileName,"utf8")
        let dataObj = JSON.parse(data)
        console.log(`API data :${JSON.stringify(dataObj)}`);
        let dataArr=[]
        //for each(traverse) user object in API object
        for (let i = 0; i < dataObj.data.length; i++) {
            let obj={}
            let firstName=dataObj.data[i].firstName
            let lastName = dataObj.data[i].lastName
            let custNotFound =await nopCommerceCustListPage.searchNameAndConfirm(this.testid,firstName,lastName)
            if(custNotFound)
            {
                obj["firstName"]=firstName
                obj["lastName"]=lastName
                dataArr.push(obj)
            } 
        }
        //in case the user does not exists write it to  error file
        if(dataArr.length>1)
        {
            let data = JSON.stringify(dataArr,undefined,4  )
            let errorFileName=`${process.cwd()}/results/custNotFoundList.json`
            fs.writeFileSync(errorFileName,data)
        }
    } catch (err) {
        err.message=`${this.testid}:Failed when checking users in the nopcommerce site,${err.message}`
        throw err
    }

})