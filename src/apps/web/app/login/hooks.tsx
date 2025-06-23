import { useRouter } from "next/navigation";
import { ScreenNames } from "@repo/constants/screens";
import useAuthStore from "../stores/auth.store";
import { useMsalAuth } from "../stores/useMsalAuth";

export default function useLogin() {
  const router = useRouter();
  const { login } = useMsalAuth();
  const { isLoading, isAuthenticated } = useAuthStore();

  // Hook responsável por encapsular a lógica de login via Entra ID (MSAL)
  // Após login bem-sucedido, o usuário é redirecionado para a seleção de localização
  const handleLoginClick = async () => {
    await login(); // Chama o login com popup usando Entra ID e armazena os dados no Zustand
    router.push(ScreenNames.locationSelection); // Redireciona após autenticação
  };

  return {
    handleLoginClick,
    isLoading,
    isAuthenticated,
  };
}
