import type { FilterFn } from "@tanstack/solid-table";
import type { Person } from "./make-data";

export const globalFilterFn: FilterFn<Person> = (
  row,
  columnId,
  searchValue,
  addMeta
) => {
  const rowValue = row.original[columnId as keyof Person];
  if (row.subRows.length) {
    let hasChild = false;
    row.subRows.forEach((item) => {
      if (globalFilterFn(item, columnId, searchValue, addMeta)) {
        hasChild = true;
      }
    });
    if (hasChild) {
      return true;
    }
  }

  return (
    rowValue?.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
    false
  );
};
