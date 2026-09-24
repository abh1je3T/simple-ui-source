import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../src";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A flexible checkbox component with tone, size, and indeterminate state support.",
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
        type: { summary: "CheckboxTone" },
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

    indeterminate: {
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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

type Story = StoryObj<typeof Checkbox>;

const LabelWrapper = ({
  children,
  label = "Label",
}: {
  children: React.ReactNode;
  label?: string;
}) => (
  <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
    {children}
    <span>{label}</span>
  </label>
);

export const Default: Story = {
  render: (args) => (
    <LabelWrapper>
      <Checkbox {...args} />
    </LabelWrapper>
  ),
  args: {},
};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Checkbox size="sm" />
      <Checkbox size="md" />
      <Checkbox size="lg" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Checkbox tone="neutral" defaultChecked />
      <Checkbox tone="primary" defaultChecked />
      <Checkbox tone="success" defaultChecked />
      <Checkbox tone="warning" defaultChecked />
      <Checkbox tone="error" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Checkbox />
      <Checkbox defaultChecked />
      <Checkbox checked />
    </div>
  ),
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Interactive tri-state checkbox: indeterminate → checked → unchecked cycle (simulates Select All behavior).",
      },
    },
  },

  render: () => {
    const [state, setState] = useState<
      "indeterminate" | "checked" | "unchecked"
    >("indeterminate");

    const checked = state === "checked";
    const indeterminate = state === "indeterminate";

    const handleChange = () => {
      setState((prev) => {
        if (prev === "indeterminate") return "checked";
        if (prev === "checked") return "unchecked";
        return "indeterminate";
      });
    };

    return (
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
      >
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          onChange={handleChange}
        />

        <span>
          {state === "indeterminate" && "Some selected"}
          {state === "checked" && "All selected"}
          {state === "unchecked" && "None selected"}
        </span>
      </label>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <LabelWrapper label="Disabled">
        <Checkbox disabled />
      </LabelWrapper>

      <LabelWrapper label="Disabled checked">
        <Checkbox disabled defaultChecked />
      </LabelWrapper>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <LabelWrapper label={checked ? "Selected" : "Not selected"}>
        <Checkbox checked={checked} onChange={setChecked} />
      </LabelWrapper>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <LabelWrapper label="Uncontrolled">
      <Checkbox defaultChecked />
    </LabelWrapper>
  ),
};

/* =========================
   SELECT ALL STORY
========================= */
const ITEMS = [
  { id: 1, label: "Apple" },
  { id: 2, label: "Banana" },
  { id: 3, label: "Cherry" },
  { id: 4, label: "Mango" },
];

export const SelectAll: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const allChecked = selected.size === ITEMS.length;
    const someChecked = selected.size > 0 && !allChecked;

    const toggleAll = (checked: boolean) => {
      setSelected(checked ? new Set(ITEMS.map((i) => i.id)) : new Set());
    };

    const toggleOne = (id: number, checked: boolean) => {
      setSelected((prev) => {
        const next = new Set(prev);
        checked ? next.add(id) : next.delete(id);
        return next;
      });
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Parent — select all */}
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked}
            onChange={toggleAll}
          />
          Select all
        </label>

        <div
          style={{
            height: 1,
            background: "#D9DBE0",
            margin: "4px 0",
          }}
        />

        {/* Children */}
        {ITEMS.map((item) => (
          <label
            key={item.id}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              paddingLeft: 8,
              cursor: "pointer",
            }}
          >
            <Checkbox
              checked={selected.has(item.id)}
              onChange={(checked) => toggleOne(item.id, checked)}
            />
            {item.label}
          </label>
        ))}

        {/* State summary */}
        <p style={{ fontSize: 12, color: "#73767F", marginTop: 8 }}>
          {selected.size === 0
            ? "None selected"
            : allChecked
              ? "All selected"
              : `${selected.size} of ${ITEMS.length} selected`}
        </p>
      </div>
    );
  },
};
