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
          {pathname !== ScreenNames.login && <HeaderWrapper />}
          <MainContainer hasHeader={pathname !== ScreenNames.login}>
            {children}
          </MainContainer>
        </Providers>
      </body>
    </html>
  );
}
