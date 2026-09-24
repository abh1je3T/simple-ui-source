import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@simple-ui/button";
import { Line } from "../src";

const meta: Meta<typeof Line> = {
  title: "Atoms/Line",
  component: Line,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "A line is used to separate content visually or semantically. Supports horizontal and vertical orientations, dashed style, and optional text labels with alignment control.",
      },
    },
  },

  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Defines line direction",
      table: {
        category: "Appearance",
        type: { summary: "horizontal | vertical" },
        defaultValue: { summary: "horizontal" },
      },
    },

    variant: {
      control: "select",
      options: ["solid", "dashed"],
      description: "Visual style of the line line",
      table: {
        category: "Appearance",
        type: { summary: "solid | dashed" },
        defaultValue: { summary: "solid" },
      },
    },

    text: {
      control: "text",
      description: "Optional text displayed inside the line",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    align: {
      control: "select",
      options: ["center", "left", "right"],
      description: "Alignment of text inside line",
      table: {
        category: "Appearance",
        type: { summary: "center | left | right" },
        defaultValue: { summary: "center" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Line>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
    variant: "solid",
  },
};

export const Dashed: Story = {
  args: {
    orientation: "horizontal",
    variant: "dashed",
  },
};

export const WithText: Story = {
  args: {
    text: "OR",
    orientation: "horizontal",
    variant: "solid",
    align: "center",
  },
};

export const WithTextLeft: Story = {
  args: {
    text: "Section",
    align: "left",
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Button variant="primary">Copy</Button>
      <Line {...args} />
      <Button variant="primary">Paste</Button>
    </div>
  ),
  args: {
    orientation: "vertical",
  },
};
