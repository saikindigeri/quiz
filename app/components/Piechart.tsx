"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { browser: "CMA IND", browserer: "India", visitors: 21.5, fill: "#FFA500" },   // Orange
    { browser: "CA", browserer: "Canada", visitors: 22.5, fill: "#FF8C00" },       // Dark Orange
    { browser: "CS", browserer: "Spain", visitors: 16, fill: "#FF7F50" },         // Coral
    { browser: "ACCA", browserer: "USA", visitors: 25, fill: "#FF6347" },       // Tomato
    { browser: "CMA USA", browserer: "USA", visitors: 16.7, fill: "#FF4500" },  // Orange Red
  ];
  
  
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function Piechart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
   
       
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square  pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
     
    </Card>
  )
}
