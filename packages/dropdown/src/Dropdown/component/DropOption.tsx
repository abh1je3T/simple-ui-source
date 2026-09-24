import React from "react";
import clsx from "clsx";
import { Checkbox } from "@simple-ui/checkbox";
import "./drop-options.scss";
import { DropOptionProps } from "../types";


export const DropOption: React.FC<DropOptionProps> = ({
  id,
  item,
  currentValue,
  onSelect,
  multiple,
  isFocused,
}) => {
  // Group Rendering Logic
  if (item.items) {
    return (
      <div className="sui-dropdown__group" role="group">
        <div className="sui-dropdown__group-label">{item.label}</div>
        <div className="sui-dropdown__group-items">
          {item.items.map((subItem, index) => (
            <DropOption
              key={`${subItem.value || subItem.label}-${index}`}
              item={subItem}
              currentValue={currentValue}
              onSelect={onSelect}
              multiple={multiple}
            />
          ))}
        </div>
      </div>
    );
  }

  // Single Option Rendering
  const isSelected = multiple
    ? Array.isArray(currentValue) && currentValue.includes(item.value!)
    : item.value === currentValue && item.value !== undefined;

  return (
    <li
      id={id}
      role="option"
      aria-selected={isSelected}
      className={clsx("sui-drop-option", {
        "sui-drop-option--selected": isSelected && !multiple,
        "sui-drop-option--disabled": item.disabled,
        "sui-drop-option--focused": isFocused,
        "sui-drop-option--multiple": multiple,
      })}
      onClick={() => !item.disabled && onSelect(item)}
    >
      {multiple && (
        <Checkbox
          size="sm"
          checked={isSelected}
          disabled={item.disabled}
          onChange={() => !item.disabled && onSelect(item)}
          className="sui-drop-option__checkbox"
          tabIndex={-1}
        />
      )}
      <span className="sui-drop-option__label">{item.label}</span>
      {!multiple && isSelected && (
        <span className="sui-drop-option__check" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}
    </li>
  );
};
