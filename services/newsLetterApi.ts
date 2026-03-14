import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper to get token (only client-side)
const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

// The base URL for the newsletter API, which is located under the /api/v1/news-letter path.
const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news-letter`;

const prepareHeaders = (headers: Headers) => {
    const token = getToken();
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    // No need to force Content-Type for this API.
    return headers;
};

export const newsLetterApi = createApi({
    reducerPath: "newsLetterApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders,
    }),
    // Use a tag type to manage caching and invalidation for newsletter data.
    tagTypes: ["NewsLetters"],
    endpoints: (builder) => ({
        // ✅ POST /api/v1/news-letter/subscribe
        subscribeToNewsletter: builder.mutation<any, { email: string }>({
            query: (body) => ({
                url: `/subscribe`,
                method: "POST",
                body,
            }),
            // Invalidate the 'NewsLetters' tag after a new subscription.
            invalidatesTags: ["NewsLetters"],
        }),

        // ✅ GET /api/v1/news-letter/emails
        getAllEmails: builder.query<any, void>({
            query: () => `/emails`,
            // Provide the 'NewsLetters' tag for this query.
            providesTags: ["NewsLetters"],
        }),
    }),
});

// ✅ Export hooks
export const { useSubscribeToNewsletterMutation, useGetAllEmailsQuery } = newsLetterApi;
