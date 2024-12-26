import { config as baseConfig } from "../wdio.conf.ts";
console.log("inside test config");  
export const config = Object.assign(baseConfig, {
  //all test env specific key val pairs
  environment: "TEST",
  sauceDemoUrl: "https://www.saucedemo.com",
  reqresBaseUrl:"https://reqres.in",
  nopCommerceBaseURL:"https://admin-demo.nopcommerce.com",
  sqlConfig : {
    user: "testuser",
    password: "demo",
    database: "testDBName",
    server: "desktop-server",
    options: {
      encrypt: false, // for azure
      trustServerCertificate: false, // change to true for local dev / self-signed certs
      trustedConnection:true
    },
  }
});