import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper to get token (only client-side)
const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Correctly prepare headers for both JSON and FormData requests
const prepareHeaders = (headers: Headers, { getState, endpoint, extra, type, forced }: any) => {
  const token = getToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // ✅ Important: This check allows the browser to correctly set the Content-Type for FormData.
  if (
    type === "mutation" &&
    (endpoint === "updateSiteSettings" || endpoint === "createSiteSettings")
  ) {
    // If the body is FormData, don't set Content-Type.
    // The browser will handle it automatically.
    // The code you provided doesn't have a body type check, so we will remove the header
    headers.delete("Content-Type");
  } else {
    headers.set("Content-Type", "application/json");
  }

  return headers;
};

export interface SiteSettings {
  _id?: string;
  websiteName: string;
  websiteUrl: string;
  email: string;
  mainOffice: string;
  branchOffice: string;
  googleMapUrl: string;
  googleMapImbededUrl: string;
  contactNo1: string;
  contactNo2: string;
  whatsAppNo: string;
  GSTNO: string;
  accountName: string;
  accountNumber: string;
  IFSCcode: string;
  branch: string;
  logoUrl?: string;
  bannerUrl?: string;
  favicon?: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtubeUrl: string;
  linkedin: string;
  pinterest: string;
  github: string;
  clientsServed: number;
  projectsCompleted: number;
  industriesServed: number;
  aiIntegrations: number;
  countriesReached: number;
  foundedIn: number;
  SAASProducts: number;
  language: string;
  country: string;
}

export const siteSettingsApi = createApi({
  reducerPath: "siteSettingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/site-settings`,
    prepareHeaders,
  }),
  tagTypes: ["SiteSettings"],
  endpoints: (builder) => ({
    getSiteSettings: builder.query<SiteSettings, void>({
      query: () => "/",
      providesTags: ["SiteSettings"],
    }),
    // ✅ Change body type to FormData
    createSiteSettings: builder.mutation<SiteSettings, FormData>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SiteSettings"],
    }),
    // ✅ Change body type to FormData and include the ID
    updateSiteSettings: builder.mutation<
      SiteSettings,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SiteSettings"],
    }),
    deleteSiteSettings: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SiteSettings"],
    }),
  }),
});

export const {
  useGetSiteSettingsQuery,
  useCreateSiteSettingsMutation,
  useUpdateSiteSettingsMutation,
  useDeleteSiteSettingsMutation,
} = siteSettingsApi;
