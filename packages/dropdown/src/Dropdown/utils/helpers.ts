import { DropdownOption } from "../types";

/**
 * Flattens a nested array of dropdown options into a single-level array.
 */
export const flattenOptions = (items: DropdownOption[]): DropdownOption[] => {
  return items.flatMap((item) => (item.items ? flattenOptions(item.items) : item));
};

/**
 * Recursively finds an option by its value.
 */
export const findOptionByValue = (
  items: DropdownOption[],
  value?: string | number,
): DropdownOption | undefined => {
  for (const item of items) {
    if (item.value === value && value !== undefined) return item;
    if (item.items) {
      const found = findOptionByValue(item.items, value);
      if (found) return found;
    }
  }
  return undefined;
};

/**
 * Formats the value for a hidden input field (useful for form submissions).
 */
export const getHiddenInputValue = (
  value: string | number | (string | number)[] | undefined,
  multiple: boolean,
): string => {
  if (value == null) return "";
  if (multiple && Array.isArray(value)) {
    return value.map(String).join(",");
  }
  return String(value);
};
