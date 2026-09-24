import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { DropdownProps, DropdownOption } from "../types";
import { flattenOptions, findOptionByValue } from "../utils/helpers";

/**
 * Core state and logic hook for the Dropdown component.
 */
export const useDropdown = <T extends string | number>(props: DropdownProps<T>) => {
  const {
    options,
    defaultValue,
    value,
    multiple,
    onChange,
    disabled,
    loading,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const flatOptions = useMemo(() => flattenOptions(options), [options]);

  const selectedOptions = useMemo(() => {
    if (multiple) {
      const values = Array.isArray(currentValue) ? currentValue : [];
      return flatOptions.filter((opt) => values.includes(opt.value! as T));
    }
    const found = findOptionByValue(options, currentValue as string | number);
    return found ? [found] : [];
  }, [currentValue, multiple, options, flatOptions]);

  const handleToggle = useCallback(() => {
    if (!disabled && !loading) {
      setIsOpen((prev) => !prev);
    }
  }, [disabled, loading]);

  const handleSelect = useCallback(
    (option: DropdownOption) => {
      if (option.disabled || option.value === undefined) return;

      let newValue: any;
      if (multiple) {
        const values = Array.isArray(currentValue) ? [...currentValue] : [];
        const index = values.indexOf(option.value as T);
        if (index > -1) {
          values.splice(index, 1);
        } else {
          values.push(option.value as T);
        }
        newValue = values;
      } else {
        newValue = option.value;
        setIsOpen(false);
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }

      (onChange as (value: any) => void)?.(newValue);
    },
    [currentValue, multiple, isControlled, onChange],
  );

  return {
    isOpen,
    setIsOpen,
    currentValue,
    selectedOptions,
    flatOptions,
    handleToggle,
    handleSelect,
    isMounted,
  };
};
