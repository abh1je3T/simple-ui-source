import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../src";

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "Badge is used to highlight status, labels, and short metadata. It supports variants, tones, sizes, and optional icons.",
      },
    },
  },

  argTypes: {
    children: {
      control: "text",
      description: "Text content inside the badge",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
        defaultValue: { summary: "-" },
      },
    },

    variant: {
      control: "select",
      options: ["solid", "subtle", "outline"],
      description: "Visual style of the badge",
      table: {
        category: "Appearance",
        defaultValue: { summary: "solid" },
      },
    },

    tone: {
      control: "select",
      options: ["primary", "success", "error", "warning", "info", "neutral"],
      description: "Semantic color tone of the badge",
      table: {
        category: "Appearance",
        defaultValue: { summary: "primary" },
      },
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the badge",
      table: {
        category: "Appearance",
        defaultValue: { summary: "md" },
      },
    },

    icon: {
      control: false,
      description: "Optional icon displayed before text",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    className: {
      control: false,
      description: "Custom class override",
      table: {
        category: "Advanced",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "New",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Featured",
    icon: <StarIcon />,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Badge tone="primary">Primary</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="error">Error</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="neutral">Neutral</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};
