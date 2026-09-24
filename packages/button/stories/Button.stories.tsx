import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src";
import { FaArrowRight } from "react-icons/fa";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A flexible button component supporting multiple variants, sizes, and optional icon usage. Designed for consistent UI behavior across applications.",
      },
    },
  },

  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "link",
        "success",
        "warning",
        "error",
        "info",
      ],
      description: "Visual style of the button",
      table: {
        category: "Appearance",
        type: { summary: "ButtonVariant" },
        defaultValue: { summary: "primary" },
      },
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Controls button padding and font size",
      table: {
        category: "Appearance",
        type: { summary: "ButtonSize" },
        defaultValue: { summary: "md" },
      },
    },

    disabled: {
      control: "boolean",
      description: "Disables interaction and applies disabled styles",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    icon: {
      control: false,
      description: "Optional icon displayed inside the button",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    children: {
      control: "text",
      description: "Button label content",
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

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
    disabled: false,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="link">Link</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
      <Button variant="info">Info</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="tertiary" disabled>
        Tertiary
      </Button>
      <Button variant="success" disabled>
        Success
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => <Button icon={<FaArrowRight />}>Continue</Button>,
};

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button icon={<FaArrowRight />} aria-label="Next" />
      <Button icon={<FaArrowRight />} size="lg" aria-label="Next" />
    </div>
  ),
};

export const VariantsWithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="primary" icon={<FaArrowRight />}>
        Primary
      </Button>
      <Button variant="secondary" icon={<FaArrowRight />}>
        Secondary
      </Button>
      <Button variant="success" icon={<FaArrowRight />}>
        Success
      </Button>
      <Button variant="error" icon={<FaArrowRight />}>
        Error
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Button style={{ width: "100%" }}>Full Width Button</Button>
    </div>
  ),
};

export const ButtonGroup: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </div>
  ),
};
