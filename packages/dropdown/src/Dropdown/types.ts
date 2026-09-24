export type DropdownTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "error";

export type DropdownSize = "sm" | "md" | "lg";


export type DropdownOption = {
  label: string;
  value?: string | number;
  disabled?: boolean;
  items?: DropdownOption[];
}

export interface DropOptionProps {
  id?: string;
  item: DropdownOption;
  currentValue?: string | number | (string | number)[];
  onSelect: (option: DropdownOption) => void;
  multiple?: boolean;
  isFocused?: boolean;
}

export type DropdownBaseProps = {
  size?: DropdownSize;
  tone?: DropdownTone;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean | string;
  className?: string;
  id?: string;
  name?: string;
};

export type DropdownProps<T extends string | number = string | number> =
  DropdownBaseProps &
  (
    | {
      multiple?: false;
      value?: T;
      defaultValue?: T;
      onChange?: (value: T) => void;
    }
    | {
      multiple: true;
      value?: T[];
      defaultValue?: T[];
      onChange?: (value: T[]) => void;
    }
  );
