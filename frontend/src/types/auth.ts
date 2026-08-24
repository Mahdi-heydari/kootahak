export interface AuthUser {
    id: number;
    email: string;
    name: string;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    message: string;
    data: AuthUser;
  }