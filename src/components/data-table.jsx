import {
  //   ColumnFiltersState,
  //   SortingState,
  //   VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { LoadingSpinner } from "./spin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { ColumnDef } from "@tanstack/react-table";
import Paginator from "./paginator";
import { useTheme } from "./theme-provider";
import { DataTableToolbar } from "./table-toolbar";
export default function DataTable({
  data,
  columns,
  pagination,
  loading,
  onCheckedChange,
  rowSelectionEnable,
  setRowSelectionEnable,
  showSelection,
  ref,
  ...props
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { theme } = useTheme();

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
    onGlobalFilterChange: setGlobalFilter,
    // onRowSelectionChange: setRowSelection,
    onRowSelectionChange: (e) => {
      showSelection ? setRowSelectionEnable(e) : setRowSelection(e);
      setRowSelection(e);
    },

    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      // rowSelection: showSelection ? rowSelectionEnable : rowSelection,
      rowSelection: rowSelection,
      globalFilter,
    },
  });
  React.useEffect(() => {
    let rowSelected = table
      .getSelectedRowModel()
      ?.rows?.map((row, index) => row?.original);

    if (rowSelected?.length > 0) {
      setRowSelectionEnable(rowSelected);
    }
  }, [table.getSelectedRowModel()]);

  console.log("globalFilter", globalFilter);
  return (
    <div className="w-full">
      {props?.showToolbar && <DataTableToolbar table={table} />}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className={`${
                  theme == "dark" ? "bg-[#27272a80]" : "bg-[#e5e7eb]"
                } `}
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`!w-[${header?.column?.columnDef?.width}]`}
                      style={{
                        minWidth: header.column.columnDef.width,
                        maxWidth: header.column.columnDef.width,
                        width: header.column.columnDef.width,
                      }}
                    >
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
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center "
                >
                  <p className="flex justify-center items-center">
                    <LoadingSpinner />
                  </p>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows?.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(e) => {
                    props?.onRowClick(row);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="p-[12px]" key={cell.id}>
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
                <TableCell colSpan={columns.length} className="h-24 flex-auto">
                  <div className="flex justify-center">No results</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length
            ? `${table.getFilteredSelectedRowModel().rows.length} of `
            : null}
          {table.getFilteredRowModel().rows.length} row(s)
        </div>
        {pagination && (
          <div className="flex justify-end pr-2">
            <Paginator
              currentPage={
                pagination?.pageIndex
                  ? pagination?.pageIndex
                  : table.getState().pagination.pageIndex + 1
              }
              totalPages={
                pagination?.pageSize
                  ? Math.ceil(pagination?.totalPages / pagination?.pageSize)
                  : table.getPageCount()
              }
              onPageChange={
                pagination?.onPageChange
                  ? pagination?.onPageChange
                  : (pageNumber) => table.setPageIndex(pageNumber - 1)
              }
              showPreviousNext
            />
          </div>
        )}
      </div>
    </div>
  );
}
