import { decodeJWT } from "@/app/actions/login";
import { LabsPageComponent } from "@/components/labs-page2";
import { redirect } from "next/navigation";

export default async function LabsIndexPage() {
  const isAuth = await decodeJWT();

  if (!isAuth.isAuthenticated) {
    return redirect("/");
  }

  return <LabsPageComponent />;
}
