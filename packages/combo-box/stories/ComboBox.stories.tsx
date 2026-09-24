import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@simple-ui/button";
import { ComboBox } from "../src";
import { useState } from "react";

const meta: Meta<typeof ComboBox> = {
  title: "Molecules/Combo Box",
  component: ComboBox,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A searchable ComboBox built on top of Input + DropMenu. Supports controlled/uncontrolled modes, filtering, and selection handling.",
      },
    },
  },

  argTypes: {
    /* =========================
       DATA
    ========================= */
    options: {
      description: "List of selectable options",
      table: {
        category: "Data",
        type: { summary: "Option[]" },
      },
    },

    value: {
      control: "text",
      description: "Controlled selected value",
      table: {
        category: "State",
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },

    defaultValue: {
      control: "text",
      description: "Initial value for uncontrolled mode",
      table: {
        category: "State",
        type: { summary: "string" },
      },
    },

    /* =========================
       BEHAVIOR
    ========================= */
    onChange: {
      action: "changed",
      description: "Triggered when selection changes",
      table: {
        category: "Events",
        type: { summary: "(value: string) => void" },
      },
    },

    disabled: {
      control: "boolean",
      description: "Disables interaction",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },

    /* =========================
       UI / CONTENT
    ========================= */
    placeholder: {
      control: "text",
      description: "Input placeholder text",
      table: {
        category: "Content",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ComboBox>;

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Mango", value: "mango" },
  { label: "Pineapple", value: "pineapple" },
];

export const Default: Story = {
  args: {
    options: options,
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div>
        <ComboBox
          options={args.options}
          value={value}
          onChange={setValue}
          placeholder="Select fruit"
        />
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <div>
      <ComboBox
        options={options}
        defaultValue="banana"
        placeholder="Uncontrolled"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div>
      <ComboBox options={options} disabled placeholder="Disabled combobox" />
    </div>
  ),
};

export const NoResults: Story = {
  render: () => (
    <div>
      <ComboBox options={options} placeholder="Type something random..." />
    </div>
  ),
};

export const Preselected: Story = {
  render: () => {
    const [value, setValue] = useState("mango");

    return (
      <div>
        <ComboBox options={options} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithReset: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div style={{ width: 300, display: "grid", gap: 8 }}>
        <ComboBox
          options={options}
          value={value}
          onChange={setValue}
          placeholder="Pick something"
        />

        <Button onClick={() => setValue("")}>Reset</Button>
      </div>
    );
  },
};

export const AsyncSimulation: Story = {
  render: () => {
    const [query, setQuery] = useState("");
    const [data, setData] = useState(options);

    const handleChange = (val: string) => {
      setQuery(val);

      // simulate API delay
      setTimeout(() => {
        setData(
          options.filter((o) =>
            o.label.toLowerCase().includes(val.toLowerCase()),
          ),
        );
      }, 300);
    };

    return (
      <div>
        <ComboBox
          options={data}
          placeholder="Search (async simulated)..."
          onChange={() => {}}
        />
      </div>
    );
  },
};
