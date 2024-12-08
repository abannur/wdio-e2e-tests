import { config as baseConfig } from "../wdio.conf.ts";
console.log("inside test config");  
export const config = Object.assign(baseConfig, {
  //all test env specific key val pairs
  environment: "TEST",
  sauceDemoUrl: "https://www.saucedemo.com",
  reqresBaseUrl:"https://reqres.in",
  nopCommerceBaseURL:"https://admin-demo.nopcommerce.com"
});