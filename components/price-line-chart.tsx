'use client';

import { format } from 'date-fns';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface PriceLineChartProps {
  values: number[];
  times: number[];
}

const chartConfig = {
  desktop: {
    label: 'Price',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

/**
 * Renders a line chart component to display price data.
 *
 * @component
 * @param {PriceLineChartProps} props - The props for the PriceLineChart component.
 * @param {number[]} props.values - The array of price values.
 * @param {number[]} props.times - The array of timestamp values.
 * @returns {JSX.Element} The rendered PriceLineChart component.
 */
export const PriceLineChart = ({
  values,
  times,
}: PriceLineChartProps): JSX.Element => {
  const chartData = values.map((value, index) => {
    const date = times[index] ? new Date(times[index] * 1000) : new Date();
    const timeStr = `${format(date, 'HH')}:00`;

    return {
      date: timeStr,
      price: value,
    };
  });

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
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
          formatter={(_itemvalue, _itemname, _item, _index, itemPayload) => {
            /* @ts-expect-error -- item payload contains date */ /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- item payload contains date */
            const dateStr: string | undefined = itemPayload.date;
            /* @ts-expect-error -- item payload contains price */ /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- item payload contains price */
            const priceStr: string | undefined = itemPayload.price;

            return `${dateStr ?? 'N/A'}: €${priceStr ?? 'N/A'}`;
          }}
        />
        <Line
          dataKey="price"
          dot={false}
          stroke="var(--color-desktop)"
          strokeWidth={2}
          type="natural"
        />
      </LineChart>
    </ChartContainer>
  );
};
