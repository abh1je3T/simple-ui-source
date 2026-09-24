import type { Meta, StoryObj } from "@storybook/react";
import { DropMenu } from "../src";
import { Button } from "@simple-ui/button";
import {
  FiArrowLeft,
  FiArrowRight,
  FiRefreshCw,
  FiSave,
  FiPrinter,
  FiSearch,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useState } from "react";

const meta: Meta<typeof DropMenu> = {
  title: "Molecules/Drop Menu",
  component: DropMenu,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "The controlled open state of the menu.",
      table: { category: "State" },
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Event handler called when the open state changes.",
      table: { category: "State" },
    },
    contextMode: {
      control: "boolean",
      description:
        "Whether the menu should behave as a context menu (right-click).",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DropMenu>;

export const Default: Story = {
  render: () => (
    <DropMenu>
      <DropMenu.Trigger>
        <Button>Open Menu</Button>
      </DropMenu.Trigger>

      <DropMenu.Content>
        <DropMenu.Item onClick={() => alert("Profile")}>
          <span className="sui-dropmenu__icon">
            <FiUser />
          </span>
          <span>Profile</span>
          <span className="sui-dropmenu__shortcut">⌘P</span>
        </DropMenu.Item>

        <DropMenu.Item onClick={() => alert("Settings")}>
          <span className="sui-dropmenu__icon">
            <FiSettings />
          </span>
          <span>Settings</span>
          <span className="sui-dropmenu__shortcut">⌘S</span>
        </DropMenu.Item>

        <DropMenu.Separator />

        <DropMenu.Item onClick={() => alert("Logout")}>
          <span className="sui-dropmenu__icon">
            <FiLogOut />
          </span>
          <span>Logout</span>
          <span className="sui-dropmenu__shortcut">⌘L</span>
        </DropMenu.Item>
      </DropMenu.Content>
    </DropMenu>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <DropMenu>
      <DropMenu.Trigger>
        <Button variant="link">Menu</Button>
      </DropMenu.Trigger>

      <DropMenu.Content>
        <DropMenu.Item>Active Item</DropMenu.Item>

        <DropMenu.Item disabled>Disabled Item</DropMenu.Item>

        <DropMenu.Separator />

        <DropMenu.Item>Another Action</DropMenu.Item>
      </DropMenu.Content>
    </DropMenu>
  ),
};

export const LongMenu: Story = {
  render: () => (
    <DropMenu>
      <DropMenu.Trigger>Long Menu</DropMenu.Trigger>

      <DropMenu.Content>
        {Array.from({ length: 20 }).map((_, i) => (
          <DropMenu.Item key={i}>Item {i + 1}</DropMenu.Item>
        ))}
      </DropMenu.Content>
    </DropMenu>
  ),
};

export const Grouped: Story = {
  render: () => (
    <DropMenu>
      <DropMenu.Trigger>User</DropMenu.Trigger>

      <DropMenu.Content>
        <DropMenu.Item>Profile</DropMenu.Item>
        <DropMenu.Item>Account Settings</DropMenu.Item>

        <DropMenu.Separator />

        <DropMenu.Item>Billing</DropMenu.Item>
        <DropMenu.Item>Logout</DropMenu.Item>
      </DropMenu.Content>
    </DropMenu>
  ),
};

export const ContextMenu: Story = {
  render: () => (
    <div
      style={{
        height: "400px",
        width: "100%",
        background: "var(--grey100)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed var(--border)",
        borderRadius: "var(--radius-md)",
        color: "var(--grey500)",
        gap: "12px",
      }}
    >
      <div style={{ fontWeight: "bold", color: "var(--foreground)" }}>
        Context Menu
      </div>
      <div>Right-click anywhere on this page to open the menu</div>

      <DropMenu contextMode>
        <DropMenu.Trigger />
        <DropMenu.Content>
          <DropMenu.Item onClick={() => alert("Back")}>
            <span className="sui-dropmenu__icon">
              <FiArrowLeft />
            </span>
            <span>Back</span>
            <span className="sui-dropmenu__shortcut">Alt + [</span>
          </DropMenu.Item>

          <DropMenu.Item onClick={() => alert("Forward")} disabled>
            <span className="sui-dropmenu__icon">
              <FiArrowRight />
            </span>
            <span>Forward</span>
            <span className="sui-dropmenu__shortcut">Alt + ]</span>
          </DropMenu.Item>

          <DropMenu.Item onClick={() => alert("Reload")}>
            <span className="sui-dropmenu__icon">
              <FiRefreshCw />
            </span>
            <span>Reload</span>
            <span className="sui-dropmenu__shortcut">Ctrl + R</span>
          </DropMenu.Item>

          <DropMenu.Separator />

          <DropMenu.Item onClick={() => alert("Save as...")}>
            <span className="sui-dropmenu__icon">
              <FiSave />
            </span>
            <span>Save as...</span>
            <span className="sui-dropmenu__shortcut">Ctrl + S</span>
          </DropMenu.Item>

          <DropMenu.Item onClick={() => alert("Print")}>
            <span className="sui-dropmenu__icon">
              <FiPrinter />
            </span>
            <span>Print</span>
            <span className="sui-dropmenu__shortcut">Ctrl + P</span>
          </DropMenu.Item>

          <DropMenu.Separator />

          <DropMenu.Item onClick={() => alert("Inspect")}>
            <span className="sui-dropmenu__icon">
              <FiSearch />
            </span>
            <span>Inspect</span>
            <span className="sui-dropmenu__shortcut">F12</span>
          </DropMenu.Item>
        </DropMenu.Content>
      </DropMenu>
    </div>
  ),
};

export const ComboBox: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const options = [
      "Apple",
      "Banana",
      "Blueberry",
      "Cherry",
      "Citrus",
      "Date",
    ];

    const filteredOptions = options.filter((opt) =>
      opt.toLowerCase().includes(value.toLowerCase()),
    );

    return (
      <div style={{ height: "300px" }}>
        <DropMenu open={open} onOpenChange={setOpen}>
          <DropMenu.Trigger>
            <div
              style={{ position: "relative", width: "250px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (!open) setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Search fruits..."
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "var(--background)",
                  color: "var(--foreground)",
                  outline: "none",
                }}
              />
            </div>
          </DropMenu.Trigger>
          <DropMenu.Content>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <DropMenu.Item
                  key={opt}
                  onClick={() => {
                    setValue(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </DropMenu.Item>
              ))
            ) : (
              <div
                style={{
                  padding: "10px",
                  color: "var(--grey500)",
                  textAlign: "center",
                }}
              >
                No results found
              </div>
            )}
          </DropMenu.Content>
        </DropMenu>
      </div>
    );
  },
};
