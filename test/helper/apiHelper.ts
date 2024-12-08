import request from "supertest"
import reporter from "../helper/reporter.ts"

//what is request
console.log(`Type of request ${typeof request}`); //function

console.log(`no of arguments ${request.length}`);//1 argument is required

async function GET(testId:string,baseURL:string,endpoint:string,auth:string,queryParam:object) {
    if(!baseURL || !endpoint){
        throw Error(`Given baseurl or endpoint not valid ${baseURL} or ${endpoint}`)
    }
    baseURL=baseURL.trim();
    endpoint = endpoint.trim()
    reporter.addStep(testId,"info",`making a GET call to ${endpoint}`)
   try {
       return  await request(baseURL)
        .get(endpoint)
        .query(queryParam)
        .auth(auth,{type:'bearer'})
        .set("Content-Type","application/json")
        .set("Accept","application/json")
        
   } catch (err) {
       err.message=`Error making a GET call to the API ${endpoint},${err}`
       throw err
   }
  
}

async function POST(testId:string,baseURL:string,endpoint:string,auth:string,payload:object) {
    if(!baseURL || !endpoint){
        throw Error(`Given baseurl or endpoint not valid ${baseURL} or ${endpoint}`)
    }
    baseURL= baseURL.trim();
    endpoint = endpoint.trim()
    reporter.addStep(testId,"info",`making a POST call to ${endpoint}`)
   try {
       return  await request(baseURL)
        .post(endpoint)
        .auth(auth,{type:'bearer'})
        .set("Content-Type","application/json")
        .set("Accept","application/json")
        .send(payload)
        
   } catch (err) {
       err.message=`Error making a POST call to the API ${endpoint},${err}`
       throw err
   }
  
}
export default{GET,POST}
/**
 * https://reqres.in/
 * api/users?page=2
 */