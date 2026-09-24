import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Avatar } from "../src";
import { Badge } from "@simple-ui/badge";

const Ari = "/assets/ari.png";
const John = "/assets/john.png";
const Isha = "/assets/isha.png";

const meta: Meta<typeof Avatar> = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "Avatar component supporting initials, image fallback, tone variants, status indicators, clickable states, and optional badge overlay. Designed for user identity representation across UI systems.",
      },
    },
  },

  argTypes: {
    name: {
      control: "text",
      description: "User name used to generate initials fallback",
      table: {
        category: "Content",
        type: { summary: "string" },
        defaultValue: { summary: "-" },
      },
    },

    icon: {
      control: false,
      description:
        "Image URL (string) or ReactNode icon. If string, treated as image source.",
      table: {
        category: "Content",
        type: { summary: "string | ReactNode" },
      },
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Controls avatar dimensions and typography scale",
      table: {
        category: "Appearance",
        type: { summary: "AvatarSize" },
        defaultValue: { summary: "md" },
      },
    },

    shape: {
      control: "select",
      options: ["circle", "square"],
      description: "Defines avatar border shape",
      table: {
        category: "Appearance",
        type: { summary: "AvatarShape" },
        defaultValue: { summary: "circle" },
      },
    },

    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "error"],
      description: "Background tone for fallback/initials avatar",
      table: {
        category: "Appearance",
        type: { summary: "AvatarTone" },
        defaultValue: { summary: "neutral" },
      },
    },

    clickable: {
      control: "boolean",
      description: "Enables hover and focus interaction styles",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    showStatus: {
      control: "boolean",
      description: "Shows presence indicator (online/away/busy)",
      table: {
        category: "Status",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    status: {
      control: "select",
      options: ["online", "away", "busy"],
      description: "User presence state (only visible if showStatus is true)",
      table: {
        category: "Status",
        type: { summary: "AvatarStatus" },
        defaultValue: { summary: "online" },
      },
    },

    badge: {
      control: false,
      description:
        "Custom badge slot (e.g. notification count, dot, or custom component). Overrides status indicator.",
      table: {
        category: "Overlay",
        type: { summary: "ReactNode" },
      },
    },

    className: {
      control: false,
      table: {
        disable: true,
      },
    },

    onClick: {
      action: "clicked",
      description: "Click handler for interactive avatars",
      table: {
        category: "Events",
        type: { summary: "() => void" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

/* ---------------- DEFAULT ---------------- */

export const Default: Story = {
  args: {
    name: "John Doe",
  },
};

/* ---------------- VARIANTS ---------------- */

export const Variants: Story = {
  render: () => (
    <div style={container}>
      {[
        {
          title: "Initials",
          items: [<Avatar name="John Doe" />, <Avatar name="A" />],
        },
        {
          title: "Image",
          items: [<Avatar name="John" icon={Ari} />],
        },
        {
          title: "Icon",
          items: [
            <Avatar
              icon={
                <span>
                  <svg
                    viewBox="0 0 36 36"
                    fill="none"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                  >
                    <mask
                      id="_r_1p_"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="36"
                      height="36"
                    >
                      <rect
                        width="36"
                        height="36"
                        rx="72"
                        fill="#FFFFFF"
                      ></rect>
                    </mask>
                    <g mask="url(#_r_1p_)">
                      <rect width="36" height="36" fill="#ffb238"></rect>
                      <rect
                        x="0"
                        y="0"
                        width="36"
                        height="36"
                        transform="translate(6 -2) rotate(76 18 18) scale(1.1)"
                        fill="#49007e"
                        rx="6"
                      ></rect>
                      <g transform="translate(4 -4) rotate(-6 18 18)">
                        <path
                          d="M15 20c2 1 4 1 6 0"
                          stroke="#FFFFFF"
                          fill="none"
                          stroke-linecap="round"
                        ></path>
                        <rect
                          x="13"
                          y="14"
                          width="1.5"
                          height="2"
                          rx="1"
                          stroke="none"
                          fill="#FFFFFF"
                        ></rect>
                        <rect
                          x="21"
                          y="14"
                          width="1.5"
                          height="2"
                          rx="1"
                          stroke="none"
                          fill="#FFFFFF"
                        ></rect>
                      </g>
                    </g>
                  </svg>
                </span>
              }
            />,
          ],
        },
      ].map((section) => (
        <Section key={section.title} {...section} />
      ))}
    </div>
  ),
};

/* ---------------- SIZES ---------------- */

export const Sizes: Story = {
  render: () => (
    <div style={row}>
      <Avatar size="sm" name="JD" />
      <Avatar size="md" name="JD" />
      <Avatar size="lg" name="JD" />
    </div>
  ),
};

/* ---------------- SHAPES ---------------- */

export const Shapes: Story = {
  render: () => (
    <div style={row}>
      <Avatar shape="circle" name="JD" />
      <Avatar shape="square" name="JD" />
    </div>
  ),
};

/* ---------------- TONES ---------------- */

export const Tones: Story = {
  render: () => {
    const tones = [
      "neutral",
      "primary",
      "success",
      "warning",
      "error",
    ] as const;

    return (
      <div style={grid}>
        {tones.map((tone) => (
          <Card key={tone} label={tone}>
            <Avatar name="JD" tone={tone} />
          </Card>
        ))}
      </div>
    );
  },
};

/* ---------------- STATUS ---------------- */

export const Status: Story = {
  render: () => {
    const statuses = ["online", "away", "busy"] as const;

    return (
      <div style={grid}>
        {statuses.map((status) => (
          <Card key={status} label={status}>
            <Avatar name="JD" showStatus status={status} />
          </Card>
        ))}
      </div>
    );
  },
};

/* ---------------- BADGE ---------------- */

export const WithBadge: Story = {
  render: () => (
    <div style={row}>
      <Avatar
        name="John"
        badge={
          <Badge tone="error" size="sm">
            5
          </Badge>
        }
      />

      <Avatar
        name="Jane"
        badge={
          <Badge tone="error" size="sm">
            120
          </Badge>
        }
      />

      <Avatar
        name="Alex"
        badge={
          <Badge tone="primary" size="sm">
            New
          </Badge>
        }
      />
    </div>
  ),
};

/* ---------------- CLICKABLE ---------------- */

export const Clickable: Story = {
  args: {
    name: "Avatar Click",
    clickable: true,
  },

  render: (args) => (
    <div style={row}>
      <Avatar {...args} />
      <Avatar {...args} name="With Image" icon={John} />
    </div>
  ),
};

/* ---------------- REAL WORLD ---------------- */

export const RealWorld: Story = {
  render: () => (
    <div style={container}>
      <Section
        title="Chat User"
        items={[
          <Avatar name="John Doe" icon={Ari} showStatus status="online" />,
        ]}
      />

      <Section
        title="Notifications"
        items={[
          <Avatar
            name="Jane"
            icon={Isha}
            badge={
              <Badge tone="success" size="sm">
                99+
              </Badge>
            }
          />,
        ]}
      />
    </div>
  ),
};

/* ---------------- UI HELPERS ---------------- */

const container: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--layout-spacing-xl)",
  padding: "var(--layout-spacing-xl)",
  background: "var(--background)",
};

const row: React.CSSProperties = {
  display: "flex",
  gap: "var(--layout-spacing-md)",
  alignItems: "center",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "var(--layout-spacing-md)",
};

const Section = ({
  title,
  items,
}: {
  title: string;
  items: React.ReactNode[];
}) => (
  <section>
    <h3 style={titleStyle}>{title}</h3>
    <div style={row}>{items}</div>
  </section>
);

const Card = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => (
  <div style={card}>
    {children}
    <div style={labelStyle}>{label}</div>
  </div>
);

const titleStyle: React.CSSProperties = {
  marginBottom: "var(--layout-spacing-md)",
  fontSize: "var(--font-size-lg)",
  fontWeight: "var(--font-weight-semibold)",
};

const card: React.CSSProperties = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  padding: "var(--layout-spacing-md)",
  textAlign: "center",
};

const labelStyle: React.CSSProperties = {
  marginTop: "var(--layout-spacing-sm)",
  fontSize: "var(--font-size-xs)",
  color: "var(--muted-foreground)",
};
