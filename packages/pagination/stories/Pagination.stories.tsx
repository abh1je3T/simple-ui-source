import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "../src";

const meta: Meta<typeof Pagination> = {
  title: "Molecules/Pagination",
  component: Pagination,
  tags: ["autodocs"],

  argTypes: {
    /* =========================
     STATE
  ========================= */
    page: {
      control: { type: "number", min: 1 },
      description: "The current active page (1-based).",
      table: {
        category: "State",
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },

    totalPages: {
      control: { type: "number", min: 1 },
      description: "The total number of available pages.",
      table: {
        category: "State",
        type: { summary: "number" },
        defaultValue: { summary: "10" },
      },
    },

    /* =========================
     BEHAVIOR
  ========================= */
    onChange: {
      action: "page-changed",
      description:
        "Callback function triggered when a page is selected or changed.",
      table: {
        category: "Behavior",
        type: { summary: "(page: number) => void" },
      },
    },

    siblingCount: {
      control: { type: "number", min: 0, max: 5 },
      description:
        "The number of page buttons to show on each side of the current page.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "1" },
      },
    },

    boundaryCount: {
      control: { type: "number", min: 1, max: 3 },
      description:
        "The number of page buttons to show at the beginning and end of the range.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "1" },
      },
    },

    showPrevNext: {
      control: "boolean",
      description:
        "Whether to display the 'Prev' and 'Next' navigation buttons.",
      table: {
        category: "Behavior",
        defaultValue: { summary: "true" },
      },
    },

    /* =========================
     APPEARANCE
  ========================= */
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The visual size of the pagination buttons.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "md" },
      },
    },

    tone: {
      control: "select",
      options: ["primary", "neutral", "success", "warning", "error"],
      description: "The semantic color tone of the pagination.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "primary" },
      },
    },

    variant: {
      control: "select",
      options: ["solid", "subtle"],
      description: "The visual style of the pagination buttons.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "solid" },
      },
    },

    /* =========================
     SYSTEM
  ========================= */
    className: {
      control: false,
      description: "Additional CSS classes to apply to the root element.",
      table: {
        category: "System",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const ControlledPagination = (args: any) => {
  const [page, setPage] = useState(args.page ?? 1);

  return (
    <Pagination
      {...args}
      page={page}
      onChange={(p) => {
        setPage(p);
        args.onChange?.(p);
      }}
    />
  );
};

/* =========================
   DEFAULT
========================= */
export const Default: Story = {
  args: {
    page: 1,
    totalPages: 10,
    size: "md",
    tone: "primary",
    variant: "solid",
    siblingCount: 1,
    boundaryCount: 1,
    showPrevNext: true,
  },

  render: ControlledPagination,
};

/* =========================
   SMALL / MEDIUM / LARGE
========================= */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 12 }}>
      <ControlledPagination {...args} size="sm" />
      <ControlledPagination {...args} size="md" />
      <ControlledPagination {...args} size="lg" />
    </div>
  ),

  args: {
    page: 3,
    totalPages: 10,
  },
};

/* =========================
   TONES
========================= */
export const Tones: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 12 }}>
      <ControlledPagination {...args} tone="primary" />
      <ControlledPagination {...args} tone="success" />
      <ControlledPagination {...args} tone="warning" />
      <ControlledPagination {...args} tone="error" />
      <ControlledPagination {...args} tone="neutral" />
    </div>
  ),

  args: {
    page: 2,
    totalPages: 10,
  },
};

/* =========================
   PATTERN: SHORT vs LONG
========================= */
export const Patterns: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 16 }}>
      <ControlledPagination {...args} totalPages={5} />
      <ControlledPagination {...args} totalPages={20} />
    </div>
  ),

  args: {
    page: 1,
  },
};

/* =========================
   APPEARANCE (solid vs subtle)
========================= */
export const Appearance: Story = {
  render: () => {
    const [page, setPage] = useState(4);

    return (
      <div style={{ display: "grid", gap: 12 }}>
        <Pagination
          page={page}
          totalPages={10}
          onChange={setPage}
          variant="solid"
        />

        <Pagination
          page={page}
          totalPages={10}
          onChange={setPage}
          variant="subtle"
        />
      </div>
    );
  },
};

/* =========================
   WITH PREV / NEXT
========================= */
export const WithPrevNext: Story = {
  render: () => {
    const [page, setPage] = useState(5);

    return (
      <Pagination page={page} totalPages={10} onChange={setPage} showPrevNext />
    );
  },
};

/* =========================
   CUSTOM SIBLINGS / BOUNDARIES
========================= */
export const CustomBehaviour: Story = {
  render: () => {
    const [page, setPage] = useState(6);

    return (
      <div style={{ display: "grid", gap: 12 }}>
        {/* more compact */}
        <Pagination
          page={page}
          totalPages={20}
          siblingCount={0}
          boundaryCount={1}
          onChange={setPage}
        />

        {/* more expanded */}
        <Pagination
          page={page}
          totalPages={20}
          siblingCount={2}
          boundaryCount={2}
          onChange={setPage}
        />
      </div>
    );
  },
};

/* =========================
   REAL WORLD EXAMPLE (10 pages UX)
========================= */
export const RealWorld10Pages: Story = {
  render: () => {
    const [page, setPage] = useState(1);

    return (
      <Pagination
        page={page}
        totalPages={10}
        siblingCount={1}
        boundaryCount={1}
        onChange={setPage}
        showPrevNext
      />
    );
  },
};
