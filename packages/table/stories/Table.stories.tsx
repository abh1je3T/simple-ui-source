import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { Table } from "../src";
import { Badge } from "@simple-ui/badge";
import { Avatar } from "@simple-ui/avatar";
import { Checkbox } from "@simple-ui/checkbox";
import { Progress } from "@simple-ui/progress";
import { TableColumn, TableSortState } from "../src/Table/types";

const meta: Meta<typeof Table> = {
  title: "Organisms/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    // Appearance
    appearance: {
      control: "select",
      options: ["solid", "subtle"],
      description: "The overall visual style of the table.",
      table: { category: "Appearance", defaultValue: { summary: "solid" } },
    },
    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "error", "warning", "info"],
      description: "The semantic color theme applied to the table.",
      table: { category: "Appearance", defaultValue: { summary: "neutral" } },
    },
    size: {
      control: "select",
      options: ["compact", "comfortable", "spacious"],
      description: "The density of the table layout (padding and spacing).",
      table: {
        category: "Appearance",
        defaultValue: { summary: "comfortable" },
      },
    },
    className: {
      control: "text",
      description: "Custom CSS class for the table container.",
      table: { category: "Appearance" },
    },

    // Data
    columns: {
      control: "object",
      description: "Array of column definitions.",
      table: { category: "Data" },
    },
    selectedKeys: {
      control: "object",
      description: "Set of currently selected row IDs.",
      table: { category: "Selection & Expansion" },
    },
    onSelectionChange: {
      action: "onSelectionChange",
      description: "Callback triggered when row selection changes.",
      table: { category: "Selection & Expansion" },
    },

    // Behavior
    sticky: {
      control: "object",
      description: "Configuration for sticky header or columns.",
      table: { category: "Behavior" },
    },
    draggableColumns: {
      control: "boolean",
      description: "Enables column reordering via drag and drop.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    onColumnOrderChange: {
      action: "onColumnOrderChange",
      description: "Callback triggered when columns are reordered.",
      table: { category: "Behavior" },
    },
    draggableRows: {
      control: "boolean",
      description: "Enables row reordering via drag and drop.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    onRowOrderChange: {
      action: "onRowOrderChange",
      description: "Callback triggered when rows are reordered.",
      table: { category: "Behavior" },
    },
    allowPinning: {
      control: "boolean",
      description: "Enables interactive column pinning by the user.",
      table: { category: "Behavior", defaultValue: { summary: "false" } },
    },
    onColumnPinChange: {
      action: "onColumnPinChange",
      description: "Callback triggered when a column is pinned or unpinned.",
      table: { category: "Behavior" },
    },
    sortState: {
      control: "object",
      description: "Current sorting configuration (key and direction).",
      table: { category: "Behavior" },
    },
    onSortChange: {
      action: "onSortChange",
      description: "Callback triggered when sorting changes.",
      table: { category: "Behavior" },
    },
    columnWidths: {
      control: "object",
      description: "Map of column keys to their custom widths.",
      table: { category: "Behavior" },
    },
    onColumnResize: {
      action: "onColumnResize",
      description: "Callback triggered when a column is resized.",
      table: { category: "Behavior" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

/* =========================
   MOCK DATA
========================= */

const USERS = [
  {
    id: 1,
    name: "Alice Freeman",
    email: "alice@example.com",
    status: "Active",
    role: "Admin",
    avatar: "AF",
  },
  {
    id: 2,
    name: "Bob Ross",
    email: "bob@example.com",
    status: "Inactive",
    role: "Editor",
    avatar: "BR",
  },
  {
    id: 3,
    name: "Charlie Day",
    email: "wildcard@example.com",
    status: "Pending",
    role: "Viewer",
    avatar: "CD",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "wonder@example.com",
    status: "Active",
    role: "Manager",
    avatar: "DP",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "impossible@example.com",
    status: "Active",
    role: "Agent",
    avatar: "EH",
  },
];

const MANY_USERS = Array.from({ length: 20 }).map((_, i) => ({
  ...USERS[i % USERS.length],
  id: i + 1,
  joined: `2024-0${(i % 9) + 1}-15`,
}));

/* =========================
   STORIES
========================= */

export const Default: Story = {
  args: {
    columns: [
      { key: "a", width: "1fr" },
      { key: "b", width: "1fr" },
      { key: "c", width: "1fr" },
    ],
    appearance: "solid",
    size: "comfortable",
  },
  render: (args) => (
    <Table {...args}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {USERS.slice(0, 3).map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const UserManagement: Story = {
  render: (args) => {
    const cols: TableColumn[] = [
      { key: "user", label: "User", width: "1fr" },
      { key: "role", label: "Role", width: "140px" },
      { key: "status", label: "Status", width: "120px" },
      { key: "actions", label: "Actions", width: "100px" },
    ];

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const allSelected = selectedIds.length === USERS.length;

    const someSelected =
      selectedIds.length > 0 && selectedIds.length < USERS.length;

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelectedIds(USERS.map((u) => u.id));
      } else {
        setSelectedIds([]);
      }
    };

    const handleRowSelect = (id: number, checked: boolean) => {
      setSelectedIds((prev) => {
        if (checked) {
          return [...prev, id];
        }

        return prev.filter((item) => item !== id);
      });
    };

    return (
      <div style={{ padding: 20 }}>
        <Table {...args} columns={[{ key: "select", width: "48px" }, ...cols]}>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                />
              </Table.HeadCell>

              {cols.map((col) => (
                <Table.HeadCell key={col.key} sortKey={col.key}>
                  {col.label}
                </Table.HeadCell>
              ))}
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {USERS.map((user) => {
              const isSelected = selectedIds.includes(user.id);

              return (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <Checkbox
                      checked={isSelected}
                      onChange={(checked) => handleRowSelect(user.id, checked)}
                    />
                  </Table.Cell>

                  {cols.map((col) => (
                    <Table.Cell key={col.key} columnKey={col.key}>
                      {col.key === "user" ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <Avatar name={user.name} size="sm" />

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span style={{ fontWeight: 600 }}>{user.name}</span>

                            <span
                              style={{
                                fontSize: 12,
                                color: "var(--grey500)",
                              }}
                            >
                              {user.email}
                            </span>
                          </div>
                        </div>
                      ) : col.key === "status" ? (
                        <Badge
                          tone={
                            user.status === "Active"
                              ? "success"
                              : user.status === "Pending"
                                ? "warning"
                                : "neutral"
                          }
                          variant="subtle"
                        >
                          {user.status}
                        </Badge>
                      ) : (
                        user[col.key as keyof typeof user]
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  },
};

export const ProjectDashboard: Story = {
  render: (args) => {
    const PROJECTS = [
      {
        name: "Simple UI Components",
        progress: 85,
        status: "In Progress",
        lead: "Alice Freeman",
      },
      {
        name: "Mobile App Redesign",
        progress: 30,
        status: "Planning",
        lead: "Bob Ross",
      },
      {
        name: "API Documentation",
        progress: 100,
        status: "Completed",
        lead: "Charlie Day",
      },
      {
        name: "System Migration",
        progress: 15,
        status: "Delayed",
        lead: "Diana Prince",
      },
    ];

    return (
      <div style={{ padding: 20 }}>
        <Table
          {...args}
          columns={[
            { key: "name", width: "1fr" },
            { key: "progress", width: "180px" },
            { key: "lead", width: "140px" },
            { key: "status", width: "120px" },
          ]}
        >
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Project Name</Table.HeadCell>
              <Table.HeadCell>Progress</Table.HeadCell>
              <Table.HeadCell>Team Lead</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {PROJECTS.map((p) => (
              <Table.Row key={p.name}>
                <Table.Cell>{p.name}</Table.Cell>
                <Table.Cell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      width: "100%",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <Progress value={p.progress} size="sm" tone="primary" />
                    </div>
                    <span
                      style={{ fontSize: 12, minWidth: 32, textAlign: "right" }}
                    >
                      {p.progress}%
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Avatar name={p.lead} size="sm" />
                    <span style={{ fontSize: 13 }}>{p.lead.split(" ")[0]}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    tone={
                      p.status === "Completed"
                        ? "success"
                        : p.status === "In Progress"
                          ? "info"
                          : p.status === "Delayed"
                            ? "error"
                            : "warning"
                    }
                    variant="outline"
                  >
                    {p.status}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  },
};

export const InteractiveSorting: Story = {
  render: (args) => {
    const [sort, setSort] = useState<{
      key: string;
      direction: "asc" | "desc";
    }>({ key: "email", direction: "asc" });

    const sortedUsers = [...USERS].sort((a, b) => {
      const aValue = a[sort.key as keyof typeof a];
      const bValue = b[sort.key as keyof typeof b];

      if (aValue < bValue) return sort.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });

    return (
      <div style={{ padding: 20 }}>
        <Table
          {...args}
          sortState={sort}
          onSortChange={setSort}
          columns={[
            { key: "user", width: "1fr" },
            { key: "email", width: "1fr" },
            { key: "role", width: "1fr" },
          ]}
        >
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name (Non-sortable)</Table.HeadCell>
              <Table.HeadCell sortKey="email">Email</Table.HeadCell>
              <Table.HeadCell sortKey="role">Role</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {sortedUsers.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div style={{ marginTop: 16, fontSize: 13, color: "var(--grey500)" }}>
          Current Sort: <strong>{sort.key}</strong> ({sort.direction})
        </div>
      </div>
    );
  },
};

export const ColumnResizing: Story = {
  render: (args) => {
    const [widths, setWidths] = useState<Record<string, number | string>>({
      name: 200,
      email: 300,
      role: "1fr",
    });

    return (
      <div style={{ padding: 20 }}>
        <Table
          {...args}
          columnWidths={widths}
          onColumnResize={setWidths}
          columns={[{ key: "name" }, { key: "email" }, { key: "role" }]}
        >
          <Table.Head>
            <Table.Row>
              <Table.HeadCell sortKey="name">
                Name (Drag edge to resize)
              </Table.HeadCell>
              <Table.HeadCell sortKey="email">
                Email (Drag edge to resize)
              </Table.HeadCell>
              <Table.HeadCell>Role (Fixed)</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {USERS.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  },
};

export const StickyHeader: Story = {
  render: (args) => {
    const MANY_USERS = Array.from({ length: 50 }).map((_, i) => ({
      ...USERS[i % USERS.length],
      id: i,
      name: `${USERS[i % USERS.length].name} ${i + 1}`,
    }));

    return (
      <div
        style={{
          padding: 20,
          height: 400,
          overflow: "hidden",
          border: "1px solid var(--grey100)",
          borderRadius: 8,
        }}
      >
        <Table
          {...args}
          sticky={{ header: true }}
          columns={[
            { key: "user", width: "1fr" },
            { key: "email", width: "1fr" },
            { key: "role", width: "1fr" },
          ]}
        >
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>User Name</Table.HeadCell>
              <Table.HeadCell>Email Address</Table.HeadCell>
              <Table.HeadCell>Project Role</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {MANY_USERS.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  },
};

export const DragAndDrop: Story = {
  render: () => {
    const [cols, setCols] = useState([
      { key: "user", label: "User", width: "1fr" },
      { key: "email", label: "Email", width: "1fr" },
      { key: "role", label: "Role", width: "1fr" },
    ]);
    const [data, setData] = useState(USERS);

    const handleColumnOrderChange = (newKeys: string[]) => {
      const newCols = newKeys.map((key) => cols.find((c) => c.key === key)!);
      setCols(newCols);
    };

    const handleRowOrderChange = (ids: Array<string | number>) => {
      const [draggedId, targetId] = ids;
      const newData = [...data];
      const fromIndex = newData.findIndex((d) => String(d.id) === draggedId);
      const toIndex = newData.findIndex((d) => String(d.id) === targetId);

      if (fromIndex !== -1 && toIndex !== -1) {
        const [item] = newData.splice(fromIndex, 1);
        newData.splice(toIndex, 0, item);
        setData(newData);
      }
    };

    return (
      <div style={{ padding: 20 }}>
        <div
          style={{ marginBottom: 12, fontSize: 14, color: "var(--grey600)" }}
        >
          💡 Try dragging the <strong>Headers</strong> to reorder columns or{" "}
          <strong>Rows</strong> to reorder data.
        </div>
        <Table
          columns={cols}
          draggableColumns
          onColumnOrderChange={handleColumnOrderChange}
          draggableRows
          onRowOrderChange={handleRowOrderChange}
        >
          <Table.Head>
            <Table.Row variant="head">
              {cols.map((col) => (
                <Table.HeadCell key={col.key} sortKey={col.key}>
                  {col.label}
                </Table.HeadCell>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.map((user) => (
              <Table.Row key={user.id} rowId={user.id}>
                {cols.map((col) => (
                  <Table.Cell key={col.key}>
                    {col.key === "user"
                      ? user.name
                      : user[col.key as keyof typeof user]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  },
};

export const AllFeaturesEnabled: Story = {
  args: {
    size: "comfortable",
    appearance: "solid",
    tone: "neutral",
  },
  render: (args) => {
    const [cols, setCols] = useState<TableColumn[]>([
      { key: "user", label: "User", width: 200, sortable: true, sticky: true },
      { key: "email", label: "Email", width: 250, sortable: true },
      { key: "role", label: "Role", width: 150, sortable: true },
      { key: "status", label: "Status", width: 120 },
      { key: "joined", label: "Joined", width: 150 },
    ]);
    const [widths, setWidths] = useState<Record<string, any>>({});
    const [sort, setSort] = useState<TableSortState | undefined>();
    const [data, setData] = useState(MANY_USERS);

    const sortedData = useMemo(() => {
      if (!sort) return data;
      return [...data].sort((a: any, b: any) => {
        const aVal = String(a[sort.key as keyof typeof a]);
        const bVal = String(b[sort.key as keyof typeof b]);
        return sort.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }, [data, sort]);

    const handleColumnOrderChange = (newKeys: string[]) => {
      const newCols = newKeys.map((key) => cols.find((c) => c.key === key)!);
      setCols(newCols);
    };

    const handleRowOrderChange = (ids: Array<string | number>) => {
      const [draggedId, targetId] = ids;
      const newData = [...data];
      const fromIndex = newData.findIndex((d) => String(d.id) === draggedId);
      const toIndex = newData.findIndex((d) => String(d.id) === targetId);
      if (fromIndex !== -1 && toIndex !== -1) {
        const [item] = newData.splice(fromIndex, 1);
        newData.splice(toIndex, 0, item);
        setData(newData);
      }
    };

    const handlePinChange = (key: string, pinned: boolean) => {
      setCols((prev) =>
        prev.map((c) => (c.key === key ? { ...c, sticky: pinned } : c)),
      );
    };

    return (
      <div
        style={{
          padding: 20,
          height: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <h3>Enterprise Data Grid (All Features)</h3>
          <p style={{ fontSize: 13, color: "var(--grey600)" }}>
            Sorting + Resizing + DND (Row/Col) + Sticky Header + Interactive
            Pinning
          </p>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            border: "1px solid var(--grey200)",
            borderRadius: 8,
          }}
        >
          <Table
            {...args}
            columns={cols}
            columnWidths={widths}
            onColumnResize={setWidths}
            sortState={sort}
            onSortChange={setSort}
            draggableColumns
            onColumnOrderChange={handleColumnOrderChange}
            draggableRows
            onRowOrderChange={handleRowOrderChange}
            allowPinning
            onColumnPinChange={handlePinChange}
            sticky={{ header: true }}
          >
            <Table.Head>
              <Table.Row variant="head">
                {cols.map((col) => (
                  <Table.HeadCell key={col.key} sortKey={col.key}>
                    {col.label}
                  </Table.HeadCell>
                ))}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {sortedData.map((user: any) => (
                <Table.Row key={user.id} rowId={user.id}>
                  {cols.map((col) => (
                    <Table.Cell key={col.key} columnKey={col.key}>
                      {col.key === "user" ? user.name : user[col.key]}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  },
};
/* =========================
   VARIANTS GALLERY
========================= */

const TONES = [
  "primary",
  "success",
  "error",
  "warning",
  "info",
  "neutral",
] as const;

export const AppearanceSolid: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        padding: 40,
        minHeight: "100vh",
      }}
    >
      {TONES.map((tone) => (
        <div
          key={tone}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <h3 style={{ margin: 0, fontSize: 14, textTransform: "capitalize" }}>
            {tone} Tone (Solid)
          </h3>
          <Table
            {...args}
            appearance="solid"
            tone={tone}
            columns={[
              { key: "a", label: "Column A", width: "1fr" },
              { key: "b", label: "Column B", width: "1fr" },
            ]}
          >
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Header 1</Table.HeadCell>
                <Table.HeadCell>Header 2</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Data 1.1</Table.Cell>
                <Table.Cell>Data 1.2</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Data 2.1</Table.Cell>
                <Table.Cell>Data 2.2</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      ))}
    </div>
  ),
};

export const AppearanceSubtle: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        padding: 40,
        minHeight: "100vh",
      }}
    >
      {TONES.map((tone) => (
        <div
          key={tone}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <h3 style={{ margin: 0, fontSize: 14, textTransform: "capitalize" }}>
            {tone} Tone (Subtle)
          </h3>
          <Table
            {...args}
            appearance="subtle"
            tone={tone}
            columns={[
              { key: "a", label: "Column A", width: "1fr" },
              { key: "b", label: "Column B", width: "1fr" },
            ]}
          >
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Header 1</Table.HeadCell>
                <Table.HeadCell>Header 2</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Data 1.1</Table.Cell>
                <Table.Cell>Data 1.2</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Data 2.1</Table.Cell>
                <Table.Cell>Data 2.2</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      ))}
    </div>
  ),
};

export const AdjacentPinning: Story = {
  render: (args) => {
    const [cols, setCols] = useState<TableColumn[]>([
      { key: "id", label: "ID", width: 80, sticky: true },
      { key: "name", label: "User", width: 200 },
      { key: "email", label: "Email", width: 250, sticky: true },
      { key: "role", label: "Role", width: 150 },
      { key: "status", label: "Status", width: 120, sticky: true },
      { key: "joined", label: "Joined", width: 150 },
      { key: "extra1", label: "Extra 1", width: 200 },
      { key: "extra2", label: "Extra 2", width: 200 },
    ]);
    const [widths, setWidths] = useState<Record<string, any>>({});
    const [data, setData] = useState(MANY_USERS.slice(0, 5));

    const handlePinChange = (key: string, pinned: boolean) => {
      setCols((prev) =>
        prev.map((c) => (c.key === key ? { ...c, sticky: pinned } : c)),
      );
    };

    const handleColumnOrderChange = (newKeys: string[]) => {
      const newCols = newKeys.map((key) => cols.find((c) => c.key === key)!);
      setCols(newCols);
    };

    const handleRowOrderChange = (ids: Array<string | number>) => {
      const [draggedId, targetId] = ids;
      const newData = [...data];
      const fromIndex = newData.findIndex((d) => String(d.id) === draggedId);
      const toIndex = newData.findIndex((d) => String(d.id) === targetId);

      if (fromIndex !== -1 && toIndex !== -1) {
        const [item] = newData.splice(fromIndex, 1);
        newData.splice(toIndex, 0, item);
        setData(newData);
      }
    };

    return (
      <div
        style={{
          padding: 20,
          width: "100%",
          maxWidth: "1000px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <h3>Interactive Adjacent Pinning & Resize</h3>
          <p
            style={{ fontSize: 13, color: "var(--grey600)", lineHeight: "1.5" }}
          >
            • <strong>Scrolling</strong>: ID, Email, and Status are pinned by
            default. They should stack perfectly at the left.
            <br />• <strong>Pinning</strong>: Hover headers to toggle pins.
            Pinned columns jump to join the sticky group.
            <br />• <strong>Resizing</strong>: Drag edges for high-performance
            real-time updates.
            <br />• <strong>Reordering</strong>: Drag headers to reorder
            columns, or drag handles to reorder rows.
          </p>
        </div>
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            border: "1px solid var(--grey200)",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Table
            {...args}
            columns={cols}
            columnWidths={widths}
            onColumnResize={setWidths}
            allowPinning
            onColumnPinChange={handlePinChange}
            draggableColumns
            onColumnOrderChange={handleColumnOrderChange}
            draggableRows
            onRowOrderChange={handleRowOrderChange}
            sticky={{ header: true }}
          >
            <Table.Head>
              <Table.Row variant="head">
                {cols.map((col) => (
                  <Table.HeadCell key={col.key} sortKey={col.key}>
                    {col.label}
                  </Table.HeadCell>
                ))}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {data.map((user: any) => (
                <Table.Row key={user.id} rowId={user.id}>
                  {cols.map((col) => (
                    <Table.Cell key={col.key} columnKey={col.key}>
                      {user[col.key] || "Data"}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  },
};
