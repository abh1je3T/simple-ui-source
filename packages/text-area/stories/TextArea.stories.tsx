import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextArea } from "../src";

const meta: Meta<typeof TextArea> = {
  title: "Atoms/Text Area",
  component: TextArea,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A flexible textarea with auto-resize, size system, tone variants, controlled/uncontrolled usage, and an optional character counter. Counter colour follows the active tone and switches to error red when the limit is exceeded.",
      },
    },
  },

  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        category: "Appearance",
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "md" },
      },
    },

    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "error"],
      table: {
        category: "Appearance",
        type: {
          summary: "'neutral' | 'primary' | 'success' | 'warning' | 'error'",
        },
        defaultValue: { summary: "neutral" },
      },
    },

    placeholder: {
      control: "text",
      table: { category: "Content" },
    },

    minRows: {
      control: "number",
      table: {
        category: "Layout",
        type: { summary: "number" },
        defaultValue: { summary: "—" },
      },
    },

    maxRows: {
      control: "number",
      table: {
        category: "Layout",
        type: { summary: "number" },
        defaultValue: { summary: "—" },
      },
    },

    disabled: {
      control: "boolean",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },

    readOnly: {
      control: "boolean",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },

    maxLength: {
      control: "number",
      table: {
        category: "Validation",
        type: { summary: "number" },
      },
    },

    showCharCount: {
      control: "boolean",
      table: {
        category: "Validation",
        defaultValue: { summary: "false" },
      },
    },

    renderCharCount: {
      control: false,
      table: {
        category: "Validation",
        type: {
          summary:
            "(args: { length: number; maxLength?: number }) => ReactNode",
        },
      },
    },

    onChange: {
      action: "changed",
      table: {
        category: "Events",
        type: { summary: "(value: string) => void" },
      },
    },

    className: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

/* =========================
   PLAYGROUND
========================= */
export const Playground: Story = {
  args: {
    placeholder: "Write something...",
    size: "md",
    tone: "neutral",
    minRows: 3,
  },
};

/* =========================
   DEFAULT
========================= */
export const Default: Story = {
  args: {
    placeholder: "Write something...",
    size: "md",
    tone: "neutral",
  },
};

/* =========================
   SIZES
========================= */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: 400 }}>
      <TextArea size="sm" minRows={2} placeholder="Small — sm" />
      <TextArea size="md" minRows={3} placeholder="Medium — md" />
      <TextArea size="lg" minRows={4} placeholder="Large — lg" />
    </div>
  ),
};

/* =========================
   TONES
========================= */
export const Tones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: 400 }}>
      <TextArea tone="neutral" minRows={2} placeholder="Neutral" />
      <TextArea tone="primary" minRows={2} placeholder="Primary" />
      <TextArea tone="success" minRows={2} placeholder="Success" />
      <TextArea tone="warning" minRows={2} placeholder="Warning" />
      <TextArea tone="error" minRows={2} placeholder="Error" />
    </div>
  ),
};

/* =========================
   AUTO RESIZE (NOTION-LIKE)
   Grows with content, no scrollbar until maxRows is hit.
========================= */
export const AutoResize: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div style={{ width: 400 }}>
        <TextArea
          value={value}
          onChange={setValue}
          minRows={3}
          placeholder="Start typing — this grows with your content and caps at 10 rows..."
        />
      </div>
    );
  },
};

/* =========================
   MIN / MAX ROWS
   Starts at minRows, scrolls after maxRows.
========================= */
export const MinMaxRows: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div style={{ display: "grid", gap: 16, width: 400 }}>
        <div>
          <p style={{ fontSize: 12, marginBottom: 4, color: "#73767F" }}>
            minRows=2, maxRows=5 — scrolls after 5 rows
          </p>
          <TextArea
            value={value}
            onChange={setValue}
            minRows={2}
            maxRows={5}
            placeholder="Capped at 5 rows then scrolls..."
          />
        </div>

        <div>
          <p style={{ fontSize: 12, marginBottom: 4, color: "#73767F" }}>
            minRows=4, no maxRows — grows indefinitely
          </p>
          <TextArea minRows={4} placeholder="Grows forever..." />
        </div>
      </div>
    );
  },
};

/* =========================
   CONTROLLED
========================= */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div style={{ display: "grid", gap: 8, width: 400 }}>
        <TextArea
          {...args}
          value={value}
          onChange={setValue}
          minRows={3}
          placeholder="Controlled — value owned externally"
        />
        <button onClick={() => setValue("")}>Clear</button>
      </div>
    );
  },
};

/* =========================
   UNCONTROLLED
========================= */
export const Uncontrolled: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <TextArea
        defaultValue="Initial content — browser manages the value from here."
        minRows={3}
        placeholder="Uncontrolled"
      />
    </div>
  ),
};

/* =========================
   STATES
========================= */
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: 400 }}>
      <TextArea disabled minRows={2} placeholder="Disabled — not interactive" />
      <TextArea
        readOnly
        minRows={2}
        value="Read-only — value is visible but not editable."
      />
    </div>
  ),
};

/* =========================
   CHARACTER COUNTER — TONE AWARE
   Counter colour follows the active tone.
   Switches to error red when limit is exceeded.
========================= */
export const CharacterCounter: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div style={{ display: "grid", gap: 16, width: 400 }}>
        {(["neutral", "primary", "success", "warning", "error"] as const).map(
          (tone) => (
            <TextArea
              key={tone}
              tone={tone}
              value={value}
              onChange={setValue}
              maxLength={80}
              showCharCount
              minRows={2}
              placeholder={`${tone} — counter matches tone colour`}
            />
          ),
        )}
      </div>
    );
  },
};

/* =========================
   OVER LIMIT
   Counter turns error red, border turns error.
   Typing is still allowed (validation happens on submit).
========================= */
export const OverLimit: Story = {
  render: () => {
    const seed =
      "This textarea already has more characters than the limit allows. ";
    const [value, setValue] = useState(seed);

    return (
      <div style={{ width: 400 }}>
        <TextArea
          tone="primary"
          value={value}
          onChange={setValue}
          maxLength={50}
          showCharCount
          minRows={3}
          placeholder="Type here..."
        />
      </div>
    );
  },
};

/* =========================
   COUNTER MUTED IN READONLY / DISABLED
   Counter stays grey regardless of tone.
========================= */
export const CounterMuted: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: 400 }}>
      <TextArea
        tone="primary"
        disabled
        value="Disabled — counter is muted grey"
        maxLength={100}
        showCharCount
        minRows={2}
      />
      <TextArea
        tone="success"
        readOnly
        value="Read-only — counter is muted grey"
        maxLength={100}
        showCharCount
        minRows={2}
      />
    </div>
  ),
};

/* =========================
   CUSTOM COUNTER
========================= */
export const CustomCounter: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const MAX = 200;
    const remaining = MAX - value.length;

    return (
      <div style={{ width: 400 }}>
        <TextArea
          tone="primary"
          value={value}
          onChange={setValue}
          maxLength={MAX}
          minRows={4}
          placeholder="Custom counter render..."
          renderCharCount={({ length, maxLength }) => (
            <span
              style={{
                fontSize: 12,
                color: remaining < 0 ? "var(--error-base)" : "var(--grey500)",
              }}
            >
              {remaining > -1
                ? `${remaining} characters remaining`
                : `${Math.abs(remaining)} over the limit`}
            </span>
          )}
        />
      </div>
    );
  },
};
