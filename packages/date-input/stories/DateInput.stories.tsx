import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@simple-ui/button";
import { DateInput, validateFormat } from "../src";

const meta: Meta<typeof DateInput> = {
  title: "Molecules/Date Input",
  component: DateInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A segmented date entry component with per-cell validation and smart focus management. Unlike a plain `<input type=\"date\">`, it uses individual character-level cells per digit, enabling precise validation, smart auto-advance, and consistent cross-browser styling — while fully participating in native HTML forms.",
      },
    },
  },
  argTypes: {
    format: {
      description:
        "An array of date segments that defines the order and inputs rendered. Options: 'DD', 'MM', 'YYYY', 'YY'.",
      control: "object",
      table: {
        category: "Configuration",
        type: { summary: "DateSegment[]" },
        defaultValue: { summary: '["DD", "MM", "YYYY"]' },
      },
    },
    separator: {
      description:
        "The character used to separate segments visually and during serialisation.",
      control: "text",
      table: {
        category: "Configuration",
        type: { summary: "string" },
        defaultValue: { summary: '"/"' },
      },
    },
    id: {
      description:
        "The base ID for the component. Used to link a label via htmlFor.",
      control: "text",
      table: {
        category: "Integration",
        type: { summary: "string" },
      },
    },
    name: {
      description:
        "The name attribute applied to the hidden input for form submission.",
      control: "text",
      table: {
        category: "Integration",
        type: { summary: "string" },
      },
    },
    value: {
      description:
        "The controlled value of the date input (e.g., '25/06/2025'). Must match the format and separator.",
      control: "text",
      table: {
        category: "State",
        type: { summary: "string" },
      },
    },
    defaultValue: {
      description: "The initial uncontrolled value.",
      control: "text",
      table: {
        category: "State",
        type: { summary: "string" },
      },
    },
    onChange: {
      description:
        "Callback fired when the value changes. Receives the full serialised string.",
      action: "changed",
      table: {
        category: "State",
        type: { summary: "(value: string) => void" },
      },
    },
    variant: {
      description: "The visual style of the input cells.",
      control: "radio",
      options: ["underline", "boxed"],
      table: {
        category: "Appearance",
        type: { summary: '"underline" | "boxed"' },
        defaultValue: { summary: '"underline"' },
      },
    },
    size: {
      description: "The size of the input cells.",
      control: "radio",
      options: ["sm", "md", "lg"],
      table: {
        category: "Appearance",
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: '"md"' },
      },
    },
    tone: {
      description: "The semantic color tone of the input.",
      control: "select",
      options: ["neutral", "primary", "success", "warning", "error"],
      table: {
        category: "Appearance",
        type: {
          summary: '"neutral" | "primary" | "success" | "warning" | "error"',
        },
        defaultValue: { summary: '"neutral"' },
      },
    },
    disabled: {
      description: "Disables the entire date input.",
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    autoFocus: {
      description: "Automatically focuses the first cell on mount.",
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

// ── Controlled ────────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DateInput {...args} value={value} onChange={setValue} />
        <pre style={{ fontSize: 12, color: "#888" }}>value: "{value}"</pre>
      </div>
    );
  },
  args: {
    format: ["DD", "MM", "YYYY"],
    separator: "/",
    variant: "underline",
    size: "md",
    tone: "neutral",
  },
};

// ── Uncontrolled ─────────────────────────────────────────────────────────────

export const Uncontrolled: Story = {
  render: (args) => <DateInput {...args} defaultValue="01/01/2000" />,
  args: {
    format: ["DD", "MM", "YYYY"],
    separator: "/",
    variant: "underline",
    size: "md",
  },
};

// ── Format variations ─────────────────────────────────────────────────────────

export const MDY: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    format: ["MM", "DD", "YYYY"],
    separator: "/",
  },
};

export const YMD: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    format: ["YYYY", "MM", "DD"],
    separator: "-",
  },
};

export const DotSeparator: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    format: ["DD", "MM", "YYYY"],
    separator: ".",
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Boxed: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <DateInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    format: ["DD", "MM", "YYYY"],
    separator: "/",
    variant: "boxed",
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => {
    const [v, setV] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {(["sm", "md", "lg"] as const).map((size) => (
          <DateInput
            key={size}
            format={["DD", "MM", "YYYY"]}
            separator="/"
            size={size}
            value={v}
            onChange={setV}
          />
        ))}
      </div>
    );
  },
};

// ── Tones ─────────────────────────────────────────────────────────────────────

export const Tones: Story = {
  render: () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {(["neutral", "primary", "success", "warning", "error"] as const).map(
          (tone) => (
            <DateInput
              key={tone}
              format={["DD", "MM", "YYYY"]}
              separator="/"
              tone={tone}
              defaultValue="25/06/2025"
            />
          ),
        )}
      </div>
    );
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <DateInput
      format={["DD", "MM", "YYYY"]}
      separator="/"
      defaultValue="25/06/2025"
      disabled
    />
  ),
};

// ── Form submission ───────────────────────────────────────────────────────────
// Validates that the hidden input carries the full serialised value so
// a standard HTML form submission (or FormData) sees a single "dob=25/06/2025"
// entry rather than individual cell values.

export const FormSubmission: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState<Record<string, string> | null>(
      null,
    );
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
        string,
        string
      >;
      setSubmitted(data);
    };

    const handleReset = () => {
      setValue("");
      setSubmitted(null);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          minWidth: 320,
        }}
      >
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
              htmlFor="dob-input"
              style={{ fontSize: 14, fontWeight: 500 }}
            >
              Date of birth
            </label>
            <DateInput
              id="dob"
              name="dob"
              format={["DD", "MM", "YYYY"]}
              separator="/"
              variant="boxed"
              value={value}
              onChange={setValue}
            />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Button type="submit">Submit</Button>
            <Button type="reset">Reset</Button>
          </div>
        </form>

        {submitted && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#888" }}>
              FormData output
            </span>
            <pre
              style={{
                fontSize: 12,
                background: "#f5f5f5",
                padding: "10px 14px",
                borderRadius: 6,
                margin: 0,
              }}
            >
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  },
};

// ── YY format variations ───────────────────────────────────────────────────

export const DDMMYY: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DateInput {...args} value={value} onChange={setValue} />
        <pre style={{ fontSize: 12, color: "#888" }}>value: "{value}"</pre>
      </div>
    );
  },
  args: {
    format: ["DD", "MM", "YY"],
    separator: "/",
    variant: "underline",
    size: "md",
  },
};

export const YYMMDD: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DateInput {...args} value={value} onChange={setValue} />
        <pre style={{ fontSize: 12, color: "#888" }}>value: "{value}"</pre>
      </div>
    );
  },
  args: {
    format: ["YY", "MM", "DD"],
    separator: "-",
    variant: "underline",
    size: "md",
  },
};

export const MonthYear: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DateInput {...args} value={value} onChange={setValue} />
        <pre style={{ fontSize: 12, color: "#888" }}>value: "{value}"</pre>
      </div>
    );
  },
  args: {
    format: ["MM", "YYYY"],
    separator: "/",
    variant: "boxed",
    size: "md",
  },
};

// ── Invalid format — validation error boundary ─────────────────────────────
// Demonstrates that validateFormat() throws early with a clear message
// before any input segments are created. Wrap in an error boundary in
// production; here we catch in render for story purposes.

const BadFormatDemo = ({ format }: { format: any }) => {
  try {
    // Validate eagerly — before React renders DateInput — so the error is
    // caught here rather than propagating as a React render error.
    validateFormat(format);
    return (
      <DateInput format={format} separator="/" value="" onChange={() => {}} />
    );
  } catch (e: any) {
    return (
      <pre
        style={{
          fontSize: 12,
          color: "#c0392b",
          background: "#fdf0ef",
          padding: "10px 14px",
          borderRadius: 6,
          margin: 0,
          whiteSpace: "pre-wrap",
        }}
      >
        {e.message}
      </pre>
    );
  }
};

export const InvalidFormats: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minWidth: 420,
      }}
    >
      {[
        { label: "Empty format: []", format: [] },
        {
          label: "Duplicate segment: [DD, DD, MM]",
          format: ["DD", "DD", "MM"],
        },
        {
          label: "YYYY + YY together: [DD, MM, YYYY, YY]",
          format: ["DD", "MM", "YYYY", "YY"],
        },
        { label: "DD without MM: [DD, YYYY]", format: ["DD", "YYYY"] },
        {
          label: "Unknown segment: [DD, MM, YYYYY]",
          format: ["DD", "MM", "YYYYY"],
        },
      ].map(({ label, format }) => (
        <div
          key={label}
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color: "#888" }}>
            {label}
          </span>
          <BadFormatDemo format={format} />
        </div>
      ))}
    </div>
  ),
};
