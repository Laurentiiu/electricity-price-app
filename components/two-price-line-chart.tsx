'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

/**
 * Interface for the properties of the TwoPriceLineChart component.
 */
interface TwoPriceLineChartProps {
  values: number[];
  times: number[];
  valuesSecondary?: number[];
  firstBiddingZone: string;
  secondBiddingZone: string;
}

/**
 * Configuration object for the chart, specifying labels and colors.
 */
const chartConfig = {
  price: {
    label: 'firstBiddingZone',
    color: 'hsl(var(--chart-1))',
  },
  priceSecondary: {
    label: 'secondBiddingZone',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

/**
 * TwoPriceLineChart component renders a line chart with primary and optional secondary prices.
 *
 * @param {TwoPriceLineChartProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered line chart component.
 */
export const TwoPriceLineChart = ({
  firstBiddingZone,
  secondBiddingZone,
  values,
  times,
  valuesSecondary,
}: TwoPriceLineChartProps): JSX.Element => {
  // State to hold the chart data
  const [chartData, setChartData] = useState(
    values.map((value, index) => {
      const date = times[index] ? new Date(times[index] * 1000) : new Date();
      const timeStr = `${format(date, 'HH')}:00`;

      if (valuesSecondary) {
        return {
          date: timeStr,
          price: value,
          priceSecondary: valuesSecondary[index],
        };
      }

      return {
        date: timeStr,
        price: value,
      };
    }),
  );

  // Effect to update chart data when valuesSecondary changes
  useEffect(() => {
    if (!valuesSecondary) return;

    setChartData(
      values.map((value, index) => {
        const date = times[index] ? new Date(times[index] * 1000) : new Date();
        const timeStr = `${format(date, 'HH')}:00`;
        const secondZonePrice = valuesSecondary[index];

        return {
          date: timeStr,
          price: value,
          priceSecondary: secondZonePrice,
        };
      }),
    );
  }, [times, values, valuesSecondary]);

  // Render the chart
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="date"
          tickLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          content={<ChartTooltipContent />}
          cursor={false}
          formatter={(_itemvalue, itemname, _item, _index, itemPayload) => {
            const zone =
              itemname === 'price' ? firstBiddingZone : secondBiddingZone;
            /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- item payload contains price */
            const priceStr: string | undefined =
              itemname === 'price'
                ? /* @ts-expect-error -- item payload contains price */
                  itemPayload.price
                : /* @ts-expect-error -- item payload contains price */
                  itemPayload.priceSecondary;

            return `${zone}: €${priceStr ?? 'N/A'}`;
          }}
        />
        <Line
          dataKey="price"
          dot={false}
          stroke="green"
          strokeWidth={4}
          type="monotone"
        />
        <Line
          dataKey="priceSecondary"
          dot={false}
          stroke="blue"
          strokeWidth={2}
          type="monotone"
        />
      </LineChart>
    </ChartContainer>
  );
};
