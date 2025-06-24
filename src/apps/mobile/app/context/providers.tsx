"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StyledComponentsRegistry from "./styled";
import React, { useEffect, useState } from "react";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../stores/msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeMsal = async () => {
      await msalInstance.initialize();
      setIsInitialized(true);
    };
    initializeMsal();
  }, []);

  if (!isInitialized) return null;

  return (
    <StyledComponentsRegistry>
      <MsalProvider instance={msalInstance}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MsalProvider>
    </StyledComponentsRegistry>
  );
}
