'use client';

import { DashboardHeader } from '@/components/dashboard-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle,
  Clock,
  FileText,
  AlertCircle,
  BarChart as BarChartIcon,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Legend,
} from 'recharts';

const complianceData = [
  { status: 'Compliant', value: 85, fill: 'hsl(var(--chart-1))' },
  { status: 'Non-Compliant', value: 15, fill: 'hsl(var(--destructive))' },
];

const documentUploadData = [
  { month: 'Jan', uploaded: 120, verified: 90 },
  { month: 'Feb', uploaded: 180, verified: 150 },
  { month: 'Mar', uploaded: 160, verified: 140 },
  { month: 'Apr', uploaded: 210, verified: 180 },
  { month: 'May', uploaded: 250, verified: 210 },
  { month: 'Jun', uploaded: 300, verified: 260 },
];

const recentActivity = [
  { id: 1, doc: 'Faculty Achievements Q1', user: 'Dr. Smith', status: 'Verified', date: '2 days ago' },
  { id: 2, doc: 'Curriculum Update 2024', user: 'HOD CompSci', status: 'Pending', date: '5 days ago' },
  { id: 3, doc: 'Annual Report 2023', user: 'Admin Office', status: 'Verified', date: '1 week ago' },
  { id: 4, doc: 'Research Grants Summary', user: 'Dr. Jones', status: 'Rejected', date: '2 weeks ago' },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Dashboard" />
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Compliance
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <Progress value={85} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Documents Verified
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234 / 1,500</div>
              <p className="text-xs text-muted-foreground">
                +150 from last month
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">26</div>
              <p className="text-xs text-muted-foreground">
                5 overdue
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Duplicate files detected
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <Card className="col-span-1 lg:col-span-4 transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Document Upload Trends</CardTitle>
              <CardDescription>Last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                uploaded: {
                  label: "Uploaded",
                  color: "hsl(var(--chart-1))",
                },
                verified: {
                  label: "Verified",
                  color: "hsl(var(--chart-2))",
                },
              }} className="h-[300px] w-full">
                <ResponsiveContainer>
                   <LineChart data={documentUploadData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="uploaded" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="verified" stroke="hsl(var(--accent))" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-1 lg:col-span-3 transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>
                Breakdown of document compliance status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Pie
                      data={complianceData}
                      dataKey="value"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      labelLine={false}
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        percent,
                      }) => {
                        const radius =
                          innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="white"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                          >
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest document submissions and verifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.doc}</TableCell>
                    <TableCell>{activity.user}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          activity.status === 'Verified'
                            ? 'default'
                            : activity.status === 'Pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className={activity.status === 'Verified' ? 'bg-green-500/20 text-green-700 border-green-500/20 hover:bg-green-500/30' : ''}
                      >
                        {activity.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
