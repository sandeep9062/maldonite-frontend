import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://maldonite-server.onrender.com"}/api/v1/careers`;

export const careerApi = createApi({
  reducerPath: "careerApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Careers"],
  endpoints: (builder) => ({
    // GET all active careers (public)
    getCareers: builder.query<any, void>({
      query: () => `/`,
      providesTags: ["Careers"],
    }),

    // GET single career by ID
    getCareerById: builder.query<any, string>({
      query: (id) => `/${id}`,
      providesTags: ["Careers"],
    }),
  }),
});

export const { useGetCareersQuery, useGetCareerByIdQuery } = careerApi;
