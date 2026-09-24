import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "../src";

const meta: Meta<typeof Loader> = {
  title: "Atoms/Loader",
  component: Loader,
  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: ["spinner", "dots", "glow", "bars"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "spinner" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "md" },
      },
    },
    tone: {
      control: "select",
      options: ["primary", "secondary", "neutral"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "primary" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Loader>;

/* ================= DEFAULT ================= */

export const Default: Story = {
  args: {},
};

/* ================= VARIANTS ================= */

export const Variants: Story = {
  render: () => {
    const variants = ["spinner", "dots", "glow", "bars"] as const;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--layout-spacing-xl)",
          padding: "var(--layout-spacing-xl)",
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <section>
          <h3
            style={{
              marginBottom: "var(--layout-spacing-md)",
              fontSize: "var(--font-size-lg)",
              fontWeight: "var(--font-weight-semibold)",
            }}
          >
            Loader Variants
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "var(--layout-spacing-md)",
            }}
          >
            {variants.map((variant) => (
              <div
                key={variant}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--layout-spacing-lg)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--layout-spacing-sm)",
                  boxShadow: "var(--shadows-sm)",
                }}
              >
                <Loader variant={variant} />

                <span
                  style={{
                    fontSize: "var(--font-size-sm)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {variant}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  },
};

/* ================= SIZES ================= */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
    </div>
  ),
};

/* ================= TONES ================= */

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Loader tone="primary" />
      <Loader tone="secondary" />
      <Loader tone="neutral" />
    </div>
  ),
};

/* ================= MATRIX (BEST ONE 🔥) ================= */

export const PlaygroundMatrix: Story = {
  render: () => {
    const variants = ["spinner", "dots", "glow", "bars"] as const;
    const tones = ["primary", "secondary", "neutral"] as const;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--layout-spacing-xl)",
          padding: "var(--layout-spacing-xl)",
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {variants.map((variant) => (
          <section key={variant}>
            {/* Section Title */}
            <h3
              style={{
                marginBottom: "var(--layout-spacing-md)",
                fontSize: "var(--font-size-lg)",
                fontWeight: "var(--font-weight-semibold)",
                textTransform: "capitalize",
              }}
            >
              {variant}
            </h3>

            {/* Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "var(--layout-spacing-md)",
              }}
            >
              {tones.map((tone) => (
                <div
                  key={tone}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    padding: "var(--layout-spacing-lg)",
                    textAlign: "center",
                    boxShadow: "var(--shadows-sm)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "var(--layout-spacing-md)",
                    minHeight: "100px",
                  }}
                >
                  {/* Loader */}
                  <Loader variant={variant} tone={tone} />

                  {/* Label */}
                  <div
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--muted-foreground)",
                      textTransform: "capitalize",
                    }}
                  >
                    {tone}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};
