import React, { useMemo, useState, useEffect } from "react";
import { Input } from "@simple-ui/input";
import { DropMenu } from "@simple-ui/drop-menu";
import "./combobox.scss";

type Option = {
  label: string;
  value: string;
};

export type ComboBoxProps = {
  options: Option[];

  value?: string; // controlled
  defaultValue?: string; // uncontrolled

  onChange?: (value: string) => void;

  placeholder?: string;
  disabled?: boolean;
};

const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const selectedValue = isControlled ? value! : internalValue;

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!selectedValue) {
      setInputValue("");
      return;
    }

    const selected = options.find((o) => o.value === selectedValue);
    if (selected) {
      setInputValue(selected.label);
    }
  }, [selectedValue, options]);

  const filtered = useMemo(() => {
    if (!inputValue) return options;

    return options.filter((opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [inputValue, options]);

  const handleSelect = (opt: Option) => {
    if (!isControlled) setInternalValue(opt.value);

    onChange?.(opt.value);
    setInputValue(opt.label);
    setOpen(false);
  };

  return (
    <DropMenu open={open} onOpenChange={setOpen}>
      <DropMenu.Trigger>
        <div
          className="sui-drop-menu-input-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            value={inputValue}
            onChange={(val) => {
              setInputValue(val);
              setOpen(true);
            }}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setOpen(true)}
          />
        </div>
      </DropMenu.Trigger>

      <DropMenu.Content>
        {filtered.length === 0 && (
          <div
            style={{
              padding: "8px 12px",
              color: "var(--grey500)",
              textAlign: "center",
            }}
          >
            No results
          </div>
        )}

        {filtered.map((opt) => (
          <DropMenu.Item key={opt.value} onClick={() => handleSelect(opt)}>
            {opt.label}
          </DropMenu.Item>
        ))}
      </DropMenu.Content>
    </DropMenu>
  );
};

export default ComboBox;
