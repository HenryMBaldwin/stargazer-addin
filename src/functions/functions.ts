/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* global clearInterval, console, CustomFunctions, setInterval */
import * as reqres from "./reqres";

/**
 * Increments a value once a second.
 * @customfunction
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler
 */
export function increment(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * Sends a login request to the http server and returns the response.
 * @customfunction LOGIN
 * @param username User's username
 * @param password User's password
 * @returns number representing http status response of auth request
 */
export async function login(username: string, password: string,) {
  let request: reqres.LoginRequest = 
  {
    type: "Login",
    username,
    password,
  };
  console.log("attempting login");
  // eslint-disable-next-line no-undef
  let response = await fetch("http://localhost:4200/process", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  
  if (!response.ok) {
    console.log("err ${response.status}");
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  console.log("server responded");
  let loginResponse: reqres.LoginResponse = await response.json();
  console.log(loginResponse.status)
  //invocation.setResult(String(loginResponse.status));
  return loginResponse.status;
}

/**
 * Sends a query request to the http server and returns the response.
 * @customfunction QUERY
 * @param id User's username
 * @param {string[]} args User's password
 * @returns {string[][]} spill array representing the return data of of the query or an error message
 */

export async function query(id: string, args: string[]) {
  let request: reqres.QueryRequest = 
  {
    type: "Query",
    id,
    args,
  };
  console.log("attempting query");
  // eslint-disable-next-line no-undef
  let response = await fetch("http://localhost:4200/process", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  
  if (!response.ok) {
    console.log("err ${response.status}");
    //not actually sure what happens on the excel side if an error is thrown
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  console.log("server responded");
  let queryResponse: reqres.QueryResponse = await response.json();
  console.log(queryResponse.status)
  //TODO: convert json response to spill array
  
  const resultArray: string[][] = [];

  const resultJson = JSON.parse(queryResponse.result) as Record<string, string>[];

  if (resultJson.length === 0) {
    return ["Error: Empty query result"];
  }
  try{
    const keys = Object.keys(resultJson[0]);
    
    var keysArray = [];
    for (const key in keys) {
      keysArray.push(key);
    }
    resultArray.push(keysArray);
    for (const entry of resultJson) {
      var valuesArray = [];
        for (const key of keys) {
          valuesArray.push(entry[key]);
        }
      resultArray.push(valuesArray);
    }

    console.table(resultArray);
    return resultArray;
  }  
  catch (error) {
    console.log('Error parsing JSON: ', error);
    return [["error"]];

}
}

/**
 * Sends a get query prompts request to the http server and returnes the response.
 * @customfunction GET_QUERY_PROMPTS
 * @param id User's username
 * @returns {string[][]} number spill array representing the return data of of the query or an error message
 */
export async function get_query_prompts(id: string) {
  let request: reqres.GetQueryPromptsRequest = 
  {
    type: "GetQueryPrompts",
    id,
  };
  console.log("attempting query");
  // eslint-disable-next-line no-undef
  let response = await fetch("http://localhost:4200/process", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  
  if (!response.ok) {
    console.log("err ${response.status}");
    //not actually sure what happens on the excel side if an error is thrown
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  console.log("server responded");
  let queryResponse: reqres.GetQueryPromptsResponse = await response.json();
  console.log(queryResponse.status)
  
  
  try {

      const formattedArray: string[][] = [];
      
      let prompts = queryResponse.prompts;
      let prompts_json = JSON.parse(prompts);
      prompts_json.forEach(pr => {
      //let pr = JSON.parse(prompt);
      formattedArray.push([pr.prompt]);
      formattedArray.push([pr.promptDescription]);
      formattedArray.push(['']);
    });

    return formattedArray;
  }
  catch (error) {
    console.log('Error parsing JSON: ', error);
    return "error";
  }
}