import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_ENTRA_CLIENT_ID!,
    authority: process.env.NEXT_PUBLIC_ENTRA_AUTHORITY!,
    redirectUri: process.env.NEXT_PUBLIC_ENTRA_REDIRECT_URI!,
    postLogoutRedirectUri: "/login",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};
