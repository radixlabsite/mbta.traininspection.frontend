"use client";
import { useMsalAuth } from "../stores/useMsalAuth";
import useAuthStore from "../stores/auth.store";
import { useRouter } from "next/navigation";
import { ScreenNames } from "@repo/constants/screens";
import { Header } from "@repo/ui/components";

export default function HeaderWrapper() {
  const { logout } = useMsalAuth();
  const { username } = useAuthStore();
  const router = useRouter();

  const onLogoClick = () => router.push(ScreenNames.locationSelection);

  return (
    <Header
      username={username}
      showUserInfo={true}
      onLogout={logout}
      onLogoClick={onLogoClick}
    />
  );
}
