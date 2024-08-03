'use client';

import { format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface PriceBarChartLabeledProps {
  values: number[];
  times: number[];
}

const chartConfig = {
  desktop: {
    label: 'Price',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

/**
 * Renders a labeled price bar chart component.
 *
 * @component
 * @param {PriceBarChartLabeledProps} props - The component props.
 * @param {number[]} props.values - The array of price values.
 * @param {number[]} props.times - The array of timestamp values.
 * @returns {JSX.Element} The rendered component.
 */
export const PriceBarChartLabeled = ({
  values,
  times,
}: PriceBarChartLabeledProps) => {
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
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="date"
          tickLine={false}
          tickMargin={10}
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
        <Bar dataKey="price" fill="var(--color-desktop)" radius={8}>
          <LabelList
            className="hidden fill-foreground text-[8px] sm:block"
            fontSize={12}
            offset={12}
            position="top"
            // @ts-expect-error -- poor ts support
            formatter={(value, _name, _item, _index, _itemPayload) => {
              const valueNum = Number(value);
              if (Number.isNaN(valueNum)) return `N/A`;
              return `€${valueNum.toFixed(2)}`;
            }}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
