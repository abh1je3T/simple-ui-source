import type { Meta, StoryObj } from "@storybook/react";
import { useState, Fragment } from "react";
import { FiMinus } from "react-icons/fi";
import { RiSeparator } from "react-icons/ri";
import { HiOutlineSlash } from "react-icons/hi2";
import { OTPInput } from "../src";

const meta: Meta<typeof OTPInput> = {
  title: "Molecules/OTP Input",
  component: OTPInput,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    /* =========================
       CORE
    ========================= */
    value: {
      control: false,
      description: "The combined string value of all OTP input fields.",
      table: {
        category: "Core",
      },
    },
    onChange: {
      action: "changed",
      description: "Callback function triggered when the OTP value changes.",
      table: {
        category: "Core",
      },
    },
    length: {
      control: { type: "number", min: 1, max: 12 },
      description: "The total number of digits/characters in the OTP.",
      table: {
        category: "Core",
      },
    },

    /* =========================
       LAYOUT
    ========================= */
    variant: {
      control: "select",
      options: ["boxed", "underline"],
      description: "The visual style of the input fields.",
      table: {
        category: "Layout",
        defaultValue: { summary: "underline" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The visual size of the input fields.",
      table: {
        category: "Layout",
        defaultValue: { summary: "md" },
      },
    },
    group: {
      control: "object",
      description:
        "An array of numbers defining the grouping of inputs (e.g., [2, 2, 2]).",
      table: {
        category: "Layout",
      },
    },
    separator: {
      control: "text",
      description: "The character or element to display between groups.",
      table: {
        category: "Layout",
      },
    },

    /* =========================
       STATE
    ========================= */
    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "error"],
      description: "The semantic color tone of the inputs.",
      table: {
        category: "State",
        defaultValue: { summary: "neutral" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the entire input group is disabled.",
      table: {
        category: "State",
        defaultValue: { summary: "false" },
      },
    },

    /* =========================
       BEHAVIOR
    ========================= */
    autoFocus: {
      control: "boolean",
      description:
        "Whether to automatically focus the first input field on mount.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },
    inputMode: {
      control: "select",
      options: ["numeric", "text"],
      description: "The type of keyboard to display on mobile devices.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "numeric" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof OTPInput>;

/* =========================
   CONTROLLED BASE STORY
========================= */
export const Default: Story = {
  args: {
    length: 6,
    group: [2, 2, 2],
    separator: "-",
    variant: "boxed",
    size: "md",
    tone: "neutral",
    autoFocus: true,
  },

  render: (args) => {
    const [otp, setOtp] = useState("");

    return (
      <Fragment>
        <OTPInput {...args} value={otp} onChange={setOtp} />
      </Fragment>
    );
  },
};

/* =========================
   UNDERLINE VARIANT
========================= */
export const Underline: Story = {
  args: {
    length: 6,
    variant: "underline",
    size: "md",
    tone: "primary",
    group: [3, 3],
    separator: "-",
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return <OTPInput {...args} value={value} onChange={setValue} />;
  },
};

/* =========================
   SIZE VARIANTS
========================= */
export const Sizes: Story = {
  args: {
    length: 6,
    variant: "boxed",
    tone: "neutral",
    group: [3, 3],
    separator: "-",
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <OTPInput {...args} size="sm" value={value} onChange={setValue} />
        <OTPInput {...args} size="md" value={value} onChange={setValue} />
        <OTPInput {...args} size="lg" value={value} onChange={setValue} />
      </div>
    );
  },
};

/* =========================
   TONE VARIANTS
========================= */
export const Tones: Story = {
  args: {
    length: 6,
    variant: "underline",
    size: "md",
    group: [3, 3],
    separator: "-",
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <OTPInput {...args} tone="neutral" value={value} onChange={setValue} />
        <OTPInput {...args} tone="primary" value={value} onChange={setValue} />
        <OTPInput {...args} tone="success" value={value} onChange={setValue} />
        <OTPInput {...args} tone="warning" value={value} onChange={setValue} />
        <OTPInput {...args} tone="error" value={value} onChange={setValue} />
      </div>
    );
  },
};

/* =========================
   DISABLED STATE
========================= */
export const Disabled: Story = {
  args: {
    length: 6,
    variant: "boxed",
    tone: "neutral",
    disabled: true,
    value: "123456",
    separator: "-",
    group: [2, 2, 2],
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return <OTPInput {...args} value={value} onChange={setValue} />;
  },
};

/* =========================
   AUTO FOCUS
========================= */
export const AutoFocus: Story = {
  args: {
    length: 6,
    variant: "underline",
    tone: "primary",
    autoFocus: true,
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return <OTPInput {...args} value={value} onChange={setValue} />;
  },
};

/* =========================
   FULL GROUPING UX
========================= */
export const Grouped: Story = {
  args: {
    length: 6,
    variant: "boxed",
    tone: "primary",
    group: [2, 2, 2],
    separator: "-",
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return <OTPInput {...args} value={value} onChange={setValue} />;
  },
};

export const IconSeparatorShowcase: Story = {
  args: {
    length: 6,
    variant: "boxed",
    size: "md",
    tone: "neutral",
    group: [2, 2, 2],
  },

  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <OTPInput
          {...args}
          separator={<FiMinus />}
          value={value}
          onChange={setValue}
        />
        <OTPInput
          {...args}
          separator={<RiSeparator />}
          tone="primary"
          value={value}
          onChange={setValue}
        />
        <OTPInput
          {...args}
          separator={<HiOutlineSlash />}
          tone="success"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};
