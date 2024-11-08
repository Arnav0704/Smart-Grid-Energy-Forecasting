"use client"

import React, { useState, useEffect } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Area } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Zap } from "lucide-react"

function Dashboard({ data, prediction }) {
  const parsedObject = JSON.parse(data)
  const parsedPrediction = JSON.parse(prediction)
  const [activeTab, setActiveTab] = useState("actual")
  const [animateChart, setAnimateChart] = useState(false)

  useEffect(() => {
    setAnimateChart(true)
  }, [activeTab])

  const getChartData = () => ((activeTab === "actual" && parsedObject && parsedPrediction) ? parsedObject : parsedPrediction)

  const calculateTrend = () => {
    const chartData = getChartData()
    const lastTwoValues = chartData.slice(-2).map(item => item.Energy_values)
    return lastTwoValues[1] > lastTwoValues[0] ? "up" : "down"
  }

  const trend = calculateTrend()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dark shadow-2xl chart-wrapper bg-[#0d0f14] rounded-lg w-full pt-4 p-6 mt-2"
    >
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-4xl font-bold text-[#fff]">Plant Energy Data</CardTitle>
            <CardDescription className="text-[#fff]/50 mt-2">
              {activeTab === "actual" ? "Historical" : "Predicted"} energy values over time
            </CardDescription>
          </div>
          <CardTitle className="text-2xl flex items-center font-bold text-[#fff]">
              <Zap className="mr-2 h-6 w-6" /> Energy Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-semibold text-[#fff]/90">
              {getChartData().length} <span className="text-sm text-[#fff]/90">days</span>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex w-[400px] justify-end">
            <TabsList className="bg-[#fff]/50">
              <TabsTrigger value="actual" className="text-black data-[state=active]:text-black data-[state=active]:bg-[#fff] font-bold">
                Actual Data
              </TabsTrigger>
              <TabsTrigger value="prediction" className="data-[state=active]:text-black data-[state=active]:bg-[#fff] text-black font-bold">
                Prediction
              </TabsTrigger>
            </TabsList>
          </Tabs>
          </div>
          <div className="h-[400px]">
            <ChartContainer className="w-full h-full"
              config={{
                resting: {
                  label: "Resting",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer>
                <LineChart data={getChartData()} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#39ff14" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#39ff14" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis
                    dataKey="Date"
                    stroke="#2af598"
                    angle={-30}
                    tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  />
                  <YAxis stroke="#2af598"
                      domain={["dataMin - 1", "dataMax + 1"]} 
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        labelFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      />
                    }
                  />
                  <Area
                    type="bump"
                    dataKey="Energy_values"
                    stroke="#39ff14"
                    fillOpacity={1}
                    fill="url(#colorEnergy)"
                  />
                  <Line
                    type="bump"
                    dataKey="Energy_values"
                    stroke="#39ff14"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex justify-between items-center"
          >
            <div className="flex items-center">
              {trend === "up" ? (
                <ArrowUpRight className="text-green-400 mr-2" />
              ) : (
                <ArrowDownRight className="text-red-400 mr-2" />
              )}
              <span className={`text-lg font-semibold ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
                {trend === "up" ? "Upward Trend" : "Downward Trend"}
              </span>
            </div>
            <div className="text-[#fff]/60">
              Last updated: {new Date(getChartData()[getChartData().length - 1].Date).toLocaleString()}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Dashboard