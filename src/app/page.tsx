import { LabsPage } from "@/components/labs-page";
import { isLoggedIn } from "./actions/login";

export default async function Home() {
  const isLogin = await isLoggedIn();
  return <LabsPage isLogin={isLogin} />;
}
