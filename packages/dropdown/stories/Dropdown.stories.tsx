import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "../src";
import { useState } from "react";

const meta: Meta<typeof Dropdown> = {
  title: "Atoms/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A custom dropdown component that provides full styling control and a premium feel, replacing the native select element.",
      },
    },
  },

  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        category: "Appearance",
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "md" },
      },
    },

    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "error"],
      table: {
        category: "Appearance",
        type: { summary: "DropdownTone" },
        defaultValue: { summary: "neutral" },
      },
    },

    disabled: {
      control: "boolean",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    placeholder: {
      control: "text",
      table: {
        category: "Form",
        type: { summary: "string" },
      },
    },

    options: {
      control: "object",
      table: {
        category: "Data",
        type: { summary: "DropdownOption[]" },
      },
    },

    onChange: {
      action: "changed",
      table: {
        category: "Events",
        type: { summary: "(value: string | number) => void" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const FRUIT_OPTIONS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "mango", label: "Mango", disabled: true },
  { value: "orange", label: "Orange" },
  { value: "pear", label: "Pear" },
];

export const Default: Story = {
  args: {
    options: FRUIT_OPTIONS,
    placeholder: "Select a fruit",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 300 }}>
      <Dropdown size="sm" options={FRUIT_OPTIONS} placeholder="Small Dropdown" />
      <Dropdown size="md" options={FRUIT_OPTIONS} placeholder="Medium Dropdown" />
      <Dropdown size="lg" options={FRUIT_OPTIONS} placeholder="Large Dropdown" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 300 }}>
      <Dropdown tone="neutral" options={FRUIT_OPTIONS} defaultValue="apple" />
      <Dropdown tone="primary" options={FRUIT_OPTIONS} defaultValue="apple" />
      <Dropdown tone="success" options={FRUIT_OPTIONS} defaultValue="apple" />
      <Dropdown tone="warning" options={FRUIT_OPTIONS} defaultValue="apple" />
      <Dropdown tone="error" options={FRUIT_OPTIONS} defaultValue="apple" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>("banana");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 300 }}>
        <Dropdown
          value={value}
          onChange={setValue}
          options={FRUIT_OPTIONS}
        />
        <p style={{ fontSize: 14 }}>Selected value: <strong>{value}</strong></p>
      </div>
    );
  },
};

export const Scrolling: Story = {
  render: () => {
    const longOptions = Array.from({ length: 20 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
    }));
    return (
      <div style={{ maxWidth: 300 }}>
        <Dropdown options={longOptions} placeholder="Scrollable Menu" />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    options: FRUIT_OPTIONS,
    placeholder: "Disabled Dropdown",
  },
};

export const Grouped: Story = {
  render: () => {
    const groupedOptions = [
      {
        label: "Fruits",
        items: [
          { value: "apple", label: "Apple" },
          { value: "mango", label: "Mango" },
          { value: "pear", label: "Pear" },
        ],
      },
      {
        label: "Vegetables",
        items: [
          { value: "spinach", label: "Spinach" },
          { value: "cabbage", label: "Cabbage" },
          { value: "tomatoes", label: "Tomatoes" },
        ],
      },
    ];

    return (
      <div style={{ maxWidth: 300 }}>
        <Dropdown options={groupedOptions} placeholder="Select item..." />
      </div>
    );
  },
};

export const MultiSelect: Story = {
  render: ({ value: _value, defaultValue: _defaultValue, ...args }) => {
    const [values, setValues] = useState<(string | number)[]>(["apple", "banana"]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 300 }}>
        <Dropdown
          {...args}
          multiple
          value={values}
          onChange={(val) => setValues(val as (string | number)[])}
          options={FRUIT_OPTIONS}
          placeholder="Select multiple fruits"
        />
        <p style={{ fontSize: 14 }}>
          Selected items: <strong>{values.join(", ") || "None"}</strong>
        </p>
      </div>
    );
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    options: FRUIT_OPTIONS,
    placeholder: "Fetching data...",
  },
};

export const ErrorState: Story = {
  render: () => {
    const [error, setError] = useState<string | boolean>("This field is required");
    const [value, setValue] = useState<string | number>("");

    return (
      <div style={{ maxWidth: 300 }}>
        <Dropdown
          error={error}
          value={value}
          onChange={(val) => {
            setValue(val as string);
            setError(false);
          }}
          options={FRUIT_OPTIONS}
          placeholder="Select a fruit"
        />
      </div>
    );
  },
};

export const GroupedMultiSelect: Story = {
  render: ({ value: _value, defaultValue: _defaultValue, ...args }) => {
    const [values, setValues] = useState<(string | number)[]>(["apple", "spinach"]);
    const groupedOptions = [
      {
        label: "Fruits",
        items: [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ],
      },
      {
        label: "Vegetables",
        items: [
          { value: "spinach", label: "Spinach" },
          { value: "cabbage", label: "Cabbage" },
          { value: "tomato", label: "Tomato" },
        ],
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 300 }}>
        <Dropdown
          {...args}
          multiple
          value={values}
          onChange={(val) => setValues(val as (string | number)[])}
          options={groupedOptions}
          placeholder="Select items"
        />
        <p style={{ fontSize: 14 }}>
          Selected: <strong>{values.join(", ") || "None"}</strong>
        </p>
      </div>
    );
  },
};
