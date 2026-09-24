import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl } from "../src";
import React from "react";

const meta: Meta<typeof SegmentedControl> = {
  title: "Molecules/Segmented Control",
  component: SegmentedControl,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "SegmentedControl is a controlled/uncontrolled tab-like selector with animated indicator, keyboard navigation, and tone-based theming.",
      },
    },
  },

  argTypes: {
    /* ================= VALUE ================= */
    options: {
      control: "object",
      description: "Segment options list",
      table: {
        category: "Data",
      },
    },

    value: {
      control: "text",
      description: "Controlled value",
      table: {
        category: "State",
      },
    },

    defaultValue: {
      control: "text",
      description: "Initial uncontrolled value",
      table: {
        category: "State",
      },
    },

    onChange: {
      action: "changed",
      table: {
        category: "Events",
      },
    },

    /* ================= STYLE ================= */
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "md" },
      },
    },

    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "error", "warning", "info"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "neutral" },
      },
    },

    variant: {
      control: "select",
      options: ["subtle", "outline"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "subtle" },
      },
    },

    className: {
      control: false,
      table: {
        category: "Advanced",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  args: {
    options: [
      { label: "Daily", value: "daily" },
      { label: "Weekly", value: "weekly" },
      { label: "Monthly", value: "monthly" },
    ],
    defaultValue: "weekly",
  },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {["neutral", "primary", "success", "error", "warning", "info"].map(
        (tone) => (
          <SegmentedControl
            key={tone}
            tone={tone as any}
            options={[
              { label: "One", value: "1" },
              { label: "Two", value: "2" },
              { label: "Three", value: "3" },
            ]}
            defaultValue="2"
          />
        ),
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <SegmentedControl
        size="sm"
        options={[
          { label: "A", value: "a" },
          { label: "B", value: "b" },
        ]}
        defaultValue="a"
      />

      <SegmentedControl
        size="md"
        options={[
          { label: "A", value: "a" },
          { label: "B", value: "b" },
        ]}
        defaultValue="a"
      />

      <SegmentedControl
        size="lg"
        options={[
          { label: "A", value: "a" },
          { label: "B", value: "b" },
        ]}
        defaultValue="a"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <SegmentedControl
        variant="subtle"
        options={[
          { label: "Subtle", value: "s" },
          { label: "Style", value: "t" },
        ]}
        defaultValue="s"
      />

      <SegmentedControl
        variant="outline"
        options={[
          { label: "Outline", value: "o" },
          { label: "Style", value: "t" },
        ]}
        defaultValue="o"
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = React.useState("weekly");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SegmentedControl
          value={value}
          onChange={setValue}
          options={[
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
          ]}
        />

        <div>Selected: {value}</div>
      </div>
    );
  },
};
