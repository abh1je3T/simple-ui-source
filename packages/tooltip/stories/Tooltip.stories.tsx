import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../src";
import { Button } from "@simple-ui/button";

const meta: Meta<typeof Tooltip> = {
  title: "Molecules/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tooltip displays contextual information on hover, focus, or cursor movement. Built with accessibility, smart positioning, and optional cursor tracking.",
      },
    },
  },

  argTypes: {
    content: {
      control: "text",
      description: "Tooltip content",
      table: { category: "Content" },
    },
    children: {
      description: "The element that triggers the tooltip.",
      table: { category: "Content" },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tooltip size",
      table: { category: "Appearance" },
    },
    tone: {
      control: "select",
      options: ["dark", "light", "info", "success", "warning", "error"],
      description: "Tooltip tone / color variant",
      table: { category: "Appearance" },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the tooltip.",
      table: { category: "Appearance" },
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Preferred placement (auto-flips on collision)",
      table: { category: "Behavior" },
    },
    delay: {
      control: "number",
      description: "Delay before showing tooltip (ms)",
      table: { category: "Behavior" },
    },
    disabled: {
      control: "boolean",
      description: "Disable tooltip",
      table: { category: "Behavior" },
    },
    followCursor: {
      control: "boolean",
      description: "Tooltip follows cursor",
      table: { category: "Behavior" },
    },
  },

  args: {
    content: "Tooltip content",
    placement: "top",
    size: "md",
    tone: "dark",
    delay: 150,
    disabled: false,
    followCursor: false,
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 120px)",
        gap: "40px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip content="Top" placement="top">
        <Button style={{ width: "stretch" }}>Top</Button>
      </Tooltip>
      <Tooltip content="Bottom" placement="bottom">
        <Button style={{ width: "stretch" }}>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" placement="left">
        <Button style={{ width: "stretch" }}>Left</Button>
      </Tooltip>
      <Tooltip content="Right" placement="right">
        <Button style={{ width: "stretch" }}>Right</Button>
      </Tooltip>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Tooltip content="Small tooltip" size="sm">
        <Button>Small</Button>
      </Tooltip>
      <Tooltip content="Medium tooltip" size="md">
        <Button>Medium</Button>
      </Tooltip>
      <Tooltip content="Large tooltip" size="lg">
        <Button>Large</Button>
      </Tooltip>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Tooltip content="Dark tone" tone="dark">
        <Button>Dark</Button>
      </Tooltip>
      <Tooltip content="Light tone" tone="light">
        <Button>Light</Button>
      </Tooltip>
      <Tooltip content="Info tone" tone="info">
        <Button>Info</Button>
      </Tooltip>
      <Tooltip content="Success tone" tone="success">
        <Button>Success</Button>
      </Tooltip>
      <Tooltip content="Warning tone" tone="warning">
        <Button>Warning</Button>
      </Tooltip>
      <Tooltip content="Error tone" tone="error">
        <Button>Error</Button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Tooltip content="Appears after 1s" delay={1000}>
      <Button>Hover (1s delay)</Button>
    </Tooltip>
  ),
};

export const FollowCursor: Story = {
  render: () => (
    <Tooltip content="Following your cursor" followCursor>
      <Button>Move cursor over me</Button>
    </Tooltip>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tooltip content="You won't see this" disabled>
      <Button>Disabled tooltip</Button>
    </Tooltip>
  ),
};
