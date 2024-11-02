"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";

interface AIInsightsProps {
  labId?: string;
}

export function AIInsights({ labId }: AIInsightsProps) {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["ai-analysis", labId, dateRange],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (dateRange.from) params.set("startDate", dateRange.from.toISOString());
      if (dateRange.to) params.set("endDate", dateRange.to.toISOString());
      if (labId) params.set("labId", labId);

      const response = await fetch(`/api/ai-analysis?${params}`);
      if (!response.ok) throw new Error("Failed to fetch analysis");
      return response.json();
    },
    enabled: false, // Only fetch when user clicks analyze
  });

  return (
    <Card className='w-full'>
      <CardHeader>
        <h3 className='text-lg font-semibold'>AI Insights</h3>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <Calendar
            mode='range'
            selected={{ from: dateRange.from, to: dateRange.to }}
            onSelect={(range: any) => setDateRange(range)}
            className='rounded-md border'
          />

          <Button onClick={() => refetch()} disabled={isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Data"}
          </Button>

          {error && (
            <div className='text-red-500'>Failed to fetch analysis</div>
          )}

          {data?.analysis && (
            <div className='mt-4 prose'>
              <pre className='whitespace-pre-wrap'>{data.analysis}</pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
