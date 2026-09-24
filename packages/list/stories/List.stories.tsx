import type { Meta, StoryObj } from "@storybook/react";
import { List } from "../src";

// simple icon (replace later)
// const ArrowIcon = () => <span style={{ color: "var(--primary-base)" }}>→</span>;

const ArrowIcon = () => (
  <svg
    fill="currentColor"
    height="16px"
    width="16px"
    version="1.1"
    id="Layer_1"
    viewBox="0 0 512.003 512.003"
  >
    <g>
      <g>
        <path d="M507.284,248.364L12.35,0.898C8.894-0.826,4.721-0.007,2.153,2.86c-2.56,2.884-2.867,7.125-0.759,10.351l159.07,242.79    L1.393,498.792c-2.108,3.226-1.801,7.467,0.759,10.351c1.664,1.86,4.002,2.859,6.383,2.859c1.289,0,2.594-0.29,3.814-0.896    l494.933-247.467c2.893-1.451,4.719-4.403,4.719-7.637S510.176,249.815,507.284,248.364z" />
      </g>
    </g>
  </svg>
);

const meta: Meta<typeof List> = {
  title: "Atoms/List",
  component: List,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A flexible List component supporting ordered/unordered lists, spacing, dividers, icons, and marker customization using a compound API.",
      },
    },
  },

  argTypes: {
    as: {
      control: "select",
      options: ["ul", "ol"],
      description: "HTML element type",
      table: {
        category: "Structure",
        type: { summary: "ul | ol" },
        defaultValue: { summary: "ul" },
      },
    },

    styleType: {
      control: "select",
      options: ["disc", "circle", "square", "decimal", "none"],
      description: "List style type",
      table: {
        category: "Appearance",
        type: { summary: "ListStyle" },
        defaultValue: { summary: "disc" },
      },
    },

    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Controls spacing between list items",
      table: {
        category: "Layout",
        type: { summary: "ListGap" },
        defaultValue: { summary: "md" },
      },
    },

    variant: {
      control: "select",
      options: ["default", "divided"],
      description: "Visual variant of list",
      table: {
        category: "Appearance",
        type: { summary: "ListVariant" },
        defaultValue: { summary: "default" },
      },
    },

    markerColor: {
      control: "select",
      options: ["default", "primary", "secondary", "muted", "success", "error"],
      description: "Color of list markers",
      table: {
        category: "Appearance",
        type: { summary: "MarkerColor" },
        defaultValue: { summary: "default" },
      },
    },

    className: {
      table: { disable: true },
    },

    children: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => (
    <List {...args}>
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third item</List.Item>
    </List>
  ),
  args: {
    as: "ul",
    styleType: "disc",
    gap: "md",
    variant: "default",
    markerColor: "default",
  },
};
export const Ordered: Story = {
  render: (args) => (
    <List {...args}>
      <List.Item>Step 1</List.Item>
      <List.Item>Step 2</List.Item>
      <List.Item>Step 3</List.Item>
    </List>
  ),
  args: {
    as: "ol",
    styleType: "decimal",
  },
};
export const MarkerColors: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <List markerColor="primary">
        <List.Item>Primary marker</List.Item>
        <List.Item>Primary marker</List.Item>
      </List>

      <List markerColor="success">
        <List.Item>Success marker</List.Item>
        <List.Item>Success marker</List.Item>
      </List>

      <List markerColor="error">
        <List.Item>Error marker</List.Item>
        <List.Item>Error marker</List.Item>
      </List>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      <List gap="sm">
        <List.Item>Small gap</List.Item>
        <List.Item>Small gap</List.Item>
      </List>

      <List gap="md">
        <List.Item>Medium gap</List.Item>
        <List.Item>Medium gap</List.Item>
      </List>

      <List gap="lg">
        <List.Item>Large gap</List.Item>
        <List.Item>Large gap</List.Item>
      </List>
    </div>
  ),
};

export const Divided: Story = {
  render: (args) => (
    <List {...args}>
      <List.Item>Profile</List.Item>
      <List.Item>Settings</List.Item>
      <List.Item>Logout</List.Item>
    </List>
  ),
  args: {
    variant: "divided",
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <List {...args}>
      <List.Item icon={<ArrowIcon />}>Fast performance</List.Item>
      <List.Item icon={<ArrowIcon />}>Design tokens</List.Item>
      <List.Item icon={<ArrowIcon />}>Accessible system</List.Item>
    </List>
  ),
  args: {
    styleType: "none",
  },
};
export const Nested: Story = {
  render: () => (
    <List>
      <List.Item>
        Parent Item
        <List styleType="circle" gap="sm">
          <List.Item>Child item 1</List.Item>
          <List.Item>Child item 2</List.Item>
        </List>
      </List.Item>

      <List.Item>Another root item</List.Item>
    </List>
  ),
};
export const UIExample: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <h3>Features</h3>

      <List styleType="none">
        <List.Item icon={<ArrowIcon />}>Component-based architecture</List.Item>
        <List.Item icon={<ArrowIcon />}>Token-driven styling</List.Item>
        <List.Item icon={<ArrowIcon />}>Fully typed API</List.Item>
      </List>
    </div>
  ),
};
