// src/services/quoteRequestApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Helper to get token (only client-side)
const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/quote-requests`;

const prepareHeaders = (headers: Headers) => {
  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers; // Don't force Content-Type (important for FormData)
};

export const quoteRequestApi = createApi({
  reducerPath: "quoteRequestApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  tagTypes: ["QuoteRequests"],
  endpoints: (builder) => ({
    // ✅ GET all quote requests
    getQuoteRequests: builder.query<any, void>({
      query: () => ``,
      providesTags: ["QuoteRequests"],
    }),

    // ✅ GET single quote request by ID
    getQuoteRequestById: builder.query<any, string>({
      query: (id) => `/${id}`,
      providesTags: ["QuoteRequests"],
    }),

    // ✅ POST new quote request (supports JSON or FormData)
    addQuoteRequest: builder.mutation<any, any>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
      invalidatesTags: ["QuoteRequests"],
    }),

    // ✅ UPDATE quote request
    updateQuoteRequest: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["QuoteRequests"],
    }),

    // ✅ DELETE quote request
    deleteQuoteRequest: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["QuoteRequests"],
    }),
  }),
});

// ✅ Export hooks
export const {
  useGetQuoteRequestsQuery,
  useGetQuoteRequestByIdQuery,
  useAddQuoteRequestMutation,
  useUpdateQuoteRequestMutation,
  useDeleteQuoteRequestMutation,
} = quoteRequestApi;
