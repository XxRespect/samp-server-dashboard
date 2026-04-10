"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A donut chart with text"
import { getData } from '@/app/modules/home/assets/service'
import { useQuery } from '@tanstack/react-query'





function ChartPieDonutText() {
  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: () => getData(),
  })

  const chartData = [
    { Device: "PC", players: data?.totalPcPlayers || 0, fill: "#3b82f6" },
    { Device: "Mobile", players: data?.totalMobiles || 0, fill: "#10b981" },
    { Device: "Outros", players: data?.totalOthers || 0, fill: "#f97316" },

  ]

  const chartConfig = {
    players: {
      label: "Players",
    },
    PC: {
      label: "PC",
      color: "#3b82f6",
    },
    Mobile: {
      label: "Mobile",
      color: "#10b981",
    },
    Outros: {
      label: "Outros",
      color: "#f97316",
    },

  } satisfies ChartConfig

  const totalPlayers = (data?.totalPcPlayers || 0) + (data?.totalMobiles || 0) + (data?.totalOthers || 0)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Players Device</CardTitle>
        <CardDescription>Current data</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          id="recently-joined-chart"
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="players"
              nameKey="Device"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {new Intl.NumberFormat('pt-BR').format(totalPlayers)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Players
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Showing total players by device <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Current data
        </div>
      </CardFooter>
    </Card>
  )
}

export default ChartPieDonutText
