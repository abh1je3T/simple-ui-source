import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardSkeleton } from "../src";
import { Heading } from "@simple-ui/heading";
import { Button } from "@simple-ui/button";
import { Image } from "@simple-ui/image";
import { Link } from "@simple-ui/link";
import { Avatar } from "@simple-ui/avatar";
import { FiArrowUpRight } from "react-icons/fi";
import { useEffect, useState } from "react";

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "Card is a flexible container component used to group related content. It supports header, media, body, and action sections with multiple visual variants and tones.",
      },
    },
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["elevated", "filled", "outline"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "elevated" },
      },
    },

    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "error"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "neutral" },
      },
    },

    heading: {
      control: "text",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },
    titleSize: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "h3" },
      },
    },

    subtitle: {
      control: "text",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    body: {
      control: "text",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    leading: {
      control: false,
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    media: {
      control: false,
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    action: {
      control: false,
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    className: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;
type SkeletonStory = StoryObj<typeof CardSkeleton>;

const CardTemplate = (args: any) => (
  <div style={{ width: 300 }}>
    <Card {...args} />
  </div>
);

const SkeletonTemplate = (args: any) => (
  <div style={{ width: 300 }}>
    <CardSkeleton {...args} />
  </div>
);

// ---------------------------
// BASIC
// ---------------------------

export const Default: Story = {
  args: {
    heading: "AI Builder",
    subtitle: "Automation",
    leading: <Avatar name="John Markus" icon="/assets/mateo.png" />,
    media: (
      <Image src="https://picsum.photos/400/400" radius="none" ratio="sq" />
    ),
    body: "Build intelligent workflows using AI agents to automate tasks efficiently.",
    action: (
      <Link href="#" variant="primary" underline="hover">
        Explore <FiArrowUpRight />
      </Link>
    ),
  },
  render: CardTemplate,
};

// ---------------------------
// WITH LEADING
// ---------------------------

export const WithLeading: Story = {
  args: {
    heading: "Profile",
    subtitle: "User account",
    body: "Manage your personal information, preferences, and account settings.",
    leading: <Avatar name="samuel jackson" icon="/assets/john.png" />,
  },
  render: CardTemplate,
};

// ---------------------------
// WITH ACTION
// ---------------------------

export const WithAction: Story = {
  args: {
    heading: "Reports",
    subtitle: "Generate report",
    body: "Create and download detailed reports based on your selected filters.",
    action: (
      <Link href="#" variant="primary" underline="hover">
        View report <FiArrowUpRight />
      </Link>
    ),
  },
  render: CardTemplate,
};

// ---------------------------
// VARIANTS
// ---------------------------

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Card heading="Elevated" body="Default shadow card" />

      <Card variant="filled" heading="Filled" body="Subtle background" />

      <Card variant="outline" heading="Outline" body="Bordered card" />
    </div>
  ),
};

// ---------------------------
// TONES
// ---------------------------

export const Tones: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
    >
      <Card tone="neutral" heading="Neutral" body="Default tone" />
      <Card
        tone="primary"
        variant="filled"
        heading="Primary"
        body="Brand tone"
      />
      <Card
        tone="success"
        variant="filled"
        heading="Success"
        body="Success state"
      />
      <Card
        tone="warning"
        variant="filled"
        heading="Warning"
        body="Warning state"
      />
      <Card tone="error" variant="filled" heading="Error" body="Error state" />

      <Card
        tone="primary"
        variant="outline"
        heading="Primary Outline"
        body="Brand tone"
      />
      <Card
        tone="success"
        variant="outline"
        heading="Success Outline"
        body="Success state"
      />
      <Card
        tone="warning"
        variant="outline"
        heading="Warning Outline"
        body="Warning state"
      />
      <Card
        tone="error"
        variant="outline"
        heading="Error Outline"
        body="Error state"
      />
    </div>
  ),
};

// ---------------------------
// REAL UI EXAMPLE
// ---------------------------

export const DashboardExample: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Card
        heading=<Heading
          as="h4"
          children="This is heading"
          size="h4"
          weight="bold"
        />
        subtitle="This month"
        body="$24,500 (+12%) compared to last month."
        action={<Button size="sm">View</Button>}
      />
    </div>
  ),
};

export const Skeleton: SkeletonStory = {
  args: {
    showLeading: true,
    showMedia: true,
    showAction: true,
    lines: 3,
  },
  render: SkeletonTemplate,
};

export const SkeletonMinimal: SkeletonStory = {
  args: {
    showLeading: false,
    showMedia: false,
    showAction: false,
    lines: 2,
  },
  render: SkeletonTemplate,
};

export const LoadingTransition: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // simulate API delay

      return () => clearTimeout(timer);
    }, []);

    return (
      <div style={{ width: 300 }}>
        <h4 style={{ marginBottom: 12 }}>
          {loading ? "Loading..." : "Loaded"}
        </h4>

        {loading ? (
          <CardSkeleton showMedia lines={3} />
        ) : (
          <Card
            heading="AI Builder"
            subtitle="Automation"
            leading={<Avatar name="John Markus" icon="/assets/mateo.png" />}
            media={
              <Image
                src="https://picsum.photos/400/400"
                radius="none"
                ratio="sq"
              />
            }
            body="Build intelligent workflows using AI agents to automate tasks efficiently."
            action={
              <Link href="#" variant="primary">
                Explore <FiArrowUpRight />
              </Link>
            }
          />
        )}
      </div>
    );
  },
};
