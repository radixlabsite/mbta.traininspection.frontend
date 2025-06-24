"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StyledComponentsRegistry from "./styled";
import React, { useEffect, useState } from "react";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../stores/msalConfig";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  // Inicializa a instância do MSAL para uso em toda a aplicação (contexto global)
  const [msalInstance] = useState(
    () => new PublicClientApplication(msalConfig)
  );

  const [isInitialized, setIsInitialized] = useState(false);

  // Aguarda a inicialização completa do MSAL antes de renderizar a aplicação
  useEffect(() => {
    const initializeMsal = async () => {
      await msalInstance.initialize();
      setIsInitialized(true);
    };
    initializeMsal();
  }, [msalInstance]);

  if (!isInitialized) return null;

  // Fornece contexto do MSAL + React Query + Styled Components para toda a aplicação
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
