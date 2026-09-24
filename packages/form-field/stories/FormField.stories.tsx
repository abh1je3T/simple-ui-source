import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  FormField,
  FormFieldControl,
  FormFieldLabel,
  FormFieldMessage,
} from "../src";

import { Input } from "@simple-ui/input";
import { Dropdown } from "@simple-ui/dropdown";
import { Checkbox } from "@simple-ui/checkbox";
import { Button } from "@simple-ui/button";

const meta: Meta<typeof FormField> = {
  title: "Molecules/Form Field",
  component: FormField,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "FormField is a layout + accessibility wrapper that standardizes form control structure. It handles label association, helper/error messaging, disabled state propagation, and accessibility wiring for any input-like component (Input, Dropdown, Checkbox, Radio, etc.).",
      },
    },
  },

  argTypes: {
    label: {
      control: "text",
      description:
        "Label text displayed above the form control. When provided, automatically renders FormFieldLabel and associates it with the control via accessibility attributes.",
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },

    error: {
      control: "text",
      description:
        "Error message displayed below the field. When set, it overrides helperText and applies error styles + accessibility error state.",
      table: {
        category: "Validation",
        type: { summary: "string" },
      },
    },

    helperText: {
      control: "text",
      description:
        "Optional helper text shown below the field when no error is present. Used for guidance or hints.",
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },

    required: {
      control: "boolean",
      description:
        "Marks the field as required and displays a required indicator (*) on the label.",
      table: {
        category: "Validation",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    children: {
      control: false,
      description:
        "Form control element(s) such as Input, Dropdown, Checkbox, Radio, Textarea, or custom controls.",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    className: {
      control: "text",
      description:
        "Additional CSS class applied to the root FormField container.",
      table: {
        category: "Styling",
        type: { summary: "string" },
      },
    },

    id: {
      control: false,
      description:
        "Optional HTML id forwarded to the root wrapper (inherited from HTMLDivElement).",
      table: {
        category: "Advanced",
        type: { summary: "string" },
      },
    },

    style: {
      control: false,
      description: "Inline styles applied to the root FormField container.",
      table: {
        category: "Styling",
        type: { summary: "CSSProperties" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormField>;

// ---------------------------
// SIMPLE API STORIES
// ---------------------------

export const Default: Story = {
  args: {
    label: "Name",
    children: (
      <FormFieldControl>
        <Input placeholder="Enter your name" />
      </FormFieldControl>
    ),
  },
};

export const Required: Story = {
  render: () => (
    <FormField label="Email" required>
      <FormFieldControl>
        <Input placeholder="Enter email" />
      </FormFieldControl>
    </FormField>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    helperText: "Must be unique",
    children: (
      <FormFieldControl>
        <Input placeholder="Enter username" />
      </FormFieldControl>
    ),
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    error: "Invalid email address",
    children: (
      <FormFieldControl>
        <Input placeholder="Enter email" />
      </FormFieldControl>
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: "Name",
    helperText: "Field is disabled",
    children: (
      <FormFieldControl>
        <Input placeholder="Disabled input" />
      </FormFieldControl>
    ),
  },
};

export const WithDropdown: Story = {
  render: () => (
    <FormField label="Country" style={{ width: "200px" }}>
      <FormFieldControl>
        <Dropdown
          options={[
            { label: "India", value: "in" },
            { label: "UK", value: "uk" },
            { label: "USA", value: "us" },
          ]}
        />
      </FormFieldControl>
    </FormField>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <FormField label="Accept Terms">
      <FormFieldControl>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Checkbox />

          <span>
            Do you agree with terms and conditions{" "}
            <sup style={{ color: "red" }}>*</sup>
          </span>
        </div>
      </FormFieldControl>
    </FormField>
  ),
};

// ---------------------------
// VALIDATION STORY (REAL WORLD)
// ---------------------------

export const FormWithValidation: Story = {
  render: () => {
    const [values, setValues] = useState({
      name: "",
      email: "",
      country: "",
      terms: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const validateField = (key: string, value: any) => {
      switch (key) {
        case "name":
          return !value ? "Name is required" : "";

        case "email":
          if (!value) return "Email is required";
          if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email";
          return "";

        case "country":
          return !value ? "Select a country" : "";

        case "terms":
          return !value ? "You must accept terms" : "";

        default:
          return "";
      }
    };

    const handleChange = (key: string, value: any) => {
      setValues((prev) => ({ ...prev, [key]: value }));

      // mark touched
      setTouched((prev) => ({ ...prev, [key]: true }));

      // only validate live after first submit OR if already touched
      if (hasSubmitted || touched[key]) {
        const error = validateField(key, value);

        setErrors((prev) => {
          const updated = { ...prev };

          if (error) updated[key] = error;
          else delete updated[key];

          return updated;
        });
      }
    };

    const validateAll = () => {
      const e: Record<string, string> = {};

      Object.keys(values).forEach((key) => {
        const error = validateField(key, (values as any)[key]);
        if (error) e[key] = error;
      });

      return e;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      setHasSubmitted(true);

      const v = validateAll();
      setErrors(v);

      setTouched({
        name: true,
        email: true,
        country: true,
        terms: true,
      });

      if (Object.keys(v).length === 0) {
        alert("Form submitted 🎉");
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 500,
        }}
      >
        {/* NAME */}
        <FormField label="Name" required error={errors.name}>
          <FormFieldControl>
            <Input
              value={values.name}
              onChange={(v) => handleChange("name", v)}
            />
          </FormFieldControl>
        </FormField>

        {/* EMAIL */}
        <FormField label="Email" required error={errors.email}>
          <FormFieldControl>
            <Input
              value={values.email}
              onChange={(v) => handleChange("email", v)}
            />
          </FormFieldControl>
        </FormField>

        {/* COUNTRY */}
        <FormField
          label="Country"
          error={errors.country}
          style={{ width: "165px" }}
        >
          <FormFieldControl>
            <Dropdown
              options={[
                { label: "India", value: "in" },
                { label: "UK", value: "uk" },
              ]}
              value={values.country}
              onChange={(v) => handleChange("country", v)}
            />
          </FormFieldControl>
        </FormField>

        {/* TERMS */}
        <FormField error={errors.terms}>
          <FormFieldControl>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Checkbox
                checked={values.terms}
                onChange={(v) => handleChange("terms", v)}
              />

              <span>
                Do you agree with terms and conditions{" "}
                <sup style={{ color: "red" }}>*</sup>
              </span>
            </div>
          </FormFieldControl>
        </FormField>

        <Button type="submit" style={{ width: "165px" }}>
          Submit
        </Button>
      </form>
    );
  },
};

// ---------------------------
// COMPOUND API (ADVANCED)
// ---------------------------

export const CompoundUsage: Story = {
  render: () => (
    <FormField>
      <FormFieldLabel required>Email</FormFieldLabel>

      <Input placeholder="Enter email" />

      <FormFieldMessage>We’ll never share your email</FormFieldMessage>
    </FormField>
  ),
};

export const CustomLayout: Story = {
  render: () => (
    <FormField label="Verification">
      <div style={{ display: "flex", gap: 8 }}>
        <Input placeholder="Enter code" />
        <Button type="button">Send</Button>
      </div>
    </FormField>
  ),
};
