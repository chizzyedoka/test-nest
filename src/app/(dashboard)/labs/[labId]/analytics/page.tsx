import { AIInsights } from "@/components/analytics/ai-insights";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { decodeJWT } from "@/app/actions/login";

export default async function LabAnalyticsPage({
  params: { labId },
}: {
  params: { labId: string };
}) {
  const isAuth = await decodeJWT();

  if (!isAuth.isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className='container mx-auto py-6'>
      <h2 className='text-2xl font-bold mb-6'>Lab Analytics</h2>
      <Suspense
        fallback={
          <Card className='w-full h-[400px] flex items-center justify-center'>
            Loading analytics...
          </Card>
        }>
        <AIInsights labId={labId} />
      </Suspense>
    </div>
  );
}
