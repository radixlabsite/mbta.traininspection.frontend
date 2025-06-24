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


//1. FEZ LOGIN
//2. SE SUCESSO
//3. PEGA TOKE
//4. REDIRECIONA PARA A PÁGINA DE INÍCIO
//5. SABER QUAL USUÁRIO ESTÁ LOGADO'
//6. ONDE ESTÁ SENDO SALVO AS INFORMAÇÕES DO USUÁRIO?
//7. ONDE E COMO ESTÁ SENDO SALVO OS DADOS DO USUÁRIO?
//8. VALIDAR O CARDO DO USER, E SE USUÁRIO ESTÁ HABILITADO A ACESSAR ESSA ROTA?
