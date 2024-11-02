import { FoodBotJailbreakLabComponent } from "@/components/food-bot-jailbreak-lab";
import { redirect } from "next/navigation";
import { decodeJWT } from "@/app/actions/login";

const LabPage = async () => {
  const isAuth = await decodeJWT();

  if (!isAuth.isAuthenticated) {
    return redirect("/");
  }
  return <FoodBotJailbreakLabComponent />;
};

export default LabPage;
