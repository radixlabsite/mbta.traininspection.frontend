"use client";
import { useMsal } from "@azure/msal-react";
import useAuthStore from "./auth.store";

const SCOPES = [process.env.NEXT_PUBLIC_ENTRA_SCOPE_BACKEND!];

export function useMsalAuth() {
  const { setIsLoading, setAuthData, resetAuth } = useAuthStore();
  const { instance } = useMsal();

  const login = async () => {
    try {
      setIsLoading(true);

      const loginResponse = await instance.loginPopup({
        scopes: SCOPES,
        prompt: "select_account",
      });

      instance.setActiveAccount(loginResponse.account);

      const claims = loginResponse.idTokenClaims as any;
      const groups = claims.groups ?? [];

      let accessToken = "";
      try {
        const tokenResult = await instance.acquireTokenSilent({
          scopes: SCOPES,
        });
        accessToken = tokenResult.accessToken;
      } catch (err) {
        console.error("Erro ao pegar access token:", err);
      }

      if (!accessToken) {
        throw new Error("Access token could not be acquired.");
      }

      setAuthData({
        isAuthenticated: true,
        authToken: accessToken,
        userGroups: groups,
        username:
          claims.preferred_username ?? claims.name ?? claims.upn ?? null,
        userId: claims.sub ?? null,
        //userLocation: null,
        //userLine: null,
      });
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    resetAuth();
    await instance.logoutRedirect({ postLogoutRedirectUri: "/login" });
  };

  return { login, logout };
}
