import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "../src";
import {
  FiChevronDown,
  FiPlus,
  FiMinus,
  FiX,
  FiChevronUp,
} from "react-icons/fi";

const items = [
  {
    id: "1",
    title: "What is Simple UI?",
    content:
      "Simple UI is a lightweight component library built for scalability and consistency.",
  },
  {
    id: "2",
    title: "How does Accordion work?",
    content:
      "Accordion allows users to expand and collapse sections to show or hide content.",
  },
  {
    id: "3",
    title: "Can I customize it?",
    content: "Yes, you can control variants, tones, icons, and behavior.",
  },
];

const meta: Meta<typeof Accordion> = {
  title: "Molecules/Accordion",
  component: Accordion,
  tags: ["autodocs"],

  parameters: {
    docs: {
      description: {
        component:
          "Accordion is a vertically stacked component that allows users to expand and collapse sections of content. It supports single or multiple open items, visual variants, tones, and customizable icons.",
      },
    },
  },

  args: {
    items,
    variant: "outline",
    tone: "neutral",
    single: true,
    defaultOpenId: undefined,
  },

  argTypes: {
    /* ---------------------------
       DATA
    ---------------------------- */
    items: {
      control: false,
      description: "Array of accordion items with id, title, and content",
      table: {
        category: "Data",
        type: {
          summary: "AccordionItem[]",
          detail: `{ id: string; title: ReactNode; content: ReactNode }`,
        },
      },
    },

    /* ---------------------------
       APPEARANCE
    ---------------------------- */
    variant: {
      control: "select",
      options: ["outline", "filled"],
      description: "Visual style of the accordion container",
      table: {
        category: "Appearance",
        defaultValue: { summary: "outline" },
        type: { summary: '"outline" | "filled"' },
      },
    },

    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "error"],
      description: "Color tone applied to the accordion",
      table: {
        category: "Appearance",
        defaultValue: { summary: "neutral" },
        type: {
          summary: '"neutral" | "primary" | "success" | "warning" | "error"',
        },
      },
    },

    /* ---------------------------
       BEHAVIOR
    ---------------------------- */
    single: {
      control: "boolean",
      description: "If true, only one accordion item can be open at a time",
      table: {
        category: "Behavior",
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },

    defaultOpenId: {
      control: "text",
      description: "ID of the item that should be open by default",
      table: {
        category: "Behavior",
        type: { summary: "string" },
      },
    },

    /* ---------------------------
       CUSTOMIZATION
    ---------------------------- */
    openIcon: {
      control: false,
      description: "Icon displayed when the accordion item is open",
      table: {
        category: "Customization",
        type: { summary: "ReactNode" },
      },
    },

    closeIcon: {
      control: false,
      description: "Icon displayed when the accordion item is closed",
      table: {
        category: "Customization",
        type: { summary: "ReactNode" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items: [items[0]],
  },
};

export const ChevronIcon: Story = {
  args: {
    openIcon: <FiChevronUp />,
    closeIcon: <FiChevronDown />,
  },
};

export const PlusMinus: Story = {
  args: {
    openIcon: <FiMinus />,
    closeIcon: <FiPlus />,
  },
};

export const PlusClose: Story = {
  args: {
    openIcon: <FiX />,
    closeIcon: <FiPlus />,
  },
};

export const FilledPrimary: Story = {
  args: {
    variant: "filled",
    tone: "primary",
    openIcon: <FiMinus />,
    closeIcon: <FiPlus />,
  },
};

export const MultipleOpen: Story = {
  args: {
    single: false,
    openIcon: <FiMinus />,
    closeIcon: <FiPlus />,
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpenId: "1",
    openIcon: <FiMinus />,
    closeIcon: <FiPlus />,
  },
};
