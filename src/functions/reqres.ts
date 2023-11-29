// Name: reqres.ts
// Description: types from reqres.rs for use in the addin,
// Note: these MUST be in parity with reqres.rs

// login()
export interface LoginRequest {
  type: "Login";
  username: string;
  password: string;
}

export interface LoginResponse {
  type: "Login";
  status: number;
}

// query()
export interface QueryRequest {
  type: "Query";
  id: string;
  args: string[];
}

export interface QueryResponse {
  type: "Query";
  status: number;
  result: string;
}

//get_query_prompts()
export interface GetQueryPromptsRequest {
  type: "GetQueryPrompts";
  id: string;
}

export interface GetQueryPromptsResponse {
  type: "GetQueryPrompts";
  status: number;
  prompts: string[];
}
