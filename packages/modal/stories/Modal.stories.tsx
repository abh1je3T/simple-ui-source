import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Modal } from "../src";
import { Button } from "@simple-ui/button";
import { Heading } from "@simple-ui/heading";
import { FormField } from "@simple-ui/form-field";
import { Input } from "@simple-ui/input";
import { Avatar } from "@simple-ui/avatar";
import { Switch } from "@simple-ui/switch";
import { Badge } from "@simple-ui/badge";
import { TextArea } from "@simple-ui/text-area";

/* =========================
   META
========================= */

const meta: Meta<typeof Modal> = {
  title: "Organisms/Modal",
  component: Modal,
  tags: ["autodocs"],

  argTypes: {
    open: {
      description: "Controls modal visibility",
      control: "boolean",
      table: { category: "State" },
    },
    onClose: {
      description: "Triggered on close actions",
      action: "closed",
      table: { category: "Events" },
    },
    title: {
      description: "Modal header title",
      control: "text",
      table: { category: "Content" },
    },
    children: {
      description: "Modal body content",
      control: false,
      table: { category: "Content" },
    },

    tone: {
      description: "Visual tone of modal",
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      table: {
        category: "Appearance",
        defaultValue: { summary: "secondary" },
      },
    },

    size: {
      description: "Modal size",
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      table: {
        category: "Layout",
        defaultValue: { summary: "md" },
      },
    },

    closeOnBackdropClick: {
      description: "Close when clicking outside modal",
      control: "boolean",
      table: { category: "Behavior", defaultValue: { summary: "true" } },
    },

    closeOnEsc: {
      description: "Close on ESC key press",
      control: "boolean",
      table: { category: "Behavior", defaultValue: { summary: "true" } },
    },

    showCloseIcon: {
      description: "Show close button in header",
      control: "boolean",
      table: { category: "Appearance", defaultValue: { summary: "true" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

/* =========================
   BASE TEMPLATE
========================= */

const ModalTemplate = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0, color: "var(--grey600)" }}>
            This is a reusable modal content area using Simple UI components.
          </p>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

/* =========================
   DEFAULT
========================= */

export const Default: Story = {
  render: ModalTemplate,
  args: {
    title: "Default Modal",
    size: "md",
    tone: "secondary",
    showCloseIcon: true,
  },
};

/* =========================
   TONES
========================= */

export const Tones: Story = {
  render: () => {
    const ToneDemo = ({ tone }: any) => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setOpen(true)}>{tone}</Button>

          <Modal
            open={open}
            onClose={() => setOpen(false)}
            tone={tone}
            title={`${tone} Modal`}
          >
            <p>
              This modal uses <b>{tone}</b> tone styling.
            </p>

            <Button
              style={{ width: "100%", marginTop: 16 }}
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </Modal>
        </>
      );
    };

    return (
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <ToneDemo tone="primary" />
        <ToneDemo tone="secondary" />
        <ToneDemo tone="tertiary" />
      </div>
    );
  },
};

/* =========================
   SIZES
========================= */

export const Sizes: Story = {
  render: () => {
    const SizeDemo = ({ size }: any) => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setOpen(true)}>{size}</Button>

          <Modal
            open={open}
            onClose={() => setOpen(false)}
            size={size}
            title={`${size} Modal`}
          >
            <div
              style={{
                height: 120,
                background: "var(--grey100)",
                borderRadius: 8,
                display: "grid",
                placeItems: "center",
                marginTop: 12,
              }}
            >
              {size} content area
            </div>
          </Modal>
        </>
      );
    };

    return (
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <SizeDemo size="sm" />
        <SizeDemo size="md" />
        <SizeDemo size="lg" />
        <SizeDemo size="xl" />
      </div>
    );
  },
};

/* =========================
   PROFILE EXAMPLE (REAL WORLD)
========================= */

export const ProfileEdit: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Edit Profile</Button>

        <Modal open={open} onClose={() => setOpen(false)} title="Edit Profile">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Avatar name="Jane Smith" size="lg" />
              <div>
                <Heading size="h5">Jane Smith</Heading>
                <p style={{ margin: 0, color: "var(--grey500)" }}>
                  Product Designer
                </p>
              </div>

              <Button size="sm" style={{ marginLeft: "auto" }}>
                Change Photo
              </Button>
            </div>

            <FormField label="Name">
              <Input defaultValue="Jane Smith" />
            </FormField>

            <FormField label="Bio">
              <TextArea defaultValue="Designing better futures." rows={3} />
            </FormField>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Public Profile</span>
              <Switch defaultChecked />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 12,
                borderTop: "1px solid var(--control-border)",
                paddingTop: 16,
              }}
            >
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Save
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

/* =========================
   DELETE CONFIRMATION
========================= */

export const DeleteConfirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Delete Project</Button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Delete project?"
          size="sm"
        >
          <p>
            This action will permanently delete the project and cannot be
            undone.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <Button
              variant="secondary"
              style={{ flex: 1 }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" style={{ flex: 1 }}>
              Delete
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

/* =========================
   LONG CONTENT
========================= */

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Terms</Button>

        <Modal open={open} onClose={() => setOpen(false)} title="Terms">
          <div style={{ maxHeight: 400, overflow: "auto" }}>
            <Heading size="h5">Section 1</Heading>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
              libero aspernatur culpa nemo labore necessitatibus unde aperiam,
              delectus saepe accusamus optio ducimus excepturi fugit sit
              asperiores nisi! Quibusdam, neque impedit? Nostrum aliquid minus,
              aspernatur dolor ab nulla. Beatae cum tenetur voluptate enim,
              pariatur, explicabo non dolores consequatur ipsam asperiores
              dolorum praesentium placeat quos! Veritatis in soluta laudantium
              odit voluptatibus optio! Commodi, ipsum voluptatem, nemo ex itaque
              rerum quia minima quasi, modi ratione consequuntur facilis quos
              repellat dicta quae repudiandae non. Modi, labore ullam iusto quos
              impedit quasi. Vel, sit voluptates. Nulla alias quam quo molestias
              reprehenderit rem mollitia atque minus modi omnis consequatur,
              dolor ullam eum magni iste reiciendis itaque! Error dolores libero
              ullam consectetur possimus fuga magni reprehenderit consequuntur.
              Dolor neque reiciendis architecto, repellat magnam illo eaque
              aliquid ducimus harum soluta ipsum quod facere quibusdam totam, et
              laborum delectus autem beatae facilis in perferendis minus
              distinctio. Reiciendis, veritatis quasi!
            </p>

            <Heading size="h5">Section 2</Heading>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus nulla error sapiente animi a odit perferendis
              itaque iure magni corrupti. Deleniti doloribus ipsum iste adipisci
              quod eveniet, atque eum blanditiis. Iure sequi dicta nemo pariatur
              fugiat alias. Rem beatae voluptas repudiandae eligendi minima
              nulla in esse reiciendis iste quibusdam! Laborum quibusdam placeat
              obcaecati impedit ea, numquam fugit id et velit. Quisquam
              quibusdam dolor at rem quidem possimus aliquam, dignissimos quae
              nesciunt, veritatis optio eaque ipsam cupiditate alias? Quae,
              molestiae ipsum, ipsa aliquid tempore quam aliquam cum voluptates
              nobis laudantium sint.
            </p>

            <Heading size="h5">Section 3</Heading>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Cupiditate maxime at, ratione quos laborum nulla voluptates quidem
              autem fugit quisquam possimus ducimus esse, sapiente ab dolorem
              illum assumenda aliquam? Obcaecati?
            </p>
          </div>
        </Modal>
      </>
    );
  },
};
