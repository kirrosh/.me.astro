import { createSignal, For, Show } from "solid-js";
import { createAutoAnimate } from "@formkit/auto-animate/solid";

import {
  createSolidTable,
  flexRender,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  ColumnDef,
} from "@tanstack/solid-table";

import { makeData, Person } from "./make-data";
import IndeterminateCheckbox from "./solid-Indeterminate-checkbox";
import DebouncedInput from "./solid-debounced-input";
import { globalFilterFn } from "./global-filter-fn";

const [data, setData] = createSignal(makeData(10, 5, 3));

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "expand",
    cell: (info) => (
      <Show when={info.row.getCanExpand()} fallback={<div class="w-8" />}>
        <button
          class="btn-square btn-xs btn"
          onclick={info.row.getToggleExpandedHandler()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <Show when={!info.row.getIsExpanded()}>
              <line
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                x1="12"
                y1="5"
                x2="12"
                y2="19"
              />
            </Show>
            <line
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              x1="5"
              y1="12"
              x2="19"
              y2="12"
            />
          </svg>
        </button>
      </Show>
    ),
  },
  {
    accessorKey: "select",
    cell: (info) => (
      <IndeterminateCheckbox
        {...{
          checked: info.row.subRows.length
            ? info.row.getIsAllSubRowsSelected()
            : info.row.getIsSelected(),
          disabled: !info.row.getCanSelect(),
          indeterminate: info.row.getIsSomeSelected(),
          onChange: (e) => {
            if (info.row.getIsSomeSelected()) {
              info.row.toggleSelected(false);
              return;
            }
            info.row.toggleSelected();
          },
        }}
      />
    ),
  },
  {
    accessorKey: "firstName",
    cell: (info) => {
      return (
        <div
          class="mr-auto w-full cursor-pointer pl-2 hover:bg-primary-focus"
          onclick={info.row.getToggleExpandedHandler()}
        >
          {info.getValue<string>()}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",

    cell: (info) => (
      <button tabindex="0" class="btn-ghost btn-xs btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </button>
    ),
  },
];

function SolidTree() {
  let [parent] = createAutoAnimate<HTMLDivElement>();
  const [globalFilter, setGlobalFilter] = createSignal("");
  const [expanded, setExpanded] = createSignal<ExpandedState>({});

  const table = createSolidTable({
    get data() {
      return data();
    },
    state: {
      get globalFilter() {
        return globalFilter();
      },
      get expanded() {
        return globalFilter() ? true : expanded();
      },
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    globalFilterFn: globalFilterFn,
    onGlobalFilterChange: setGlobalFilter,
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    enableRowSelection: true,
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div class="h-[500px] overflow-y-auto overflow-x-hidden p-2">
      <DebouncedInput
        value={globalFilter() ?? ""}
        onChange={(value) => {
          setGlobalFilter(String(value));
        }}
      />
      <ul class="w-[400px] select-none p-0" ref={parent}>
        <For each={table.getRowModel().rows}>
          {(row) => (
            <li
              class="flex cursor-pointer items-center gap-2"
              style={{
                "padding-left": 16 * row.depth + "px",
              }}
            >
              <For each={row.getVisibleCells()}>
                {(cell) =>
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                }
              </For>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

export default SolidTree;
