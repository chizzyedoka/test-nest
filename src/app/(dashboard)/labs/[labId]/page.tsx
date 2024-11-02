import { decodeJWT } from "@/app/actions/login";
import { redirect } from "next/navigation";
import { Dashboard } from "@/components/app-dashboard-page";

export default async function LabPage({
  params,
}: {
  params: { labId: string };
}) {
  const isAuth = await decodeJWT();
  console.log(isAuth);

  if (!isAuth.isAuthenticated) {
    return redirect("/");
  }
  return <Dashboard labId={params.labId} />;
}
