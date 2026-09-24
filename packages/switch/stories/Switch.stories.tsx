import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Switch } from "../src";
import { FaMoon, FaSun } from "react-icons/fa";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "Switch is a controlled boolean input built on top of a checkbox. It supports tones, sizes, icons, and is fully accessible.",
      },
    },
  },

  argTypes: {
    checked: {
      control: "boolean",
      description: "Controlled state of the switch",
    },
    disabled: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "error"],
    },
    iconOn: { control: false },
    iconOff: { control: false },
    label: {
      control: "text",
    },
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: "Enable notifications",
    tone: "primary",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <Switch
        {...args}
        checked={checked}
        onChange={(val) => setChecked(val)}
        label={`Notifications: ${checked ? "ON" : "OFF"}`}
      />
    );
  },
};

export const Tones: Story = {
  render: () => {
    const tones = [
      "neutral",
      "primary",
      "success",
      "warning",
      "error",
    ] as const;

    return (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {tones.map((tone) => (
          <Switch key={tone} tone={tone} label={tone} defaultChecked />
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Switch size="sm" label="Small" defaultChecked />
      <Switch size="md" label="Medium" defaultChecked />
      <Switch size="lg" label="Large" defaultChecked />
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => {
    const [dark, setDark] = useState(false);

    return (
      <Switch
        {...args}
        checked={dark}
        onChange={setDark}
        label={dark ? "Dark Mode" : "Light Mode"}
        iconOn={<FaMoon />}
        iconOff={<FaSun color="#ff942a" />}
        tone="primary"
      />
    );
  },
};
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};
