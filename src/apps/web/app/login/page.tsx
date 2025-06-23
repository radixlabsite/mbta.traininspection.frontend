"use client";
import { MainButton, Loader } from "@repo/ui/components";
import { Container, ButtonContainer, AppTitle } from "./styles";
import Image from "next/image";
import messages from "@repo/constants/messages";
import useLogin from "./hooks";
import { ComponentSizes } from "@repo/constants/constants";
import useAuthStore from "../stores/auth.store";

export default function Login() {
  const login = useLogin();
  const { isLoading, isAppLoading } = useAuthStore();

  // Verifica se o app ou a autenticação estão em carregamento
  // Isso cobre tanto a fase de inicialização do MSAL quanto requisições silenciosas de token
  const isPageLoading = isLoading || isAppLoading;

  return (
    <Container>
      {/* Mostra loader durante o carregamento do estado de login ou MSAL */}
      {isPageLoading ? (
        <Loader loading={true} />
      ) : (
        <>
          <Image
            src={`/assets/logo_mbta_white.png`}
            alt={"img"}
            width="80"
            height="80"
          />
          <AppTitle>{messages.Labels.appName}</AppTitle>

          <ButtonContainer>
            <MainButton
              text={messages.Labels.signIn}
              onClick={() => {
                login.handleLoginClick();
              }}
              size={ComponentSizes.full}
              invertedColors={true}
            />
          </ButtonContainer>
        </>
      )}
    </Container>
  );
}
