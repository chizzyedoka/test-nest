"use client";

import { useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";

import Cookies from "js-cookie";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const activeAccount = useActiveAccount();

  console.log("activeAccount", activeAccount);

  useEffect(() => {
    if (!activeAccount) {
      // Cookies.remove("jwt");
      Cookies.remove("auth_token");
    }
  }, [activeAccount]);

  return <>{children}</>;
}
