"use client";

import {
  Calendar,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  CartesianGrid,
  Line,
  LineChart,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
} from "recharts";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<
    "1day" | "1week" | "1month" | "1year"
  >("1week");

  // Sample data for the charts
  const questionData = {
    "1day": [
      { name: "00:00", value: 10 },
      { name: "04:00", value: 5 },
      { name: "08:00", value: 15 },
      { name: "12:00", value: 25 },
      { name: "16:00", value: 30 },
      { name: "20:00", value: 20 },
    ],
    "1week": [
      { name: "Mon", value: 50 },
      { name: "Tue", value: 80 },
      { name: "Wed", value: 45 },
      { name: "Thu", value: 60 },
      { name: "Fri", value: 75 },
      { name: "Sat", value: 40 },
      { name: "Sun", value: 35 },
    ],
    "1month": [
      { name: "Week 1", value: 200 },
      { name: "Week 2", value: 300 },
      { name: "Week 3", value: 250 },
      { name: "Week 4", value: 400 },
    ],
    "1year": [
      { name: "Jan", value: 1200 },
      { name: "Feb", value: 1400 },
      { name: "Mar", value: 1100 },
      { name: "Apr", value: 1300 },
      { name: "May", value: 1500 },
      { name: "Jun", value: 1700 },
      { name: "Jul", value: 1600 },
      { name: "Aug", value: 1800 },
      { name: "Sep", value: 2000 },
      { name: "Oct", value: 2200 },
      { name: "Nov", value: 2100 },
      { name: "Dec", value: 2400 },
    ],
  };

  const answerData = {
    "1day": [
      { name: "00:00", value: 15 },
      { name: "04:00", value: 8 },
      { name: "08:00", value: 25 },
      { name: "12:00", value: 35 },
      { name: "16:00", value: 40 },
      { name: "20:00", value: 30 },
    ],
    "1week": [
      { name: "Mon", value: 70 },
      { name: "Tue", value: 100 },
      { name: "Wed", value: 65 },
      { name: "Thu", value: 80 },
      { name: "Fri", value: 95 },
      { name: "Sat", value: 60 },
      { name: "Sun", value: 55 },
    ],
    "1month": [
      { name: "Week 1", value: 300 },
      { name: "Week 2", value: 400 },
      { name: "Week 3", value: 350 },
      { name: "Week 4", value: 500 },
    ],
    "1year": [
      { name: "Jan", value: 1800 },
      { name: "Feb", value: 2000 },
      { name: "Mar", value: 1700 },
      { name: "Apr", value: 1900 },
      { name: "May", value: 2100 },
      { name: "Jun", value: 2300 },
      { name: "Jul", value: 2200 },
      { name: "Aug", value: 2400 },
      { name: "Sep", value: 2600 },
      { name: "Oct", value: 2800 },
      { name: "Nov", value: 2700 },
      { name: "Dec", value: 3000 },
    ],
  };

  const userData = {
    "1day": [
      { name: "00:00", value: 2 },
      { name: "04:00", value: 1 },
      { name: "08:00", value: 5 },
      { name: "12:00", value: 8 },
      { name: "16:00", value: 10 },
      { name: "20:00", value: 6 },
    ],
    "1week": [
      { name: "Mon", value: 20 },
      { name: "Tue", value: 25 },
      { name: "Wed", value: 15 },
      { name: "Thu", value: 18 },
      { name: "Fri", value: 22 },
      { name: "Sat", value: 12 },
      { name: "Sun", value: 10 },
    ],
    "1month": [
      { name: "Week 1", value: 80 },
      { name: "Week 2", value: 100 },
      { name: "Week 3", value: 90 },
      { name: "Week 4", value: 120 },
    ],
    "1year": [
      { name: "Jan", value: 500 },
      { name: "Feb", value: 550 },
      { name: "Mar", value: 480 },
      { name: "Apr", value: 520 },
      { name: "May", value: 600 },
      { name: "Jun", value: 650 },
      { name: "Jul", value: 630 },
      { name: "Aug", value: 680 },
      { name: "Sep", value: 720 },
      { name: "Oct", value: 750 },
      { name: "Nov", value: 730 },
      { name: "Dec", value: 800 },
    ],
  };

  // Sample data for the leaderboard
  const topUsers = [
    {
      id: 1,
      name: "JohnDoe",
      reputation: 15420,
      questionsCount: 45,
      answersCount: 230,
    },
    {
      id: 2,
      name: "AliceSmith",
      reputation: 12350,
      questionsCount: 32,
      answersCount: 185,
    },
    {
      id: 3,
      name: "BobJohnson",
      reputation: 10980,
      questionsCount: 28,
      answersCount: 164,
    },
    {
      id: 4,
      name: "EmilyDavis",
      reputation: 9870,
      questionsCount: 36,
      answersCount: 142,
    },
    {
      id: 5,
      name: "MichaelBrown",
      reputation: 8750,
      questionsCount: 24,
      answersCount: 128,
    },
    {
      id: 6,
      name: "SarahWilson",
      reputation: 7630,
      questionsCount: 19,
      answersCount: 115,
    },
    {
      id: 7,
      name: "DavidMiller",
      reputation: 6540,
      questionsCount: 22,
      answersCount: 98,
    },
    {
      id: 8,
      name: "JenniferTaylor",
      reputation: 5980,
      questionsCount: 17,
      answersCount: 87,
    },
    {
      id: 9,
      name: "RichardAnderson",
      reputation: 5420,
      questionsCount: 15,
      answersCount: 76,
    },
    {
      id: 10,
      name: "LisaThomas",
      reputation: 4870,
      questionsCount: 12,
      answersCount: 68,
    },
  ];

  // Chart colors based on the custom color scheme
  const chartColors = {
    questions: "#FF7000", // primary.500
    answers: "#1DA1F2", // accent-blue
    users: "#7B8EC8", // light.500
    javascript: "#FF7000", // primary.500
    python: "#1DA1F2", // accent-blue
    java: "#7B8EC8", // light.500
    csharp: "#858EAD", // light.400
    php: "#DCE3F1", // light.700
    accepted: "#FF7000", // primary.500
    pending: "#858EAD", // light.400
    comments: "#DCE3F1", // light.700
  };

  return (
    <div className="flex min-h-screen flex-col bg-light-900 dark:bg-dark-200">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="font-spaceGrotesk text-2xl font-bold tracking-tight text-dark-100 dark:text-light-900">
            Dashboard
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto gap-1 border-light-700 text-dark-100 hover:bg-primary-100 dark:border-dark-400 dark:text-light-900 dark:hover:bg-dark-400"
                >
                  <Calendar className="size-4" />
                  <span>
                    {timeRange === "1day"
                      ? "Today"
                      : timeRange === "1week"
                        ? "This Week"
                        : timeRange === "1month"
                          ? "This Month"
                          : "This Year"}
                  </span>
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-light-700 bg-light-900 dark:border-dark-400 dark:bg-dark-300"
              >
                <DropdownMenuItem
                  onClick={() => setTimeRange("1day")}
                  className="text-dark-100 focus:bg-primary-100 dark:text-light-900 dark:focus:bg-dark-400"
                >
                  Today
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTimeRange("1week")}
                  className="text-dark-100 focus:bg-primary-100 dark:text-light-900 dark:focus:bg-dark-400"
                >
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTimeRange("1month")}
                  className="text-dark-100 focus:bg-primary-100 dark:text-light-900 dark:focus:bg-dark-400"
                >
                  This Month
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTimeRange("1year")}
                  className="text-dark-100 focus:bg-primary-100 dark:text-light-900 dark:focus:bg-dark-400"
                >
                  This Year
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-light-700 bg-light-900 shadow-light-100 dark:border-dark-400 dark:bg-dark-300 dark:shadow-dark-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-dark-100 dark:text-light-900">
                Total Questions
              </CardTitle>
              <HelpCircle className="size-4 text-light-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dark-100 dark:text-light-900">
                12,345
              </div>
              <p className="text-xs text-light-500">
                +15% from last{" "}
                {timeRange === "1day"
                  ? "day"
                  : timeRange === "1week"
                    ? "week"
                    : timeRange === "1month"
                      ? "month"
                      : "year"}
              </p>
            </CardContent>
          </Card>
          <Card className="border-light-700 bg-light-900 shadow-light-100 dark:border-dark-400 dark:bg-dark-300 dark:shadow-dark-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-dark-100 dark:text-light-900">
                Total Answers
              </CardTitle>
              <MessageSquare className="size-4 text-light-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dark-100 dark:text-light-900">
                34,567
              </div>
              <p className="text-xs text-light-500">
                +23% from last{" "}
                {timeRange === "1day"
                  ? "day"
                  : timeRange === "1week"
                    ? "week"
                    : timeRange === "1month"
                      ? "month"
                      : "year"}
              </p>
            </CardContent>
          </Card>
          <Card className="border-light-700 bg-light-900 shadow-light-100 dark:border-dark-400 dark:bg-dark-300 dark:shadow-dark-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-dark-100 dark:text-light-900">
                Total Users
              </CardTitle>
              <Users className="size-4 text-light-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dark-100 dark:text-light-900">
                8,901
              </div>
              <p className="text-xs text-light-500">
                +8% from last{" "}
                {timeRange === "1day"
                  ? "day"
                  : timeRange === "1week"
                    ? "week"
                    : timeRange === "1month"
                      ? "month"
                      : "year"}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-light-700 bg-light-900 shadow-light-100 dark:border-dark-400 dark:bg-dark-300 dark:shadow-dark-100">
            <CardHeader>
              <CardTitle className="font-spaceGrotesk text-dark-100 dark:text-light-900">
                Growth Metrics
              </CardTitle>
              <CardDescription className="text-light-500">
                View the growth rate of questions, answers, and users over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="questions" className="w-full">
                <TabsList className="mb-4 bg-light-800 dark:bg-dark-400">
                  <TabsTrigger
                    value="questions"
                    className="text-dark-100 data-[state=active]:bg-primary-500 data-[state=active]:text-light-900 dark:text-light-900"
                  >
                    Questions
                  </TabsTrigger>
                  <TabsTrigger
                    value="answers"
                    className="text-dark-100 data-[state=active]:bg-primary-500 data-[state=active]:text-light-900 dark:text-light-900"
                  >
                    Answers
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="text-dark-100 data-[state=active]:bg-primary-500 data-[state=active]:text-light-900 dark:text-light-900"
                  >
                    Users
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="questions">
                  <ChartContainer
                    config={{
                      questions: {
                        label: "Questions",
                        color: chartColors.questions,
                      },
                    }}
                    className="aspect-[4/3]"
                  >
                    <LineChart
                      data={questionData[timeRange]}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#DCE3F1" />
                      <XAxis
                        dataKey="name"
                        stroke="#858EAD"
                        tick={{ fill: "#858EAD" }}
                      />
                      <YAxis stroke="#858EAD" tick={{ fill: "#858EAD" }} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#DCE3F1",
                          color: "#000000",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={chartColors.questions}
                        strokeWidth={2}
                        activeDot={{ r: 8, fill: chartColors.questions }}
                      />
                    </LineChart>
                  </ChartContainer>
                </TabsContent>
                <TabsContent value="answers">
                  <ChartContainer
                    config={{
                      answers: {
                        label: "Answers",
                        color: chartColors.answers,
                      },
                    }}
                    className="aspect-[4/3]"
                  >
                    <LineChart
                      data={answerData[timeRange]}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#DCE3F1" />
                      <XAxis
                        dataKey="name"
                        stroke="#858EAD"
                        tick={{ fill: "#858EAD" }}
                      />
                      <YAxis stroke="#858EAD" tick={{ fill: "#858EAD" }} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#DCE3F1",
                          color: "#000000",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={chartColors.answers}
                        strokeWidth={2}
                        activeDot={{ r: 8, fill: chartColors.answers }}
                      />
                    </LineChart>
                  </ChartContainer>
                </TabsContent>
                <TabsContent value="users">
                  <ChartContainer
                    config={{
                      users: {
                        label: "Users",
                        color: chartColors.users,
                      },
                    }}
                    className="aspect-[4/3]"
                  >
                    <LineChart
                      data={userData[timeRange]}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#DCE3F1" />
                      <XAxis
                        dataKey="name"
                        stroke="#858EAD"
                        tick={{ fill: "#858EAD" }}
                      />
                      <YAxis stroke="#858EAD" tick={{ fill: "#858EAD" }} />
                      <ChartTooltip
                        content={<ChartTooltipContent />}
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#DCE3F1",
                          color: "#000000",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={chartColors.users}
                        strokeWidth={2}
                        activeDot={{ r: 8, fill: chartColors.users }}
                      />
                    </LineChart>
                  </ChartContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="col-span-3 border-light-700 bg-light-900 shadow-light-100 dark:border-dark-400 dark:bg-dark-300 dark:shadow-dark-100">
            <CardHeader>
              <CardTitle className="font-spaceGrotesk text-dark-100 dark:text-light-900">
                Top Users Leaderboard
              </CardTitle>
              <CardDescription className="text-light-500">
                Top 10 users by reputation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <div key={user.id} className="flex items-center gap-4">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary-500 text-light-900">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-dark-100 dark:text-light-900">
                        {user.name}
                      </p>
                      <div className="flex items-center text-xs text-light-500">
                        <span className="font-medium text-dark-100 dark:text-light-900">
                          {user.reputation.toLocaleString()}
                        </span>
                        <span className="mx-1">•</span>
                        <span>{user.questionsCount} questions</span>
                        <span className="mx-1">•</span>
                        <span>{user.answersCount} answers</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="size-4 text-primary-500" />
                      <span className="text-sm font-medium text-dark-100 dark:text-light-900">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-light-700 bg-light-900 shadow-light-100 dark:border-dark-400 dark:bg-dark-300 dark:shadow-dark-100">
            <CardHeader>
              <CardTitle className="font-spaceGrotesk text-dark-100 dark:text-light-900">
                Questions by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  javascript: {
                    label: "JavaScript",
                    color: chartColors.javascript,
                  },
                  python: {
                    label: "Python",
                    color: chartColors.python,
                  },
                  java: {
                    label: "Java",
                    color: chartColors.java,
                  },
                  csharp: {
                    label: "C#",
                    color: chartColors.csharp,
                  },
                  php: {
                    label: "PHP",
                    color: chartColors.php,
                  },
                }}
                className="aspect-[4/3]"
              >
                <RechartsBarChart
                  data={[
                    { name: "JavaScript", javascript: 1200 },
                    { name: "Python", python: 900 },
                    { name: "Java", java: 800 },
                    { name: "C#", csharp: 600 },
                    { name: "PHP", php: 400 },
                  ]}
                  margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#DCE3F1" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    stroke="#858EAD"
                    tick={{ fill: "#858EAD" }}
                  />
                  <YAxis stroke="#858EAD" tick={{ fill: "#858EAD" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#DCE3F1",
                      color: "#000000",
                    }}
                  />
                  <Bar dataKey="javascript" fill={chartColors.javascript} />
                  <Bar dataKey="python" fill={chartColors.python} />
                  <Bar dataKey="java" fill={chartColors.java} />
                  <Bar dataKey="csharp" fill={chartColors.csharp} />
                  <Bar dataKey="php" fill={chartColors.php} />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="border-light-700 bg-light-900 shadow-light-100 dark:border-dark-400 dark:bg-dark-300 dark:shadow-dark-100">
            <CardHeader>
              <CardTitle className="font-spaceGrotesk text-dark-100 dark:text-light-900">
                Answer Acceptance Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  accepted: {
                    label: "Accepted",
                    color: chartColors.accepted,
                  },
                  pending: {
                    label: "Pending",
                    color: chartColors.pending,
                  },
                }}
                className="aspect-[4/3]"
              >
                <RechartsBarChart
                  data={[
                    { name: "Jan", accepted: 65, pending: 35 },
                    { name: "Feb", accepted: 70, pending: 30 },
                    { name: "Mar", accepted: 60, pending: 40 },
                    { name: "Apr", accepted: 75, pending: 25 },
                    { name: "May", accepted: 80, pending: 20 },
                    { name: "Jun", accepted: 72, pending: 28 },
                  ]}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  stackOffset="expand"
                  layout="vertical"
                >
                  <XAxis
                    type="number"
                    domain={[0, 1]}
                    tickFormatter={(value) => `${value * 100}%`}
                    stroke="#858EAD"
                    tick={{ fill: "#858EAD" }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#858EAD"
                    tick={{ fill: "#858EAD" }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#DCE3F1",
                      color: "#000000",
                    }}
                  />
                  <Bar
                    dataKey="accepted"
                    fill={chartColors.accepted}
                    stackId="stack"
                  />
                  <Bar
                    dataKey="pending"
                    fill={chartColors.pending}
                    stackId="stack"
                  />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="border-light-700 bg-light-900 shadow-light-100 dark:border-dark-400 dark:bg-dark-300 dark:shadow-dark-100">
            <CardHeader>
              <CardTitle className="font-spaceGrotesk text-dark-100 dark:text-light-900">
                User Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  questions: {
                    label: "Questions",
                    color: chartColors.questions,
                  },
                  answers: {
                    label: "Answers",
                    color: chartColors.answers,
                  },
                  comments: {
                    label: "Comments",
                    color: chartColors.comments,
                  },
                }}
                className="aspect-[4/3]"
              >
                <RechartsBarChart
                  data={[
                    { name: "Mon", questions: 20, answers: 45, comments: 30 },
                    { name: "Tue", questions: 25, answers: 50, comments: 35 },
                    { name: "Wed", questions: 22, answers: 48, comments: 32 },
                    { name: "Thu", questions: 30, answers: 60, comments: 40 },
                    { name: "Fri", questions: 28, answers: 55, comments: 38 },
                    { name: "Sat", questions: 15, answers: 30, comments: 25 },
                    { name: "Sun", questions: 12, answers: 25, comments: 20 },
                  ]}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#DCE3F1" />
                  <XAxis
                    dataKey="name"
                    stroke="#858EAD"
                    tick={{ fill: "#858EAD" }}
                  />
                  <YAxis stroke="#858EAD" tick={{ fill: "#858EAD" }} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#DCE3F1",
                      color: "#000000",
                    }}
                  />
                  <Bar dataKey="questions" fill={chartColors.questions} />
                  <Bar dataKey="answers" fill={chartColors.answers} />
                  <Bar dataKey="comments" fill={chartColors.comments} />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
