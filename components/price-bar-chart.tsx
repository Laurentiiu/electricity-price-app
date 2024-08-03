"use client";

import { format } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PriceBarChartProps {
  values: number[];
  times: number[];
}

const chartConfig = {
  desktop: {
    label: "Price",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const PriceBarChart = ({ values, times }: PriceBarChartProps) => {
  const chartData = values.map((value, index) => {
    const date = times[index] ? new Date(times[index] * 1000) : new Date();
    const timeStr = `${format(date, "HH")}:00`;

    return {
      date: timeStr, // Date string in format "HH:00"
      price: value, // Price value
    };
  });

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData} // Chart data containing date and price
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="date" // X-axis data key is "date"
          tickLine={false}
          tickMargin={10}
        />
        <ChartTooltip
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
          formatter={(_itemvalue, _itemname, _item, _index, itemPayload) => {
            /* @ts-expect-error -- item payload contains date */ /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- item payload contains date */
            const dateStr: string | undefined = itemPayload.date; // Get the date value from item payload
            /* @ts-expect-error -- item payload contains price */ /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- item payload contains price */
            const priceStr: string | undefined = itemPayload.price; // Get the price value from item payload

            return `${dateStr ?? "N/A"}: €${priceStr ?? "N/A"}`; // Format the tooltip content as "date: €price"
          }}
        />
        <Bar dataKey="price" fill="var(--color-desktop)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
};
