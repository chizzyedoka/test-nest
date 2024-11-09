import { SettingsPageComponent } from "@/components/settings-page";
import React from "react";

import { redirect } from "next/navigation";
import { decodeJWT } from "@/app/actions/login";

const SettingsPage = async () => {
  const isAuth = await decodeJWT();

  if (!isAuth.isAuthenticated) {
    return redirect("/");
  }
  return <SettingsPageComponent />;
};

export default SettingsPage;
