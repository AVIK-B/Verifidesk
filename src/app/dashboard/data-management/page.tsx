
'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  FileUp,
  FileDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DashboardHeader } from '@/components/dashboard-header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const data: Document[] = [
  {
    id: 'doc-1',
    name: 'Criterion 1.1.1 - Curriculum Design',
    department: 'Computer Science',
    faculty: 'Dr. Alan Turing',
    status: 'Verified',
    lastUpdated: '2023-10-26',
  },
  {
    id: 'doc-2',
    name: 'Research Grants Q3 2023',
    department: 'Mechanical Engineering',
    faculty: 'Dr. Ada Lovelace',
    status: 'Pending',
    lastUpdated: '2023-11-15',
  },
  {
    id: 'doc-3',
    name: 'Student Feedback Analysis',
    department: 'Electronics Engineering',
    faculty: 'Dr. Grace Hopper',
    status: 'Verified',
    lastUpdated: '2023-09-30',
  },
  {
    id: 'doc-4',
    name: 'Infrastructure Utilization Report',
    department: 'Civil Engineering',
    faculty: 'Dr. Charles Babbage',
    status: 'Needs Review',
    lastUpdated: '2023-11-20',
  },
  {
    id: 'doc-5',
    name: 'Faculty Achievements 2023',
    department: 'Computer Science',
    faculty: 'Dr. John von Neumann',
    status: 'Verified',
    lastUpdated: '2023-10-15',
  },
];

export type Document = {
  id: string;
  name: string;
  department: string;
  faculty: string;
  status: 'Verified' | 'Pending' | 'Needs Review';
  lastUpdated: string;
};

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Document Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => <div>{row.getValue('department')}</div>,
  },
  {
    accessorKey: 'faculty',
    header: 'Faculty / Owner',
    cell: ({ row }) => <div>{row.getValue('faculty')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: Document['status'] = row.getValue('status');
      return (
        <Badge
          variant={
            status === 'Verified'
              ? 'default'
              : status === 'Pending'
              ? 'secondary'
              : 'destructive'
          }
          className={
            status === 'Verified'
              ? 'bg-green-500/20 text-green-700 border-green-500/20 hover:bg-green-500/30'
              : status === 'Needs Review'
              ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500/20 hover:bg-yellow-500/30'
              : ''
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last Updated',
    cell: ({ row }) => {
      const date = new Date(row.getValue('lastUpdated'));
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const doc = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(doc.id)}>
              Copy Document ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Document</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataManagementPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex w-full flex-1 flex-col">
      <DashboardHeader title="Data Management" />
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Filter documents..."
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Select
              onValueChange={(value) =>
                table
                  .getColumn('department')
                  ?.setFilterValue(value === 'all' ? '' : value)
              }
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Mechanical Engineering">
                  Mechanical Engineering
                </SelectItem>
                <SelectItem value="Electronics Engineering">
                  Electronics Engineering
                </SelectItem>
                <SelectItem value="Civil Engineering">
                  Civil Engineering
                </SelectItem>
              </SelectContent>
            </Select>
             <Select
              onValueChange={(value) =>
                table
                  .getColumn('status')
                  ?.setFilterValue(value === 'all' ? '' : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Needs Review">Needs Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" /> Export Data
            </Button>
            <Button>
              <FileUp className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
