"use client"

import { ShieldOff , Swords  } from "lucide-react"
import { Bar, BarChart, XAxis, CartesianGrid } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"

const chartData = [
  { date: "2024-07-15", running: 450, swimming: 300 },
  { date: "2024-07-16", running: 380, swimming: 420 },
  { date: "2024-07-17", running: 520, swimming: 120 },
  { date: "2024-07-18", running: 140, swimming: 550 },
  { date: "2024-07-19", running: 600, swimming: 350 },
  { date: "2024-07-20", running: 480, swimming: 400 },
]

const chartConfig = {
  running: {
    label: "Captured",
    color: "var(--chart-1)",
    icon:  Swords,
  },
  swimming: {
    label: "Lost",
    color: "var(--chart-2)",
    icon: ShieldOff,
  },
} satisfies ChartConfig

export function ChartTooltipIcons() {
  return (
    <Card className="h-full w-full shadow-lg shadow-gray-400/10">
      <CardHeader>
        <CardTitle>Clan Territory activiy</CardTitle>
        <CardDescription>Hover the bar for more information</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-70 w-full aspect-auto" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={true}
              tickCount={6}
              tickMargin={10}
              axisLine={false}
             
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }}
            />
            <Bar
              dataKey="running"
              stackId="a"
              fill="var(--color-running)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="swimming"
              stackId="a"
              fill="var(--color-swimming)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
