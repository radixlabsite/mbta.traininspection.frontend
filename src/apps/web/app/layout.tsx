"use client";
import { Inter } from "next/font/google";
import Providers from "./context/providers";
import { MainContainer } from "@repo/ui/components";
import { usePathname } from "next/navigation";
import { ScreenNames } from "@repo/constants/screens";
import { useEffect, useRef } from "react";
import HeaderWrapper from "./auth/HeaderWrapper";
import { useMsalAuth } from "./stores/useMsalAuth";
import AuthInitializer from "./auth/AuthInitializer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const didLogIn = useRef<boolean>(false);
  const { login } = useMsalAuth();

  // Hook personalizado que dispara o login no Entra ID quando o app é carregado
  // Isso garante que o token JWT será obtido automaticamente no início
  useEffect(() => {
    if (didLogIn.current) return;

    didLogIn.current = true;
    login();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <Providers>
          <AuthInitializer />
          {/* Renderiza o HeaderWrapper somente se o usuário não estiver na tela de login
          HeaderWrapper pode conter lógica de exibição condicional com base em grupos ou localização */}
          {pathname !== ScreenNames.login && <HeaderWrapper />}

          {/* Define se o container principal deve reservar espaço para o header (layout responsivo) */}
          <MainContainer hasHeader={pathname !== ScreenNames.login}>
            {children}
          </MainContainer>
        </Providers>
      </body>
    </html>
  );
}
