import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "../src";
import { useEffect, useState } from "react";
import { Badge } from "@simple-ui/badge";

const meta: Meta<typeof Progress> = {
  title: "Molecules/Progress",
  component: Progress,
  tags: ["autodocs"],

  argTypes: {
    // State
    value: {
      control: { type: "number", min: 0 },
      description: "The current progress value.",
      table: { category: "State" },
    },
    defaultValue: {
      control: { type: "number", min: 0 },
      description: "The initial value when the component is uncontrolled.",
      table: { category: "State" },
    },
    max: {
      control: { type: "number", min: 1 },
      description: "The maximum value of the progress bar.",
      table: { category: "State", defaultValue: { summary: "100" } },
    },
    buffer: {
      control: { type: "number", min: 0 },
      description: "Secondary progress value, typically used for buffering.",
      table: { category: "State" },
    },

    // Appearance
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The visual size of the progress bar.",
      table: { category: "Appearance", defaultValue: { summary: "md" } },
    },
    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "error"],
      description: "The semantic color of the progress bar.",
      table: { category: "Appearance", defaultValue: { summary: "primary" } },
    },
    appearance: {
      control: "select",
      options: ["solid", "dotted"],
      description: "The visual style of the progress bar track.",
      table: { category: "Appearance", defaultValue: { summary: "solid" } },
    },
    pattern: {
      control: "select",
      options: ["continuous", "steps"],
      description: "Whether to show a continuous bar or discrete steps.",
      table: { category: "Appearance", defaultValue: { summary: "continuous" } },
    },

    // Behavior
    mode: {
      control: "select",
      options: ["determinate", "indeterminate"],
      description: "Determinate shows specific progress, Indeterminate shows a loading animation.",
      table: { category: "Behavior", defaultValue: { summary: "determinate" } },
    },
    steps: {
      control: { type: "number", min: 2, max: 20 },
      description: "The number of discrete steps to show when pattern is set to 'steps'.",
      table: { category: "Behavior", defaultValue: { summary: "5" } },
    },

    // Content
    showValue: {
      control: "boolean",
      description: "Whether to display the current percentage as a text label.",
      table: { category: "Content", defaultValue: { summary: "false" } },
    },

    // Other
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the root element.",
      table: { category: "Other" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

/* =========================
   DEFAULT
========================= */
export const Default: Story = {
  args: {
    value: 60,
    showValue: true,
  },
};

/* =========================
   STEPS
========================= */
export const Steps: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Progress pattern="steps" value={20} />
      <Progress pattern="steps" value={50} />
      <Progress pattern="steps" value={90} />
    </div>
  ),
};

/* =========================
   SIZES
========================= */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Progress size="sm" value={40} />
      <Progress size="md" value={60} />
      <Progress size="lg" value={80} />
    </div>
  ),
};

/* =========================
   TONES
========================= */
export const Tones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Progress tone="neutral" value={40} />
      <Progress tone="primary" value={50} />
      <Progress tone="success" value={70} />
      <Progress tone="warning" value={80} />
      <Progress tone="error" value={90} />
    </div>
  ),
};

/* =========================
   PATTERNS
========================= */
export const Patterns: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Progress pattern="continuous" value={60} />
      <Progress pattern="steps" value={60} />
    </div>
  ),
};

/* =========================
   APPEARANCES
========================= */
export const Appearances: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Progress appearance="solid" value={50} />
      <Progress appearance="dotted" value={50} />
    </div>
  ),
};

/* =========================
   MODES
========================= */
export const Modes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Progress mode="determinate" value={70} showValue />
      <Progress mode="indeterminate" />
    </div>
  ),
};

/* =========================
   STREAMING BUFFER
========================= */
export const StreamingBuffer: Story = {
  render: () => {
    const [value, setValue] = useState(10);
    const [buffer, setBuffer] = useState(30);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((v) => {
          const next = v + 5;
          return next >= 100 ? 0 : next;
        });

        setBuffer((b) => {
          const next = b + 7;
          return next >= 100 ? 100 : next;
        });
      }, 700);

      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ display: "grid", gap: 12 }}>
        <Progress value={value} buffer={buffer} showValue />
      </div>
    );
  },
};

/* =========================
   COMBINED
========================= */
export const Combined: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: 24,
        padding: 32,
        background: "var(--grey50)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--grey200)",
      }}
    >
      <div style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: "14px", fontWeight: 600 }}>Default Linear</span>
        <Progress value={60} showValue />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: "14px", fontWeight: 600 }}>Dotted Success</span>
        <Progress appearance="dotted" tone="success" value={80} showValue />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: "14px", fontWeight: 600 }}>Steps Pattern</span>
        <Progress pattern="steps" steps={6} value={50} tone="warning" />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: "14px", fontWeight: 600 }}>
          Indeterminate State
        </span>
        <Progress mode="indeterminate" tone="error" />
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: "14px", fontWeight: 600 }}>
          Buffered Loading
        </span>
        <Progress value={45} buffer={75} showValue />
      </div>
    </div>
  ),
};

/* =========================
   DASHBOARD SHOWCASE
========================= */
export const DashboardShowcase: Story = {
  render: () => (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        padding: "24px",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
        display: "grid",
        gap: "20px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px", color: "var(--grey900)" }}>
          Project Status
        </h3>
        <Badge tone="primary" variant="solid">Active</Badge>
      </header>

      <section style={{ display: "grid", gap: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            color: "var(--grey600)",
          }}
        >
          <span>Development</span>
          <span>75%</span>
        </div>
        <Progress value={75} tone="primary" size="md" />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            color: "var(--grey600)",
          }}
        >
          <span>Testing</span>
          <span>40%</span>
        </div>
        <Progress value={40} buffer={60} tone="warning" size="md" />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
            color: "var(--grey600)",
          }}
        >
          <span>Security Audit</span>
          <span>95%</span>
        </div>
        <Progress value={95} tone="success" size="md" />
      </section>

      <footer
        style={{
          borderTop: "1px solid var(--grey100)",
          paddingTop: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", display: "grid", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--grey500)" }}>
            Overall Completion
          </span>
          <Progress pattern="steps" steps={10} value={70} tone="primary" />
        </div>
      </footer>
    </div>
  ),
};
