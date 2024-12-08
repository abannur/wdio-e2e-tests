import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "chai";

Given(/^Google page is opened$/, async () => {
  console.log("Test runningggggg");
  await browser.url("https://www.google.com/");
  console.log(await browser.getTitle());
  console.log(await browser.getUrl());
  await browser.pause(7000);
  const button = await $("#L2AGLb");
  expect(await button.isDisplayed()).to.be.true;
  await button.click();
});

When(/^Search with (.*)$/, async (SearchItem: string) => {
  console.log(`>> SearchItem ${SearchItem}`);
  const ele = await $("[name=q]");
  await ele.setValue(SearchItem);
  await browser.keys("Enter");
});

Then(/^Click on first search result$/, async () => {
  const ele = await $(`<h3>`);
  await ele.click();
});

Then(/^Url should match (.*)$/, async (expectedURL: string) => {
  await browser.waitUntil(async()=>
    {return await browser.getTitle()==='WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'},
{timeout: 20000,interval:500,timeoutMsg:`Failed to load WDIO webpage:${await browser.getTitle()}`})
  console.log(`>> expected URL:${expectedURL}`);
  const url = await browser.getUrl();
  console.log(url);
  expect(url).to.equal(expectedURL);
});
/**
 * Web Interactions
 */
Given(/^A web page is opened$/, async () => {
  await browser.url("https://developer.mozilla.org/en-US/docs/Web/JavaScript");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});

When(/^Perform web interactions$/, async () => {
  /**
   * input box
   * Actions:Type into the input box
   * clear the field and type or just add value
   * click and type
   * slow typing
   */

  /*  let input = await $(`[type=number]`)
  await input.click()
  let data="12342"; */
  // await input.moveTo()
  //await input.scrollIntoView()
  // await input.setValue('12345')
  // await input.setValue('1234') // clears the value in the put if dont want to clear use addValue
  /* await browser.pause(3000)
  for(let i=0;i<data.length;i++)
  {
    await browser.pause(1000)
    await browser.keys(data.charAt(i))
  } */

  /**
   * 2.Dropdowns
   * Actions:
   * Assert default option is selected
   * select by attribute,text,index
   * Get a list of options
   */
  //Assert default option is selected
  /*   let value = await $('//select/option[@selected="selected"]').getText();
  expect(value).to.equal("Please select an option");
  
 // select by attribute,text,index
  let ddEle =  await $('#drodown')
  ddEle.selectByVisibleText('Option 2');
  ddEle.selectByAttribute("value","1");
  //Get a list of options
  let option = await $$('select > option')
  let arr=[]
 for(let i=0;i<await option.length;i++)
 {
  let ele = option[i];
  let val = await ele.getText();
  console.log(val)
  arr.push(val)
 }
console.log(`>> options array: ${arr}`) */

  /**
   * 3 Checkbox
   * Actions
   * Select an option
   * Unselect an option(if selected)
   * Assert if the option is selected
   * Select all options
   */

  /*   let checkBox = await $("form > input:nth-of-type(2)");
  if (!(await checkBox.isSelected())) {
    await checkBox.click();
  }
  expect(await checkBox.isSelected()).to.be.true;
  await browser.pause(10000);
  let checkBoxes = await $$("form > input");
  for (let i = 0; i < (await checkBoxes.length); i++) {
    if (!(await checkBoxes[i].isSelected())) {
      await checkBoxes[i].click();
    }
  } */

  /**
   * 4.window handling
   * Actions
   * launch browser
   * open another windows
   * Switch to the window based on title
   * switch back to the main window
   */
  /*  await $('=Click Here').click()
    await $('=Elemental Selenium').click()
    let currentWindowTitle = await browser.getTitle();
    console.log(`>> current window title is : ${currentWindowTitle}`)
    //switch to the specific window
    let windows = await browser.getWindowHandles()
    for (let i = 0; i < windows.length; i++) {
      console.log(`>> windows handles: ${windows[i]}`)
      let text = await browser.getTitle();
      if(text ==="Home | Elemental Selenium")
      {
        await browser.switchToWindow(windows[i]);
        let headerText =await $('<h1>').getText();
        console.log(`>> element text ${headerText}`)
        break;
      }
      browser.switchToWindow
    } */

  /**
   * Handling alerts
   * Methods
   * isAlertOpened();
   * acceptAlert()
   * dismissAlert()
   * getAlertText()
   * sendAlertText()
   */
  /*     await $('button=Click for JS Alert').click()
    if(await browser.isAlertOpen())
    {
     await browser.acceptAlert();
    }
    await browser.pause(2000); 
    await browser.pause(2000);
    await $(`button=Click for JS Prompt`).click()
    if(await browser.isAlertOpen())
      {
        let alertString = await browser.getAlertText()
        console.log(`>> alert string ${alertString}`);
        await browser.sendAlertText("hello js alert")
        await browser.acceptAlert();
       await browser.dismissAlert();
       await browser.pause(2000);
      }*/

  /**
   * file upload
   */
  /*   console.log(process.cwd());
  await $('#file-upload').addValue(` C:/Users/anita/workspace BDD/wdio-cucumber-e2e-tests/data/fileupload/dummy.txt`)
  await $('#file-submit').click()
  await browser.pause(10000) */
  /**
   * frames
   *
   */

  /* await $('=iFrame').click()
  let frame = await $(`#mce_0_ifr`)
  await browser.switchFrame(frame)
  await $('#tinymce').click()
  //interaction with frames
  await browser.keys(["Meta","A"])
  await browser.pause(1000)
  await browser.keys(["Delete"])
  await $('#tinymce').setValue('Typing into a frame')
  //addvalue -- append the values
  await browser.pause(10000)
  await browser.switchToParentFrame()
  await browser.pause(10000)
 */

  // await $('span=Best Sellers in Sports, Fitness & Outdoors').scrollIntoView();
  //await browser.pause(10000)
  /**
   * web tables
   */
  /** 
  //check row and column counts 
  let rowCount = await $$(`//table[@id='table1']/tbody/tr`).length;
  expect(rowCount).to.equal(4);
  console.log(`>>row count ${rowCount}`);
  let colCount = await $$(`//table[@id='table1']/thead/tr/th`).length;
  expect(colCount).to.equal(6);
  console.log(`>>column count ${colCount}`);
  let arr = [];
  //get the whole table data 
  for(let i =0;i<rowCount;i++)
  {
    let personObj={
      lastName: "",
      firstName:"",
      email:"",
      due:"",
      web:""
    }
    for(let j=0;j<colCount;j++)
    {
      //let cellValue = await $(`//table[@id='table1']/tbody/tr[${i+1}]/td[${j+1}]`).getText();
      let cellValue = await $(`#table1 > tbody > tr:nth-of-type(${i+1}) > td:nth-of-type(${j+1})`).getText();
      console.log(`>> cell values are ${cellValue}`)
      if(j===0) personObj.lastName=cellValue
      if(j===1) personObj.firstName=cellValue
      if(j===2) personObj.email=cellValue
      if(j===3) personObj.due=cellValue
      if(j===4) personObj.web=cellValue
    }
    arr.push(personObj)
  }
  console.log(`>> whole table :${JSON.stringify(arr)}`) 

  // get the whole table data 
  for (let i = 0; i < rowCount; i++) {
    let personObj = {
      lastName: "",
      firstName: "",
      email: "",
      due: "",
      web: "",
    };
    for (let j = 0; j < colCount; j++) {
      //let cellValue = await $(`//table[@id='table1']/tbody/tr[${i+1}]/td[${j+1}]`).getText();
      let cellValue = await $(
        `#table1 > tbody > tr:nth-of-type(${i + 1}) > td:nth-of-type(${j + 1})`
      ).getText();
      console.log(`>> cell values are ${cellValue}`);
      let firstName = await $(
        `#table1 > tbody > tr:nth-of-type(${i + 1}) > td:nth-of-type(2)`
      ).getText();
      if (firstName === "Jason") {
        if (j === 0) personObj.lastName = cellValue;
        if (j === 1) personObj.firstName = cellValue;
        if (j === 2) personObj.email = cellValue;
        if (j === 3) personObj.due = cellValue;
        if (j === 4) personObj.web = cellValue;
      }
    }
    if (personObj.firstName) {
      arr.push(personObj);
    }
  }
  let priceArr = [];
  
  for (let i = 0; i < rowCount; i++) {
    //let cellValue = await $(`//table[@id='table1']/tbody/tr[${i+1}]/td[${j+1}]`).getText();
    let cellValue = await $(`#table1 > tbody > tr:nth-of-type(${i + 1}) > td:nth-of-type(4)`).getText();
    console.log(`>> cell values are ${cellValue}`);
    priceArr.push(cellValue);
  }

  console.log(`>> prices are :${priceArr}`);
  let fnames =[]
  for (let i = 0; i < rowCount; i++) {
    //let cellValue = await $(`//table[@id='table1']/tbody/tr[${i+1}]/td[${j+1}]`).getText();
   // let cellValue = await $(`#table1 > tbody > tr:nth-of-type(${i + 1}) > td:nth-of-type(${j + 1})`).getText();
    let priceValue = await $(`#table1 > tbody > tr:nth-of-type(${i + 1}) > td:nth-of-type(4)`).getText();
    let firstName = await $(`#table1 > tbody > tr:nth-of-type(${i + 1}) > td:nth-of-type(2)`).getText();
    if(+(priceValue.replace('$',''))>50)
    {
      fnames.push(firstName);
    }
 
}
console.log(`>> firstname of >$50 ${fnames}`);*/

/**
 * Scrolling 
 * bottom of the visible portion - window.innerHeight (document.body.scrollHeight)
 * window object: scrollby()
 * Invisible portion
 * document.body.scrollTop(scrollHeight)
 */
//scroll down
await browser.execute(()=>{
  window.scrollBy(0,window.innerHeight)
})
await browser.pause(5000)
//scroll up
await browser.execute(()=>{
  window.scrollBy(0,-window.innerHeight)
})

await browser.pause(5000)
//scroll at the bottom of screen
await browser.execute(()=>{
  window.scrollTo(0,document.body.scrollHeight)
})

await browser.pause(5000)
await browser.execute(()=>{
  window.scrollTo(0,document.body.scrollTop)
})

await browser.pause(5000)
});
