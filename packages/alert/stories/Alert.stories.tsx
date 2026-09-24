import type { Meta, StoryObj } from "@storybook/react";
import { FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";
import { Alert } from "../src";

const meta: Meta<typeof Alert> = {
  title: "Molecules/Alert",
  component: Alert,
  tags: ["autodocs"],

  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Alert is a feedback component used to display inline messages such as success, error, warning, or informational states.",
      },
    },
  },

  argTypes: {
    // --- Appearance ---
    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "error", "warning", "info"],
      description: "Defines the semantic meaning of the alert.",
      table: {
        category: "Appearance",
        type: { summary: "AlertTone" },
        defaultValue: { summary: "neutral" },
      },
    },
    variant: {
      control: "select",
      options: ["subtle", "solid"],
      description: "Visual style of the alert.",
      table: {
        category: "Appearance",
        type: { summary: "AlertVariant" },
        defaultValue: { summary: "subtle" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Controls padding and font size.",
      table: {
        category: "Appearance",
        type: { summary: "AlertSize" },
        defaultValue: { summary: "md" },
      },
    },

    // --- Content ---
    title: {
      control: "text",
      description: "Main heading of the alert.",
      table: { category: "Content" },
    },
    children: {
      control: "text",
      description: "Supporting description content.",
      table: { category: "Content" },
    },
    icon: {
      control: false,
      description: "Optional icon displayed on the left side.",
      table: { category: "Content" },
    },

    // --- Interaction ---
    dismissible: {
      control: "boolean",
      description: "Shows a close button allowing user dismissal.",
      table: {
        category: "Interaction",
        defaultValue: { summary: "false" },
      },
    },
    onDismiss: {
      action: "dismissed",
      description: "Callback fired when alert is dismissed.",
      table: { category: "Interaction" },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the alert container.",
      table: {
        category: "Appearance",
        type: { summary: "string" },
      },
    },

    // --- State / Visibility ---
    open: {
      control: "boolean",
      description: "Controlled state of the alert visibility.",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },

    defaultOpen: {
      control: "boolean",
      description:
        "The initial visibility state when the component is uncontrolled.",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    title: "Alert title",
    children: "This is a default alert message.",
  },
};

const toneExamples = [
  { tone: "success", icon: <FiCheckCircle />, text: "Success" },
  { tone: "error", icon: <FiXCircle />, text: "Error" },
  { tone: "warning", icon: <FiInfo />, text: "Warning" },
  { tone: "info", icon: <FiInfo />, text: "Info" },
  { tone: "primary", icon: <FiInfo />, text: "Primary" },
  { tone: "neutral", icon: <FiInfo />, text: "Neutral" },
] as const;

export const SubtleTones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {toneExamples.map((t) => (
        <Alert key={t.tone} tone={t.tone} title={t.text}>
          This is a {t.tone} alert message.
        </Alert>
      ))}
    </div>
  ),
};

export const SolidVariant: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {toneExamples.map((t) => (
        <Alert key={t.tone} variant="solid" tone={t.tone} title={t.text}>
          This is a {t.tone} alert message.
        </Alert>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Alert key={size} size={size} title={`${size.toUpperCase()} Alert`}>
          This is a {size} sized alert.
        </Alert>
      ))}
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <Alert
      title="Dismissible Alert"
      dismissible
      onDismiss={() => console.log("Alert dismissed")}
    >
      Click the close button to remove this alert.
    </Alert>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Alert tone="success" icon={<FiCheckCircle />} title="Success">
        Everything worked fine
      </Alert>

      <Alert tone="error" icon={<FiXCircle />} title="Error">
        Something failed
      </Alert>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    tone: "success",
    variant: "subtle",
    size: "md",
    title: "Playground Alert",
    children: "Try modifying controls",
    dismissible: true,
  },
};
