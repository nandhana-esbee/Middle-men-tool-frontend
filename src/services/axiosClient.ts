import axios, { AxiosError } from "axios";

/**
 * Single shared axios instance. Base URL comes from the environment so it
 * can be repointed (staging/prod/local) without touching code — see
 * .env.example.
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

/** Pulls a human-readable message out of a FastAPI-style error payload. */
function extractMessage(error: AxiosError): string {
  const data = error.response?.data as
    | { detail?: string | { msg: string }[]; message?: string }
    | undefined;

  if (data?.detail) {
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail) && data.detail[0]?.msg) {
      return data.detail.map((d) => d.msg).join("; ");
    }
  }
  if (data?.message) return data.message;
  if (error.response?.status === 404) return "Not found.";
  if (error.code === "ECONNABORTED") return "The request timed out. Please try again.";
  if (!error.response) return "Could not reach the server. Check your connection.";
  return error.message || "Something went wrong. Please try again.";
}

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(new Error(extractMessage(error))),
);

export default axiosClient;
