export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  first_name: string;
  last_name: string;
  email: string;
  token: string;
}

export interface CreateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
