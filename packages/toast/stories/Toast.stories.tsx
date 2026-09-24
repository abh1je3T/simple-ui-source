import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ToastContainer, ToastProvider, useToast } from "../src";
import { Button } from "@simple-ui/button";
import { ToastContainerProps } from "../src/Toast/components/ToastContainer";
import { ToastTone, ToastVariant, ToastSize } from "../src/Toast/types/Toast.types";

interface ToastStoryProps extends ToastContainerProps {
  tone?: ToastTone;
  variant?: ToastVariant;
  size?: ToastSize;
  duration?: number;
  pauseOnHover?: boolean;

  // Actions
  onToastAdd?: () => void;
  onToastRemove?: () => void;
}

const meta: Meta<ToastStoryProps> = {
  title: "Organisms/Toast",
  component: ToastContainer,

  decorators: [
    (Story, context) => (
      <ToastProvider>
        <Story />
        <ToastContainer
          position={context.args.position}
          gap={context.args.gap}
          maxToasts={context.args.maxToasts}
          className={context.args.className}
        />
      </ToastProvider>
    ),
  ],

  parameters: {
    layout: "padded",

    docs: {
      description: {
        component: `
Toast is a global feedback system that displays temporary messages with queueing, animation handling, and async promise support.

### Features
- Queue management (max limit support)
- Auto & manual dismiss
- Pause on hover
- Promise-based API
- Multiple tones & variants
        `,
      },
    },
  },

  argTypes: {
    // ❌ Container has no real props → explicitly disable controls
    className: {
      table: { disable: true },
    },

    // 🧠 Documentation grouping (important)
    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "error", "warning", "info"],
      table: {
        category: "Appearance",
      },
    },

    variant: {
      control: "select",
      options: ["subtle", "solid"],
      table: {
        category: "Appearance",
      },
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        category: "Appearance",
      },
    },

    duration: {
      control: "number",
      table: {
        category: "Behavior",
      },
    },

    pauseOnHover: {
      control: "boolean",
      table: {
        category: "Behavior",
      },
    },

    // Container-level props (if you ever add them later)
    maxToasts: {
      table: {
        category: "System",
      },
      description: "Maximum number of toasts visible at once",
    },

    position: {
      table: {
        category: "Layout",
      },
      control: "select",
      options: [
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "top-center",
        "bottom-center",
      ],
      description: "Position of toast container on screen",
    },

    gap: {
      table: {
        category: "Layout",
      },
      control: "number",
      defaultValue: 8,
      description: "Spacing between stacked toasts",
    },

    // Actions (future proofing if needed)
    onToastAdd: {
      action: "toast-added",
      table: {
        category: "Events",
      },
    },

    onToastRemove: {
      action: "toast-removed",
      table: {
        category: "Events",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<ToastStoryProps>;

export const BasicSuccess: Story = {
  render: () => {
    const Demo = () => {
      const toast = useToast();
      return (
        <Button onClick={() => toast.success("Operation successful!")}>
          Show Success
        </Button>
      );
    };
    return <Demo />;
  },
};

export const BasicError: Story = {
  render: () => {
    const Demo = () => {
      const toast = useToast();
      return (
        <Button onClick={() => toast.error("Something went wrong!")}>
          Show Error
        </Button>
      );
    };
    return <Demo />;
  },
};

export const SubtleVsSolid: Story = {
  render: () => {
    const Demo = () => {
      const toast = useToast();

      return (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            onClick={() => toast.success("Subtle toast", { variant: "subtle" })}
          >
            Subtle
          </Button>

          <Button
            onClick={() => toast.success("Solid toast", { variant: "solid" })}
          >
            Solid
          </Button>
        </div>
      );
    };

    return <Demo />;
  },
};

export const Sizes: Story = {
  render: () => {
    const Demo = () => {
      const toast = useToast();

      return (
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => toast.success("Small", { size: "sm" })}>
            Small
          </Button>
          <Button onClick={() => toast.success("Medium", { size: "md" })}>
            Medium
          </Button>
          <Button onClick={() => toast.success("Large", { size: "lg" })}>
            Large
          </Button>
        </div>
      );
    };

    return <Demo />;
  },
};

export const QueueLimit: Story = {
  render: () => {
    const Demo = () => {
      const toast = useToast();

      const spamToasts = () => {
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            toast.success(`Toast ${i + 1}`);
          }, i * 80);
        }
      };

      return (
        <Button onClick={spamToasts}>Trigger 10 Toasts (Max 5 Queue)</Button>
      );
    };

    return <Demo />;
  },
};

export const NoAutoDismiss: Story = {
  render: () => {
    const Demo = () => {
      const toast = useToast();

      return (
        <Button onClick={() => toast.info("Persistent toast", { duration: 0 })}>
          Persistent Toast
        </Button>
      );
    };

    return <Demo />;
  },
};

export const PromiseToast: Story = {
  render: () => {
    const Demo = () => {
      const toast = useToast();

      const fakeAPI = () =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            Math.random() > 0.5 ? resolve("OK") : reject("FAILED");
          }, 1500);
        });

      const run = () => {
        toast.promise(fakeAPI(), {
          loading: "Saving...",
          success: "Saved successfully!",
          error: "Save failed!",
        });
      };

      return <Button onClick={run}>Promise Toast</Button>;
    };

    return <Demo />;
  },
};

export const Positions: Story = {
  args: {
    position: "top-center",
  },
  render: () => {
    const Demo = () => {
      const toast = useToast();
      return (
        <Button onClick={() => toast.info("Check my position!")}>
          Show Centered Toast
        </Button>
      );
    };
    return <Demo />;
  },
};

export const Playground: Story = {
  args: {
    position: "bottom-right",
    gap: 12,
    maxToasts: 3,
    tone: "success",
    variant: "subtle",
    size: "md",
    duration: 3000,
    pauseOnHover: true,
  },

  render: (args: any) => {
    const Demo = () => {
      const toast = useToast();

      return (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            onClick={() =>
              toast.success("Toast with playground settings", {
                tone: args.tone,
                variant: args.variant,
                size: args.size,
                duration: args.duration,
                pauseOnHover: args.pauseOnHover,
              })
            }
          >
            Show Toast
          </Button>
          <Button onClick={() => toast.clear()}>
            Clear All
          </Button>
        </div>
      );
    };

    return <Demo />;
  },
};
