import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ListView } from "../src";
import { List } from "@simple-ui/list";
import { Avatar } from "@simple-ui/avatar";
import { Badge } from "@simple-ui/badge";
import { Heading } from "@simple-ui/heading";
import { Switch } from "@simple-ui/switch";
import {
  MdCall,
  MdMoreVert,
  MdInsertEmoticon,
  MdMic,
  MdDoneAll,
} from "react-icons/md";

const meta: Meta<typeof ListView> = {
  title: "Organisms/ListView",
  component: ListView,
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "Array of items to render in the list.",
      control: false,
      table: { category: "Data" },
    },
    renderItem: {
      description: "Function that returns the React element for each item.",
      control: false,
      table: { category: "Rendering" },
    },
    loading: {
      description: "Whether the list is currently loading data.",
      control: "boolean",
      table: { category: "State" },
    },
    refreshing: {
      description: "Whether the list is currently being refreshed.",
      control: "boolean",
      table: { category: "State" },
    },
    hasMore: {
      description: "Whether there are more items to load via infinite scroll.",
      control: "boolean",
      table: { category: "Behavior" },
    },
    onRefresh: {
      description: "Callback fired when pull-to-refresh is triggered.",
      table: { category: "Events" },
    },
    onEndReached: {
      description:
        "Callback fired when the user scrolls near the end of the list.",
      table: { category: "Events" },
    },
    estimatedItemSize: {
      description:
        "The estimated height of each row in pixels (for virtualization).",
      control: "number",
      table: { category: "Layout", defaultValue: { summary: "72" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ListView>;

/* =========================
   MOCK DATA GENERATORS
========================= */

const USERS = [
  {
    id: 1,
    name: "Alice Freeman",
    email: "alice@example.com",
    status: "Online",
    avatar: "AF",
  },
  {
    id: 2,
    name: "Bob Ross",
    email: "bob.painter@example.com",
    status: "Away",
    avatar: "BR",
  },
  {
    id: 3,
    name: "Charlie Day",
    email: "wildcard@example.com",
    status: "Offline",
    avatar: "CD",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "wonder@example.com",
    status: "Online",
    avatar: "DP",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "impossible@example.com",
    status: "Busy",
    avatar: "EH",
  },
];

const SETTINGS = [
  {
    id: "wifi",
    title: "Wi-Fi",
    subtitle: "Connect to wireless networks",
    icon: "🌐",
  },
  {
    id: "bluetooth",
    title: "Bluetooth",
    subtitle: "Pair with nearby devices",
    icon: "🦷",
  },
  {
    id: "cellular",
    title: "Cellular",
    subtitle: "Manage mobile data",
    icon: "📡",
  },
  {
    id: "notifications",
    title: "Notifications",
    subtitle: "Manage app alerts",
    icon: "🔔",
  },
  {
    id: "privacy",
    title: "Privacy",
    subtitle: "Control your personal data",
    icon: "🔒",
  },
];

/* =========================
   STORIES
========================= */

export const ContactsList: Story = {
  render: () => {
    return (
      <div
        style={{
          height: 400,
          border: "1px solid var(--control-border)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <ListView
          data={USERS}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={72}
          renderItem={(user) => (
            <List.Item
              style={{ padding: "12px 16px" }}
              icon={<Avatar name={user.name} size="md" />}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 600 }}>{user.name}</span>
                  <span style={{ fontSize: 14, color: "var(--grey500)" }}>
                    {user.email}
                  </span>
                </div>
                <Badge
                  tone={
                    user.status === "Online"
                      ? "success"
                      : user.status === "Busy"
                        ? "error"
                        : "neutral"
                  }
                  variant="subtle"
                >
                  {user.status}
                </Badge>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  },
};

export const SettingsMenu: Story = {
  render: () => {
    return (
      <div
        style={{
          height: 400,
          border: "1px solid var(--control-border)",
          borderRadius: 8,
          background: "var(--grey50)",
          overflow: "hidden",
        }}
      >
        <ListView
          data={SETTINGS}
          keyExtractor={(item) => item.id}
          estimatedItemSize={64}
          renderItem={(setting) => (
            <List.Item
              style={{
                padding: "12px 16px",
                background: "white",
                borderBottom: "1px solid var(--grey100)",
                display: "flex",
                alignItems: "center",
              }}
              icon={<span style={{ fontSize: 20 }}>{setting.icon}</span>}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 500 }}>{setting.title}</span>
                  <span style={{ fontSize: 13, color: "var(--grey500)" }}>
                    {setting.subtitle}
                  </span>
                </div>
                <Switch defaultChecked={setting.id !== "bluetooth"} />
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  },
};

export const NotificationFeed: Story = {
  render: () => {
    const NOTIFS = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      title: i % 3 === 0 ? "New Message" : "Security Alert",
      text: "Someone tried to log into your account from a new device in California.",
      time: "2m ago",
      unread: i < 2,
    }));

    return (
      <div
        style={{
          height: 500,
          maxWidth: 400,
          border: "1px solid var(--control-border)",
          borderRadius: 12,
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          style={{
            padding: 16,
            borderBottom: "1px solid var(--control-border)",
            background: "white",
          }}
        >
          <Heading size="h6">Recent Notifications</Heading>
        </div>
        <ListView
          data={NOTIFS}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={100}
          renderItem={(notif) => (
            <div
              style={{
                padding: 16,
                background: notif.unread
                  ? "var(--primary-subtle-background)"
                  : "white",
                borderBottom: "1px solid var(--grey100)",
                position: "relative",
              }}
            >
              {notif.unread && (
                <div
                  style={{
                    position: "absolute",
                    left: 6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--primary500)",
                  }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ fontWeight: 600, fontSize: 14 }}>
                  {notif.title}
                </span>
                <span style={{ fontSize: 12, color: "var(--grey400)" }}>
                  {notif.time}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "var(--grey600)",
                  lineHeight: 1.4,
                }}
              >
                {notif.text}
              </p>
            </div>
          )}
        />
      </div>
    );
  },
};

export const InfiniteScrollDemo: Story = {
  render: () => {
    const [items, setItems] = useState(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        label: `Item ${i + 1}`,
      })),
    );
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      const nextId = items.length;
      const newItems = Array.from({ length: 10 }).map((_, i) => ({
        id: nextId + i,
        label: `Item ${nextId + i + 1}`,
      }));
      setItems((prev) => [...prev, ...newItems]);
      if (items.length > 50) setHasMore(false);
      setLoading(false);
    };

    return (
      <div
        style={{
          height: 400,
          border: "1px solid var(--control-border)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <ListView
          data={items}
          loading={loading}
          hasMore={hasMore}
          onEndReached={loadMore}
          estimatedItemSize={50}
          renderItem={(item) => (
            <div
              style={{
                padding: "16px",
                borderBottom: "1px solid var(--grey100)",
              }}
            >
              {item.label}
            </div>
          )}
        />
      </div>
    );
  },
};

export const PullToRefreshDemo: Story = {
  render: () => {
    const [items, setItems] = useState(
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        label: `Original Item ${i + 1}`,
      })),
    );
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
      setRefreshing(true);
      await new Promise((r) => setTimeout(r, 2000));
      setItems(
        Array.from({ length: 10 }).map((_, i) => ({
          id: i,
          label: `Refreshed Item ${i + 1} (${new Date().toLocaleTimeString()})`,
        })),
      );
      setRefreshing(false);
    };

    return (
      <div
        style={{
          height: 400,
          border: "1px solid var(--control-border)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: 8,
            textAlign: "center",
            fontSize: 12,
            color: "var(--grey400)",
            background: "var(--grey50)",
          }}
        >
          Pull down to refresh (for mobile pull action)
        </div>
        <ListView
          data={items}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          estimatedItemSize={50}
          renderItem={(item) => (
            <div
              style={{
                padding: "16px",
                borderBottom: "1px solid var(--grey100)",
              }}
            >
              {item.label}
            </div>
          )}
        />
      </div>
    );
  },
};

/* =========================
   CHAT MESSAGE FEED
========================= */

type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
  };
};

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hey! How's the new UI library coming along?",
    sender: "other",
    timestamp: "10:30 AM",
    user: { name: "John Doe" },
  },
  {
    id: "2",
    text: "It's going great! Just finished the ListView component.",
    sender: "me",
    timestamp: "10:32 AM",
    user: { name: "Me" },
  },
  {
    id: "3",
    text: "Nice! Does it support virtualization?",
    sender: "other",
    timestamp: "10:33 AM",
    user: { name: "John Doe" },
  },
  {
    id: "4",
    text: "Yes, fully virtualized with @tanstack/react-virtual. Performance is solid.",
    sender: "me",
    timestamp: "10:35 AM",
    user: { name: "Me" },
  },
  {
    id: "5",
    text: "That's awesome. I'll check it out today.",
    sender: "other",
    timestamp: "10:36 AM",
    user: { name: "John Doe" },
  },
  {
    id: "6",
    text: "Let me know if you find any bugs!",
    sender: "me",
    timestamp: "10:38 AM",
    user: { name: "Me" },
  },
  {
    id: "7",
    text: "Will do. Are you using it for the new dashboard?",
    sender: "other",
    timestamp: "10:40 AM",
    user: { name: "John Doe" },
  },
  {
    id: "8",
    text: "Exactly! It handles 10k rows without a single frame drop.",
    sender: "me",
    timestamp: "10:42 AM",
    user: { name: "Me" },
  },
  {
    id: "9",
    text: "That's impressive. What about the pull-to-refresh logic?",
    sender: "other",
    timestamp: "10:43 AM",
    user: { name: "John Doe" },
  },
  {
    id: "10",
    text: "Just added the rubber-band effect! It feels super native now. 🚀",
    sender: "me",
    timestamp: "10:45 AM",
    user: { name: "Me" },
  },
  {
    id: "11",
    text: "Can't wait to try it.",
    sender: "other",
    timestamp: "10:46 AM",
    user: { name: "John Doe" },
  },
];

export const ChatMessageFeed: Story = {
  render: () => {
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
    const [loading, setLoading] = useState(false);

    const loadHistory = async () => {
      if (loading) return;
      setLoading(true);
      // Simulate loading older messages
      await new Promise((r) => setTimeout(r, 1200));
      const older = [
        {
          id: `old-${Date.now()}`,
          text: "Earlier message from history...",
          sender: "other" as const,
          timestamp: "9:00 AM",
          user: { name: "John Doe" },
        },
      ];
      setMessages((prev) => [...older, ...prev]);
      setLoading(false);
    };

    return (
      <div
        style={{
          height: 600,
          maxWidth: 500,
          border: "1px solid var(--control-border)",
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "#e5ddd5", // WhatsApp-style background
          fontFamily: "Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif"
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: "10px 16px",
            background: "#075e54", // WhatsApp dark green header
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          <Avatar name="John Doe" size="sm" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>John Doe</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>online</div>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 20 }}>
             <MdCall style={{ cursor: 'pointer' }} />
             <MdMoreVert style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Message List */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <ListView
            data={messages}
            keyExtractor={(m) => m.id}
            estimatedItemSize={80}
            refreshing={loading}
            onRefresh={loadHistory}
            renderItem={(msg) => {
              const isMe = msg.sender === "me";
              return (
                <div
                  style={{
                    padding: "4px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMe ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      maxWidth: "85%",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        padding: "6px 12px 8px",
                        borderRadius: 8,
                        borderTopLeftRadius: isMe ? 8 : 0,
                        borderTopRightRadius: isMe ? 0 : 8,
                        background: isMe ? "#dcf8c6" : "#ffffff",
                        color: "#303030",
                        fontSize: 14.5,
                        boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
                        position: "relative",
                        minWidth: 60,
                      }}
                    >
                      <div style={{ marginBottom: 4, lineHeight: 1.4 }}>{msg.text}</div>
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "flex-end", 
                        alignItems: "center", 
                        gap: 4,
                        fontSize: 11,
                        color: "rgba(0,0,0,0.45)",
                        marginTop: -2,
                        float: "right",
                        marginLeft: 8
                      }}>
                        {msg.timestamp}
                        {isMe && <MdDoneAll style={{ color: "#4fc3f7", fontSize: 16 }} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* Chat Input Placeholder */}
        <div
          style={{
            padding: "8px 10px",
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <MdInsertEmoticon style={{ fontSize: 24, color: "#919191" }} />
          <div
            style={{
              flex: 1,
              background: "white",
              borderRadius: 20,
              padding: "9px 15px",
              fontSize: 15,
              color: "#919191",
              boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
            }}
          >
            Type a message
          </div>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: "50%", 
            background: "#075e54", 
            display: "grid", 
            placeItems: "center",
            color: "white",
            fontSize: 20
          }}>
             <MdMic />
          </div>
        </div>
      </div>
    );
  },
};
