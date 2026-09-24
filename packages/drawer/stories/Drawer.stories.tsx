import type { Meta, StoryObj } from "@storybook/react";
import { Drawer, DrawerAnchor, DrawerTone } from "../src";
import { useState } from "react";
import { Button } from "@simple-ui/button";
import { Heading } from "@simple-ui/heading";
import { Avatar } from "@simple-ui/avatar";
import { Switch } from "@simple-ui/switch";
import { FormField } from "@simple-ui/form-field";
import { Input } from "@simple-ui/input";

const meta: Meta<typeof Drawer> = {
  title: "Organisms/Drawer",
  component: Drawer,
  tags: ["autodocs"],

  argTypes: {
    open: {
      control: false,
      table: {
        category: "State",
      },
    },

    onClose: {
      action: "closed",
      table: {
        category: "Events",
      },
    },

    children: {
      control: false,
      table: {
        category: "Content",
      },
    },

    anchor: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      table: {
        category: "Layout",
        defaultValue: { summary: "right" },
      },
    },

    tone: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "neutral" },
      },
    },

    showDragHandle: {
      control: "boolean",
      table: {
        category: "Interaction",
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

// 🧩 Reusable DrawerTemplate
const DrawerTemplate = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="primary">
        Open Drawer
      </Button>

      <Drawer {...args} open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <Heading size="h4" weight="semibold">
            Drawer Content
          </Heading>
          <p style={{ color: "var(--grey500)", margin: 0 }}>
            This is a sample drawer content built using Simple UI components.
          </p>
          <div style={{ marginTop: "auto", paddingTop: 24 }}>
            <Button
              onClick={() => setOpen(false)}
              variant="secondary"
              style={{ width: "100%" }}
            >
              Close Drawer
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export const Default: Story = {
  render: DrawerTemplate,
  args: {
    anchor: "right",
    tone: "primary",
    showDragHandle: true,
  },
};

// 🎯 1 story for all anchors
export const Anchors: Story = {
  render: () => {
    const [openState, setOpenState] = useState<{
      open: boolean;
      anchor: DrawerAnchor;
    }>({
      open: false,
      anchor: "right",
    });

    const handleOpen = (anchor: DrawerAnchor) => {
      setOpenState({ open: true, anchor });
    };

    return (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {(["left", "right", "top", "bottom"] as DrawerAnchor[]).map(
          (anchor) => (
            <Button
              key={anchor}
              onClick={() => handleOpen(anchor)}
              variant="primary"
            >
              Open {anchor}
            </Button>
          ),
        )}

        <Drawer
          open={openState.open}
          anchor={openState.anchor}
          onClose={() => setOpenState({ ...openState, open: false })}
        >
          <div
            style={{
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <Heading size="h4" weight="semibold">
              Anchored to the {openState.anchor}
            </Heading>
            <p style={{ color: "var(--grey500)" }}>
              The drawer naturally aligns to the specified edge.
            </p>
            <Button
              onClick={() => setOpenState({ ...openState, open: false })}
              variant="primary"
            >
              Close
            </Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

// 🎨 1 story for all tones
export const Tones: Story = {
  render: () => {
    const [openState, setOpenState] = useState<{
      open: boolean;
      tone: DrawerTone;
    }>({
      open: false,
      tone: "primary",
    });

    const handleOpen = (tone: DrawerTone) => {
      setOpenState({ open: true, tone });
    };

    return (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {(["primary", "secondary", "tertiary"] as DrawerTone[]).map((tone) => (
          <Button key={tone} onClick={() => handleOpen(tone)}>
            {tone} Tone
          </Button>
        ))}

        <Drawer
          open={openState.open}
          tone={openState.tone}
          onClose={() => setOpenState({ ...openState, open: false })}
        >
          <div
            style={{
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <Heading size="h4" weight="semibold">
              Drawer with {openState.tone} tone
            </Heading>
            <p style={{ color: "var(--grey500)" }}>
              The drawer adapts its styling based on the semantic tone.
            </p>
            <Button
              onClick={() => setOpenState({ ...openState, open: false })}
              variant="primary"
            >
              Close
            </Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

// 🧲 1 story for drag handle toggle
export const DragHandle: Story = {
  render: () => {
    const [openDrag, setOpenDrag] = useState(false);
    const [openNoDrag, setOpenNoDrag] = useState(false);

    return (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Button onClick={() => setOpenDrag(true)} variant="primary">
          With Drag Handle (Swipeable)
        </Button>
        <Button onClick={() => setOpenNoDrag(true)}>Without Drag Handle</Button>

        <Drawer
          open={openDrag}
          anchor="bottom"
          showDragHandle={true}
          onClose={() => setOpenDrag(false)}
        >
          <div style={{ padding: 24, paddingBottom: 48, textAlign: "center" }}>
            <Heading size="h4" weight="semibold">
              Swipe down to close
            </Heading>
            <p style={{ color: "var(--grey500)", marginTop: 8 }}>
              The handle indicates this drawer can be dragged.
            </p>
          </div>
        </Drawer>

        <Drawer
          open={openNoDrag}
          anchor="right"
          showDragHandle={false}
          onClose={() => setOpenNoDrag(false)}
        >
          <div
            style={{
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <Heading size="h4" weight="semibold">
              Static Drawer
            </Heading>
            <p style={{ color: "var(--grey500)" }}>
              No drag handle present. Must close via overlay or button.
            </p>
            <Button onClick={() => setOpenNoDrag(false)} variant="secondary">
              Close
            </Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

// 💼 1 real-life composite story
export const EditProfile: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)} variant="primary">
          Edit Profile
        </Button>

        <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            {/* Header */}
            <div
              style={{
                padding: "24px 24px 16px",
                borderBottom: "1px solid var(--control-border)",
              }}
            >
              <Heading size="h4" weight="bold">
                Edit Profile
              </Heading>
              <p style={{ color: "var(--grey500)", margin: "4px 0 0" }}>
                Update your personal details and settings.
              </p>
            </div>

            {/* Content */}
            <div
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 24,
                overflowY: "auto",
                flex: 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Avatar name="Jane Doe" size="lg" />
                <Button size="sm">Change Avatar</Button>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <FormField label="Full Name">
                  <Input
                    defaultValue="Jane Doe"
                    placeholder="Enter your name"
                  />
                </FormField>

                <FormField label="Email Address">
                  <Input
                    defaultValue="jane@example.com"
                    type="email"
                    placeholder="you@example.com"
                  />
                </FormField>
              </div>

              <hr
                style={{
                  border: 0,
                  borderTop: "1px solid var(--control-border)",
                  margin: "8px 0",
                }}
              />

              <div>
                <Heading size="h6" weight="semibold">
                  Preferences
                </Heading>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500 }}>Email Notifications</div>
                      <div style={{ fontSize: 14, color: "var(--grey500)" }}>
                        Receive updates about your account.
                      </div>
                    </div>
                    <Switch
                      checked={notifications}
                      onChange={setNotifications}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500 }}>Dark Mode</div>
                      <div style={{ fontSize: 14, color: "var(--grey500)" }}>
                        Toggle application theme.
                      </div>
                    </div>
                    <Switch checked={darkMode} onChange={setDarkMode} />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: 24,
                borderTop: "1px solid var(--control-border)",
                display: "flex",
                gap: 12,
                marginTop: "auto",
              }}
            >
              <Button
                onClick={() => setOpen(false)}
                variant="primary"
                style={{ flex: 1 }}
              >
                Save Changes
              </Button>
              <Button
                onClick={() => setOpen(false)}
                variant="secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};
