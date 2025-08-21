
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
import {
  CheckCircle,
  FileUp,
  FileText,
  AlertCircle,
  Users,
  Building,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const complianceData = [
  { status: 'Compliant', value: 78, fill: 'hsl(var(--chart-1))' },
  { status: 'Pending', value: 15, fill: 'hsl(var(--chart-2))' },
  { status: 'Needs Review', value: 7, fill: 'hsl(var(--destructive))' },
];

const departmentStatus = [
  { name: 'CompSci', progress: 92 },
  { name: 'MechEng', progress: 85 },
  { name: 'ElecEng', progress: 78 },
  { name: 'CivilEng', progress: 65 },
  { name: 'Physics', progress: 88 },
  { name: 'Chemistry', progress: 95 },
];

const recentActivity = [
  {
    id: 1,
    doc: 'Criterion 1.1 - Curriculum Design',
    user: 'Dr. Smith',
    status: 'Verified',
    dept: 'CompSci',
  },
  {
    id: 2,
    doc: 'Faculty Research Publications 2024',
    user: 'HOD MechEng',
    status: 'Pending',
    dept: 'MechEng',
  },
  {
    id: 3,
    doc: 'Student-Faculty Ratio Report',
    user: 'IQAC Office',
    status: 'Verified',
    dept: 'Admin',
  },
  {
    id: 4,
    doc: 'Infrastructure Audit Q2',
    user: 'Dr. Jones',
    status: 'Needs Review',
    dept: 'CivilEng',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col font-body">
      <DashboardHeader title="Accreditation Dashboard" />
      <main className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome, IQAC Coordinator
          </h2>
          <div className="flex items-center space-x-2">
            <Select defaultValue="NAAC">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Accreditation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NAAC">NAAC</SelectItem>
                <SelectItem value="NBA">NBA</SelectItem>
                <SelectItem value="NIRF">NIRF</SelectItem>
                <SelectItem value="QS">QS World Ranking</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Compliance
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                2% increase from last week
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Documents Uploaded
              </CardTitle>
              <FileUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,145</div>
              <p className="text-xs text-muted-foreground">
                +180 from last month
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Faculties Contributing
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128 / 150</div>
              <p className="text-xs text-muted-foreground">
                85% participation rate
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Pending mandatory documents
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="col-span-1 lg:col-span-3 transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Department Progress</CardTitle>
              <CardDescription>
                Data submission status across departments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <BarChart data={departmentStatus} layout="vertical" margin={{ left: 10 }}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                     <Tooltip content={<ChartTooltipContent />} cursor={{fill: 'hsl(var(--muted))'}} />
                     <Bar dataKey="progress" radius={[4, 4, 4, 4]} fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-1 lg:col-span-2 transition-all duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>
                Breakdown of document compliance.
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
                        payload,
                      }) => (
                        <text
                          x={cx}
                          y={y}
                          fill="hsl(var(--card-foreground))"
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="text-xs"
                        >
                           {payload.status} ({(percent * 100).toFixed(0)}%)
                        </text>
                      )}
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
                  <TableHead>Document / Criterion</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.doc}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{activity.dept}</Badge>
                    </TableCell>
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
                        className={
                          activity.status === 'Verified'
                            ? 'bg-green-500/20 text-green-700 border-green-500/20 hover:bg-green-500/30'
                            : activity.status === 'Needs Review'
                            ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500/20 hover:bg-yellow-500/30'
                            : ''
                        }
                      >
                        {activity.status}
                      </Badge>
                    </TableCell>
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
