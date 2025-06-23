"use client";
import { useMsal } from "@azure/msal-react";
import useAuthStore from "./auth.store";

export function useMsalAuth() {
  const { setIsLoading, setAuthData, resetAuth } = useAuthStore();
  const { instance } = useMsal();

  const login = async () => {
    try {
      setIsLoading(true);

      // Login apenas com scopes padrão
      const loginResponse = await instance.loginPopup({
        scopes: ["openid", "profile", "offline_access"],
        prompt: "select_account",
      });

      instance.setActiveAccount(loginResponse.account);

      const claims = loginResponse.idTokenClaims as any;
      const groups = claims.groups ?? [];

      // Token para o backend
      const backendToken = (
        await instance.acquireTokenSilent({
          scopes: [process.env.NEXT_PUBLIC_ENTRA_SCOPE_BACKEND!],
        })
      ).accessToken;

      // Token para o Graph
      const graphToken = (
        await instance.acquireTokenSilent({
          scopes: ["User.Read", "GroupMember.Read.All"],
        })
      ).accessToken;

      console.log("Backend Token -->", backendToken);
      console.log("Graph Token -->", graphToken);

      setAuthData({
        isAuthenticated: true,
        authToken: backendToken,
        userGroups: groups,
        username:
          claims.preferred_username ?? claims.name ?? claims.upn ?? null,
        userId: claims.sub ?? null,
      });

      // Buscar os grupos pelo Graph
      const graphResponse = await fetch(
        "https://graph.microsoft.com/v1.0/me/memberOf",
        { headers: { Authorization: `Bearer ${graphToken}` } }
      );
      const graphData = await graphResponse.json();
      console.log("Graph grupos --->", graphData);
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
