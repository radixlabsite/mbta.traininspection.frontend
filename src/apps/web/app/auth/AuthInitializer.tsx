"use client";
import { useEffect, useRef } from "react";
import { useMsalAuth } from "../stores/useMsalAuth";

export default function AuthInitializer() {
  const didLogIn = useRef(false);
  const { login } = useMsalAuth();

  useEffect(() => {
    if (didLogIn.current) return;
    didLogIn.current = true;

    login();
  }, []);

  return null;
}
