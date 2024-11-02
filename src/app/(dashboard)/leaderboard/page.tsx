import { LeaderboardComponent } from "../../../components/leaderboard";
import { redirect } from "next/navigation";
import { decodeJWT } from "@/app/actions/login";

const LeaderboardPage = async () => {
  const isAuth = await decodeJWT();

  if (!isAuth.isAuthenticated) {
    return redirect("/");
  }
  return <LeaderboardComponent />;
};

export default LeaderboardPage;
