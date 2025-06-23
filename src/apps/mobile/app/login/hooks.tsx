import { useRouter } from "next/navigation";
import { ScreenNames } from "@repo/constants/screens";
import useAuthStore from "../stores/auth.store";
import { useMsalAuth } from "../stores/useMsalAuth";

export default function useLogin() {
  const router = useRouter();
  const { login } = useMsalAuth();
  const { isLoading, isAuthenticated } = useAuthStore();

  const handleLoginClick = async () => {
    await login();
    router.push(ScreenNames.locationSelection);
  };
  return {
    handleLoginClick,
    isLoading,
    isAuthenticated,
  };
}
