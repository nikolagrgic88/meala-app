import axios from "axios";

import { useAuthStore } from "../store/authStore";
import { API_BASE_URL } from "./apiConfig";
import { ApiError } from "./apiError";

type ApiErrorResponse = {
  message?: string;
  title?: string;
  errors?: Record<string, string[]>;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,

  (error: unknown) => {
    if (!axios.isAxiosError<ApiErrorResponse>(error)) {
      return Promise.reject(new ApiError("An unexpected error occurred."));
    }

    if (error.code === "ERR_NETWORK") {
      return Promise.reject(new ApiError("Unable to connect to the backend. Make sure the API is running."));
    }

    if (error.code === "ECONNABORTED") {
      return Promise.reject(new ApiError("The request took too long. Please try again."));
    }

    const status = error.response?.status;
    const responseData = error.response?.data;

    let message = responseData?.message ?? responseData?.title ?? "Something went wrong.";

    if (responseData?.errors) {
      const firstValidationMessage = Object.values(responseData.errors)
        .flat()
        .find((validationMessage) => typeof validationMessage === "string");

      if (firstValidationMessage) {
        message = firstValidationMessage;
      }
    }

    return Promise.reject(new ApiError(message, status, responseData?.errors));
  },
);

export default apiClient;
