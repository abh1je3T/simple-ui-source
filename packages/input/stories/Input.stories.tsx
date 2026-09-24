import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "../src";
import { FaSearch, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A flexible input component with support for sizes, tones, prefix/suffix icons, and controlled/uncontrolled usage.",
      },
    },
  },

  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        category: "Appearance",
        type: { summary: "InputSize" },
        defaultValue: { summary: "md" },
      },
    },

    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "error"],
      table: {
        category: "Appearance",
        type: { summary: "InputTone" },
        defaultValue: { summary: "neutral" },
      },
    },

    type: {
      control: "select",
      options: ["text", "password"],
      table: {
        category: "Behavior",
        type: { summary: "'text' | 'password'" },
        defaultValue: { summary: "text" },
      },
    },

    placeholder: {
      control: "text",
      table: {
        category: "Content",
      },
    },

    value: {
      control: "text",
      table: {
        category: "State",
        type: { summary: "string" },
      },
    },

    defaultValue: {
      control: "text",
      table: {
        category: "State",
        type: { summary: "string" },
      },
    },

    disabled: {
      control: "boolean",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },

    prefix: {
      control: false,
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    suffix: {
      control: false,
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    className: {
      table: { disable: true },
    },

    onChange: {
      action: "changed",
      table: {
        category: "Events",
        type: { summary: "(value: string) => void" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

/* =========================
   PLAYGROUND
========================= */
export const Playground: Story = {
  args: {
    placeholder: "Enter text...",
    size: "md",
    tone: "neutral",
  },
};

/* =========================
   ALL SIZES (clean matrix)
========================= */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: 320 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Input key={size} size={size} placeholder={`${size} input`} />
      ))}
    </div>
  ),
};
/* =========================
   ALL TONES (clean matrix)
========================= */
export const Tones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Input tone="neutral" placeholder="Neutral" />
      <Input tone="primary" placeholder="Primary" />
      <Input tone="success" placeholder="Success" />
      <Input tone="warning" placeholder="Warning" />
      <Input tone="error" placeholder="Error" />
    </div>
  ),
};

/* =========================
   WITH PREFIX / SUFFIX
========================= */
export const WithAffixes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Input prefix={<FaUser />} placeholder="Username" />
      <Input suffix={<FaSearch />} placeholder="Search" />
    </div>
  ),
};

/* =========================
   DISABLED STATES
========================= */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
      <Input disabled placeholder="Disabled input" value="Locked value" />
      <Input
        disabled
        prefix={<FaUser />}
        placeholder="Disabled with icon"
        value="User"
      />
    </div>
  ),
};

/* =========================
   CONTROLLED (CORRECT PATTERN)
========================= */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div style={{ display: "grid", gap: 8, width: 320 }}>
        <Input {...args} value={value} onChange={setValue} />
        <button onClick={() => setValue("")}>Reset</button>
      </div>
    );
  },
};
/* =========================
   UNCONTROLLED (IMPORTANT)
========================= */
export const Uncontrolled: Story = {
  render: () => {
    return <Input defaultValue="Initial value" placeholder="Uncontrolled" />;
  },
};

/* =========================
   PASSWORD INPUT (FIXED)
========================= */
export const Password: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const [show, setShow] = useState(false);

    return (
      <div style={{ width: 320 }}>
        <Input
          {...args}
          type={show ? "text" : "password"}
          value={value}
          onChange={setValue}
          placeholder="Enter password"
          suffix={
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
          }
        />
      </div>
    );
  },
};
