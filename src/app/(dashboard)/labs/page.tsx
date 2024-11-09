import { decodeJWT, isLoggedIn } from "@/app/actions/login";
import { LabsPage } from "@/components/labs-page";
import { redirect } from "next/navigation";

export default async function LabsIndexPage() {
  const isAuth = await decodeJWT();
  const isLogin = await isLoggedIn();
  if (!isAuth.isAuthenticated) {
    return redirect("/");
  }

  return <LabsPage isLogin={isLogin} />;
}
