import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "../src";
import { useState } from "react";

const meta: Meta<typeof Radio> = {
  title: "Atoms/Radio",
  component: Radio,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A flexible radio button component with tone and size support, designed for single-selection groups.",
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
        type: { summary: "RadioTone" },
        defaultValue: { summary: "neutral" },
      },
    },

    checked: {
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },

    defaultChecked: {
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
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

    name: {
      control: "text",
      table: {
        category: "Form",
        type: { summary: "string" },
      },
    },

    id: {
      control: "text",
      table: {
        category: "Form",
        type: { summary: "string" },
      },
    },

    className: {
      table: { disable: true },
    },

    onChange: {
      action: "changed",
      table: {
        category: "Events",
        type: { summary: "(checked: boolean) => void" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

const LabelWrapper = ({
  children,
  label = "Label",
}: {
  children: React.ReactNode;
  label?: string;
}) => (
  <label
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
    }}
  >
    {children}
    <span>{label}</span>
  </label>
);

export const Default: Story = {
  render: (args) => (
    <LabelWrapper>
      <Radio {...args} />
    </LabelWrapper>
  ),
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <LabelWrapper label="Small">
        <Radio size="sm" name="size-group" />
      </LabelWrapper>
      <LabelWrapper label="Medium">
        <Radio size="md" name="size-group" defaultChecked />
      </LabelWrapper>
      <LabelWrapper label="Large">
        <Radio size="lg" name="size-group" />
      </LabelWrapper>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Radio tone="neutral" defaultChecked name="tone-group" />
      <Radio tone="primary" defaultChecked name="tone-group" />
      <Radio tone="success" defaultChecked name="tone-group" />
      <Radio tone="warning" defaultChecked name="tone-group" />
      <Radio tone="error" defaultChecked name="tone-group" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <LabelWrapper label="Unchecked">
        <Radio name="state-group" />
      </LabelWrapper>
      <LabelWrapper label="Checked">
        <Radio defaultChecked name="state-group-1" />
      </LabelWrapper>
      <LabelWrapper label="Disabled">
        <Radio disabled name="state-group-2" />
      </LabelWrapper>
      <LabelWrapper label="Disabled Checked">
        <Radio disabled defaultChecked name="state-group-3" />
      </LabelWrapper>
    </div>
  ),
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState("apple");

    const options = [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Select a fruit:</p>
        {options.map((option) => (
          <LabelWrapper key={option.value} label={option.label}>
            <Radio
              name="fruit"
              value={option.value}
              checked={selected === option.value}
              onChange={() => setSelected(option.value)}
            />
          </LabelWrapper>
        ))}
        <p style={{ margin: 0, fontSize: 12, color: "var(--grey500)" }}>
          Selected: {selected}
        </p>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <LabelWrapper label="Uncontrolled Radio">
      <Radio defaultChecked name="uncontrolled-group" />
    </LabelWrapper>
  ),
};
