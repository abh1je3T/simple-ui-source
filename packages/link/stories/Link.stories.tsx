import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "../src";

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A polymorphic link component that supports both native anchor navigation and framework-based routing via the `as` prop. Works with React Router, Next.js, or any custom navigation system without coupling the design system to a specific router.",
      },
    },
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["default", "muted", "primary", "danger"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "default" },
      },
    },

    underline: {
      control: "select",
      options: ["always", "hover", "none"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "hover" },
      },
    },

    disabled: {
      control: "boolean",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },

    external: {
      control: "boolean",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },

    children: {
      control: "text",
      table: {
        category: "Content",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Default Link",
  },
};

export const Primary: Story = {
  args: {
    href: "#",
    variant: "primary",
    children: "Primary Link",
  },
};

export const Muted: Story = {
  args: {
    href: "#",
    variant: "muted",
    children: "Muted Link",
  },
};

export const UnderlineAlways: Story = {
  args: {
    href: "#",
    underline: "always",
    children: "Always Underlined Link",
  },
};

export const UnderlineHover: Story = {
  args: {
    href: "#",
    underline: "hover",
    children: "Hover Underline Link",
  },
};

export const External: Story = {
  args: {
    href: "https://example.com",
    external: true,
    children: "External Link",
  },
};

export const Disabled: Story = {
  args: {
    href: "#",
    disabled: true,
    children: "Disabled Link",
  },
};

const MockRouterLink = ({ to, children, onClick, ...props }: any) => {
  return (
    <a
      href={to}
      {...props}
      onClick={(e) => {
        e.preventDefault();

        alert(`Navigating to: ${to}`);

        // preserve external handlers if any
        if (onClick) onClick(e);
      }}
    >
      {children}
    </a>
  );
};

export const WithRouter: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Link as={MockRouterLink} to="/home">
        Home
      </Link>

      <Link as={MockRouterLink} to="/about" variant="primary">
        About
      </Link>

      <Link as={MockRouterLink} to="/settings" variant="muted">
        Settings
      </Link>
    </div>
  ),
};

export const MixedNavigation: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
      {/* normal anchor */}
      <Link href="https://example.com" external>
        External Website
      </Link>

      {/* router style */}
      <Link as={MockRouterLink} to="/dashboard" variant="primary">
        Dashboard (SPA)
      </Link>

      {/* fallback anchor */}
      <Link href="/help" variant="muted">
        Help Center
      </Link>
    </div>
  ),
};

export const WhyPolymorphic: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <h4>Default (HTML anchor)</h4>
        <Link href="/about">About Us</Link>
      </div>

      <div>
        <h4>Router mode (same component)</h4>
        <Link as={MockRouterLink} to="/about">
          About Us
        </Link>
      </div>
    </div>
  ),
};
