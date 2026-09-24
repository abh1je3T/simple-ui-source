import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../src";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "md" },
      },
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "medium" },
      },
    },
    required: {
      control: "boolean",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Username",
  },
};

export const Required: Story = {
  args: {
    children: "Email",
    required: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Label size="sm">Small Label</Label>
      <Label size="md">Medium Label</Label>
      <Label size="lg">Large Label</Label>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Label weight="regular">Regular</Label>
      <Label weight="medium">Medium</Label>
      <Label weight="semibold">Semibold</Label>
      <Label weight="bold">Bold</Label>
    </div>
  ),
};
