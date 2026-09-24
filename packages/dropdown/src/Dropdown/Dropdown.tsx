import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { Loader } from "@simple-ui/loader";
import "./dropdown.scss";
import { DropOption } from "./component/DropOption";
import Chevron from "./component/Chevron";

// Hooks, Utils, Types
import { useDropdown } from "./hooks/useDropdown";
import { useClickOutside } from "./hooks/useClickOutside";
import { useMenuPlacement } from "./hooks/useMenuPlacement";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { getHiddenInputValue } from "./utils/helpers";
import { DropdownProps } from "./types";

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const {
    size = "md",
    tone = "neutral",
    options = [],
    placeholder = "Select...",
    className,
    disabled,
    multiple = false,
    loading = false,
    error = false,
    id,
    name,
  } = props;

  // Refs
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Core Logic Hook
  const {
    isOpen,
    setIsOpen,
    currentValue,
    selectedOptions,
    flatOptions,
    handleToggle,
    handleSelect,
  } = useDropdown(props);

  // Keyboard Navigation Hook
  const { focusedIndex, setFocusedIndex, handleKeyDown } =
    useKeyboardNavigation(
      isOpen,
      setIsOpen,
      flatOptions,
      handleSelect,
      disabled,
      loading,
    );

  // Other Hooks
  const menuPlacement = useMenuPlacement(triggerRef, isOpen);

  useClickOutside(
    [dropdownRef, menuRef],
    useCallback(() => {
      setIsOpen(false);
      setFocusedIndex(-1);
    }, [setIsOpen, setFocusedIndex]),
    isOpen,
  );

  // Expose ref
  useImperativeHandle(ref, () => dropdownRef.current as HTMLDivElement, []);

  // Render Helpers
  const displayValue = useMemo(() => {
    if (selectedOptions.length === 0) return placeholder;
    if (multiple) return `${selectedOptions.length} selected`;
    return selectedOptions[0].label;
  }, [selectedOptions, placeholder, multiple]);

  const hiddenInputValue = useMemo(
    () => getHiddenInputValue(currentValue, multiple),
    [currentValue, multiple],
  );

  const menuId = id ? `${id}-menu` : undefined;
  const activeOptionId =
    isOpen && focusedIndex > -1
      ? `${menuId}-option-${focusedIndex}`
      : undefined;

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        "sui-dropdown",
        `sui-dropdown--${size}`,
        `sui-dropdown--${tone}`,
        {
          "sui-dropdown--disabled": disabled,
          "sui-dropdown--open": isOpen,
          "sui-dropdown--loading": loading,
          "sui-dropdown--error": !!error,
          "sui-dropdown--multiple": multiple,
        },
        className,
      )}
    >
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className="sui-dropdown__trigger"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-activedescendant={activeOptionId}
      >
        <span className="sui-dropdown__value">{displayValue}</span>
        <span className="sui-dropdown__icon" aria-hidden="true">
          {loading ? (
            <Loader size="sm" tone="neutral" variant="spinner" />
          ) : (
            <Chevron />
          )}
        </span>
      </button>

      {typeof error === "string" && (
        <span className="sui-dropdown__error-message">{error}</span>
      )}

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className={clsx(
              "sui-dropdown__menu-wrapper",
              `sui-dropdown--${size}`,
            )}
            style={{
              top: menuPlacement.top,
              left: menuPlacement.left,
              width: menuPlacement.width,
              position: "absolute",
              zIndex: 9999,
            }}
          >
            <ul
              id={menuId}
              className="sui-dropdown__menu"
              role="listbox"
              aria-multiselectable={multiple || undefined}
            >
              {options.length === 0 ? (
                <li className="sui-drop-option sui-drop-option--disabled">
                  No options
                </li>
              ) : (
                options.map((item, index) => (
                  <DropOption
                    key={item.value ?? item.label}
                    id={`${menuId}-option-${index}`}
                    item={item}
                    currentValue={currentValue}
                    onSelect={handleSelect}
                    multiple={multiple}
                    isFocused={focusedIndex === index}
                  />
                ))
              )}
            </ul>
          </div>,
          document.body,
        )}

      {name && <input type="hidden" name={name} value={hiddenInputValue} />}
    </div>
  );
});

Dropdown.displayName = "Dropdown";

export default Dropdown;
