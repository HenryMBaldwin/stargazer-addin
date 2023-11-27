// reqres.ts
// types from reqres.rs for use in the addin, these MUST be in parity with reqres.rs

// Login request type
export interface LoginRequest {
  type: "Login";
  username: string;
  password: string;
}

// Login response type
export interface LoginResponse {
  type: "Login";
  status: number;
}
