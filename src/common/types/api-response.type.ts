export interface ApiResponse<T> {
  requestId: string;
  statusCode: number; // HTTP status code
  success: boolean; // true for success, false for errors
  message: string; // human-readable message
  data: T | null; // main payload
  errors: ApiError[] | null; // list of validation or other errors
  timestamp: string; // ISO string of when response was sent
  path?: string; // request URL
  method?: string; // HTTP method
  apiVersion?: string; // optional API version
  duration?: number; // optional response time in ms
  meta?: Record<string, string | number | boolean> | null; // optional extra info, e.g., pagination
}

export interface ApiError {
  field?: string; // optional field name causing the error
  message: string; // error message
  code?: string; // optional error code
}
