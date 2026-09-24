import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "../src";

const Ari = "/assets/ari.png";
const John = "/assets/john.png";
const Kim = "/assets/kim.png";
const Isha = "/assets/isha.png";
const Mateo = "/assets/mateo.png";
const Ed = "/assets/ed.png";

const meta: Meta<typeof AvatarGroup> = {
  title: "Molecules/Avatar Group",
  component: AvatarGroup,

  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "AvatarGroup displays multiple avatars in a stacked layout with overflow handling and optional ordering direction.",
      },
    },
  },

  argTypes: {
    max: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "Maximum number of visible avatars before overflow",
      table: {
        category: "Behavior",
        type: { summary: "number" },
        defaultValue: { summary: "4" },
      },
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of all avatars inside the group",
      table: {
        category: "Appearance",
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
    },

    spacing: {
      control: "radio",
      options: ["tight", "normal"],
      description: "Spacing between avatars in the group",
      table: {
        category: "Layout",
        type: { summary: "tight | normal" },
        defaultValue: { summary: "normal" },
      },
    },

    stacked: {
      control: "radio",
      options: ["left", "right"],
      description: "Direction of stacking (Slack vs Teams style)",
      table: {
        category: "Layout",
        type: { summary: "left | right" },
        defaultValue: { summary: "left" },
      },
    },

    children: {
      control: false,
      description: "Avatar components to render inside the group",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AvatarGroup>;

/* ---------------- SAMPLE DATA ---------------- */

type User = {
  name: string;
  icon?: string;
};

const users: User[] = [
  { name: "John Doe", icon: John },
  { name: "Jane Smith", icon: Ari },
  { name: "Alex Johnson", icon: Ed },
  { name: "Emily Davis", icon: Kim },
  { name: "Michael Brown", icon: Mateo },
  { name: "Sarah Wilson", icon: Isha },
];
/* ---------------- DEFAULT ---------------- */

export const Default: Story = {
  args: {
    max: 4,
    size: "md",
    spacing: "normal",
    stacked: "left",
  },

  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h3 style={{ margin: 0 }}>Team Members</h3>

      <AvatarGroup {...args}>
        {users.map((user, i) => (
          <Avatar
            key={i}
            name={user.name}
            size={args.size}
            showStatus={i % 2 === 0}
            status={i % 3 === 0 ? "online" : i % 3 === 1 ? "away" : "busy"}
            tone="neutral"
          />
        ))}
      </AvatarGroup>

      <p style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
        Max {args.max} visible avatars + overflow counter
      </p>
    </div>
  ),
};

/* ---------------- VARIANTS ---------------- */

export const TightSpacing: Story = {
  args: {
    max: 5,
    spacing: "tight",
    size: "md",
    stacked: "left",
  },

  render: (args) => (
    <AvatarGroup {...args}>
      {users.map((user, i) => (
        <Avatar key={i} name={user.name} />
      ))}
    </AvatarGroup>
  ),
};

export const RightStack: Story = {
  args: {
    max: 4,
    stacked: "right",
    size: "md",
    spacing: "normal",
  },

  render: (args) => (
    <AvatarGroup {...args}>
      {users.map((user, i) => (
        <Avatar key={i} name={user.name} />
      ))}
    </AvatarGroup>
  ),
};

export const WithImages: Story = {
  args: {
    max: 4,
    size: "md",
  },

  render: (args) => (
    <AvatarGroup {...args}>
      {users.map((user, i) => (
        <Avatar key={i} name={user.name} icon={user.icon} />
      ))}
    </AvatarGroup>
  ),
};
