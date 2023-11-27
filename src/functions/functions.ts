/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* global clearInterval, console, CustomFunctions, setInterval */
import { LoginRequest, LoginResponse } from "./reqres";

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
 * Custom function that sends a login request to the named pipe server and waits for a response.
 * @customfunction LOGIN
 * @param username User's username
 * @param password User's password
 * @returns number representing http status response of auth request
 */
export async function login(username: string, password: string,) {
  let request: LoginRequest = 
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
  let loginResponse: LoginResponse = await response.json();
  console.log(loginResponse.status)
  //invocation.setResult(String(loginResponse.status));
  return loginResponse.status;
}