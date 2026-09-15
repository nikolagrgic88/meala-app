import apiClient from "./apiClient";
import type { User } from "../models/User";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export type LoginResponse = {
  accessToken: string;
  expiresAt: string;
  user: User;
};

export async function authenticate(request: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/auth/authenticate", request);

  return response.data;
}

export async function registerUser(request: RegisterRequest): Promise<User> {
  const response = await apiClient.post<User>("/auth/register", request);

  return response.data;
}
