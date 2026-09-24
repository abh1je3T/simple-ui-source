import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "../src";

const meta: Meta<typeof Heading> = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "Heading component used for semantic and visual hierarchy. Supports multiple sizes, weights, and HTML heading levels (h1–h6).",
      },
    },
  },

  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Semantic HTML tag used for accessibility and SEO",
      table: {
        category: "Content",
        type: { summary: "HeadingAs" },
        defaultValue: { summary: "h2" },
      },
    },

    size: {
      control: "select",
      options: ["display", "h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Visual size of the heading",
      table: {
        category: "Appearance",
        type: { summary: "HeadingSize" },
        defaultValue: { summary: "h2" },
      },
    },

    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
      description: "Font weight of the heading",
      table: {
        category: "Appearance",
        type: { summary: "HeadingWeight" },
        defaultValue: { summary: "semibold" },
      },
    },

    children: {
      control: "text",
      description: "Heading content",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    className: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;


export const Default: Story = {
  args: {
    as: "h2",
    size: "h2",
    weight: "semibold",
    children: "Default Heading",
  },
};

export const Display: Story = {
  args: {
    as: "h1",
    size: "display",
    weight: "bold",
    children: "Display Heading (Hero Title)",
  },
};

export const Levels: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "12px" }}>
      <Heading as="h1" size="h1">
        H1 Heading
      </Heading>
      <Heading as="h2" size="h2">
        H2 Heading
      </Heading>
      <Heading as="h3" size="h3">
        H3 Heading
      </Heading>
      <Heading as="h4" size="h4">
        H4 Heading
      </Heading>
      <Heading as="h5" size="h5">
        H5 Heading
      </Heading>
      <Heading as="h6" size="h6">
        H6 Heading
      </Heading>
    </div>
  ),
};


export const Weights: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "12px" }}>
      <Heading weight="regular">Regular Weight</Heading>
      <Heading weight="medium">Medium Weight</Heading>
      <Heading weight="semibold">Semibold Weight</Heading>
      <Heading weight="bold">Bold Weight</Heading>
    </div>
  ),
};

export const UIExample: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "8px" }}>
      <Heading as="h1" size="h1" weight="bold">
        Dashboard
      </Heading>

      <Heading as="h2" size="h3" weight="medium">
        Overview
      </Heading>

      <Heading as="h3" size="h5" weight="regular">
        Recent Activity
      </Heading>
    </div>
  ),
};