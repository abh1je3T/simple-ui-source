import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "../src";
import {
  FaMobileAlt,
  FaTabletAlt,
  FaLaptop,
  FaApple,
  FaHeadphones,
  FaVrCardboard,
  FaDesktop,
  FaHome,
  FaTv,
  FaMagnet,
} from "react-icons/fa";

const meta: Meta<typeof Carousel> = {
  title: "Organisms/Carousel",
  component: Carousel,
  tags: ["autodocs"],

  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A versatile carousel component that supports responsive layouts, infinite scrolling, 
auto-play, and intelligent item fitting. Perfect for product showcases, hero banners, 
image galleries, and content sliders.

## Features
- **Responsive**: Automatically adjusts items per view based on container width
- **Infinite Scroll**: Seamless continuous scrolling without jumps
- **Smart Fitting**: Respects item minimum widths, never overflows
- **Auto-Play**: Configurable auto-scroll with pause on hover
- **Touch-Friendly**: Native scroll behavior with snap points
- **Accessible**: ARIA labels and keyboard navigation support
        `,
      },
    },
  },

  argTypes: {
    // ─────────────────────────────
    // Content
    // ─────────────────────────────
    children: {
      control: false,
      description: "Carousel items to display",
      table: {
        category: "Content",
        type: { summary: "React.ReactNode" },
      },
    },

    // ─────────────────────────────
    // Layout
    // ─────────────────────────────
    itemsPerView: {
      description:
        "Maximum number of items visible at once. Can be a fixed number or responsive object with breakpoints. Actual count may be less if items don't fit.",
      table: {
        category: "Layout",
        type: {
          summary: "number | { [containerWidth: number]: number }",
        },
        defaultValue: { summary: "1" },
      },
      control: "object",
    },

    gap: {
      description: "Gap between carousel items in pixels",
      table: {
        category: "Layout",
        type: { summary: "number" },
        defaultValue: { summary: "16" },
      },

      // 👇 better than slider for DS usage
      control: {
        type: "number",
        min: 0,
        max: 48,
        step: 4,
      },
    },

    className: {
      control: false,
      description: "Additional CSS class for custom styling",
      table: {
        category: "Layout",
      },
    },

    // ─────────────────────────────
    // Behavior
    // ─────────────────────────────
    infinite: {
      control: "boolean",
      description:
        "Enable seamless infinite scrolling (clones items at boundaries)",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },

    autoScroll: {
      control: "boolean",
      description: "Enable automatic scrolling at set intervals",
      table: {
        category: "Behavior",
        defaultValue: { summary: "false" },
      },
    },

    autoScrollInterval: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
      description: "Time between auto-scrolls in milliseconds",
      table: {
        category: "Behavior",
        defaultValue: { summary: "3000" },
      },
      if: { arg: "autoScroll", truthy: true },
    },

    pauseOnHover: {
      control: "boolean",
      description: "Pause auto-scroll when hovering over carousel",
      table: {
        category: "Behavior",
        defaultValue: { summary: "true" },
      },
      if: { arg: "autoScroll", truthy: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

// ══════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════

const products = [
  { name: "iPhone 15 Pro", color: "#0071e3", icon: <FaMobileAlt /> },
  { name: "iPad Air", color: "#5e6ad2", icon: <FaTabletAlt /> },
  { name: "MacBook Pro", color: "#464648", icon: <FaLaptop /> },
  { name: "Apple Watch", color: "#f5f5f7", icon: <FaApple /> },
  { name: "AirPods Pro", color: "#fafafa", icon: <FaHeadphones /> },
  { name: "Vision Pro", color: "#86868b", icon: <FaVrCardboard /> },
  { name: "iMac", color: "#565656", icon: <FaDesktop /> },
  { name: "HomePod", color: "#6e6e74", icon: <FaHome /> },
  { name: "Apple TV", color: "#86868b", icon: <FaTv /> },
  { name: "MagSafe", color: "#bf4800", icon: <FaMagnet /> },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Design Lead at Stripe",
    quote:
      "This transformed how our team collaborates. The interface is intuitive and powerful.",
    avatar: "SJ",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO at Vercel",
    quote:
      "Incredible performance. We migrated our entire workflow in under a week.",
    avatar: "MC",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager at Figma",
    quote:
      "The best decision we made this quarter. Our users love the new experience.",
    avatar: "ER",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Founder at Notion",
    quote: "Finally, a tool that understands how modern teams actually work.",
    avatar: "DK",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "VP Engineering at GitHub",
    quote:
      "Seamless integration with our existing stack. Zero downtime migration.",
    avatar: "LT",
    rating: 4,
  },
];

const heroImages = [
  {
    url: "https://picsum.photos/1400/700?random=1",
    title: "Discover the Future",
    subtitle:
      "Next-generation technology that transforms how you work and play",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    url: "https://picsum.photos/1400/700?random=2",
    title: "Power Meets Simplicity",
    subtitle:
      "Experience unprecedented performance in a beautifully simple package",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    url: "https://picsum.photos/1400/700?random=3",
    title: "Designed for Everyone",
    subtitle: "Accessibility and inclusivity at the heart of every feature",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    url: "https://picsum.photos/1400/700?random=4",
    title: "Your Data, Your Way",
    subtitle:
      "Complete control over your digital life with enterprise-grade security",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    url: "https://picsum.photos/1400/700?random=5",
    title: "Start Your Journey",
    subtitle:
      "Join millions who have already made the switch to a better experience",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

export const Default: Story = {
  name: "Default",

  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground for the Carousel. Use controls to tweak behavior like infinite scroll, auto-scroll, spacing, and responsive layout.",
      },
    },
  },

  render: (args) => {
    const demoItems = [
      { label: "Card 1", color: "#0071e3" },
      { label: "Card 2", color: "#5e6ad2" },
      { label: "Card 3", color: "#bf4800" },
      { label: "Card 4", color: "#30b158" },
      { label: "Card 5", color: "#f5a623" },
      { label: "Card 6", color: "#ff2d55" },
    ];

    return (
      <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 24px" }}>
        <Carousel {...args}>
          {demoItems.map((item, index) => (
            <div
              key={index}
              style={{
                height: 240,
                borderRadius: 18,
                background: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 700,
                color: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                userSelect: "none",
              }}
            >
              {item.label}
            </div>
          ))}
        </Carousel>
      </div>
    );
  },

  args: {
    gap: 16,
    itemsPerView: { 0: 1, 640: 2, 1024: 3, 1280: 4 },
    infinite: false,
    autoScroll: false,
    autoScrollInterval: 3000,
    pauseOnHover: true,
  },

  argTypes: {
    // 🚫 explicitly hide children control
    children: {
      table: { disable: true },
      control: false,
    },
  },
};

export const ProductShowcase: Story = {
  name: "Product Showcase",

  parameters: {
    docs: {
      description: {
        story:
          "Classic e-commerce product carousel with responsive item fitting. Shows 4 items on desktop, fewer on smaller screens based on natural item width.",
      },
    },
  },

  render: (args) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
      <div style={{ maxWidth: 1200, margin: "40px auto", padding: "0 24px" }}>
        <Carousel {...args} itemsPerView={{ 0: 1, 640: 2, 1024: 3, 1280: 4 }}>
          {products.map((product, index) => (
            <div
              key={product.name}
              style={{
                height: 280,
                borderRadius: 20,
                background: product.color,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                transform: activeIndex === index ? "scale(0.98)" : "scale(1)",
                boxShadow:
                  activeIndex === index
                    ? "0 8px 30px rgba(0,0,0,0.15)"
                    : "0 4px 12px rgba(0,0,0,0.1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseDown={() => setActiveIndex(index)}
              onMouseUp={() => setActiveIndex(null)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span style={{ fontSize: 64 }}>{product.icon}</span>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color:
                    product.color === "#f5f5f7" || product.color === "#fafafa"
                      ? "#1d1d1f"
                      : "white",
                }}
              >
                {product.name}
              </span>
            </div>
          ))}
        </Carousel>
      </div>
    );
  },

  args: {
    gap: 8,
  },
};

// ──────────────────────────────────────────────
// Hero Banner with Auto-Play
// ──────────────────────────────────────────────

export const HeroBanner: Story = {
  name: "Hero Banner Auto-Play",

  parameters: {
    docs: {
      description: {
        story:
          "Full-width hero carousel with auto-play and infinite scroll. Perfect for landing pages and marketing sites. Controls are hidden for a clean cinematic experience.",
      },
    },
  },

  render: (args) => (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <Carousel {...args}>
        {heroImages.map((hero, index) => (
          <div
            key={index}
            style={{
              height: 600,
              borderRadius: 0,
              overflow: "hidden",
              position: "relative",
              background: hero.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={hero.url}
              alt=""
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.3,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                textAlign: "center",
                color: "white",
                maxWidth: 800,
                padding: "0 40px",
              }}
            >
              <h1
                style={{
                  fontSize: "clamp(36px, 5vw, 72px)",
                  fontWeight: 800,
                  marginBottom: 16,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {hero.title}
              </h1>
              <p
                style={{
                  fontSize: "clamp(16px, 2vw, 24px)",
                  opacity: 0.9,
                  lineHeight: 1.6,
                  marginBottom: 32,
                }}
              >
                {hero.subtitle}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={{
                    background: "white",
                    color: "#1d1d1f",
                    border: "none",
                    padding: "16px 32px",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Get Started
                </button>
                <button
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    border: "2px solid rgba(255,255,255,0.3)",
                    padding: "16px 32px",
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: "pointer",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),

  args: {
    itemsPerView: 1,
    autoScroll: true,
    autoScrollInterval: 4000,
    pauseOnHover: true,
    infinite: true,
    gap: 0,
  },
};

// ──────────────────────────────────────────────
// Testimonials Carousel
// ──────────────────────────────────────────────

export const Testimonials: Story = {
  name: "Testimonials Carousel",

  parameters: {
    docs: {
      description: {
        story:
          "Customer testimonials with auto-scroll and star ratings. Shows how to create engaging social proof sections that automatically rotate.",
      },
    },
  },

  render: (args) => (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: "0 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 8,
            color: "#1d1d1f",
          }}
        >
          Loved by Teams Worldwide
        </h2>
        <p style={{ fontSize: 18, color: "#86868b" }}>
          Join thousands of companies building better products
        </p>
      </div>

      <Carousel {...args} itemsPerView={{ 0: 1, 768: 2, 1200: 3 }}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            style={{
              height: 320,
              borderRadius: 20,
              background: "white",
              border: "1px solid #e5e5e7",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div>
              {/* Stars */}
              <div style={{ marginBottom: 20 }}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <span
                    key={s}
                    style={{
                      color: s < t.rating ? "#f5a623" : "#e5e5e7",
                      fontSize: 18,
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#1d1d1f",
                  marginBottom: 24,
                }}
              >
                "{t.quote}"
              </p>
            </div>

            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                {t.avatar}
              </div>
              <div>
                <div
                  style={{ fontWeight: 600, fontSize: 15, color: "#1d1d1f" }}
                >
                  {t.name}
                </div>
                <div style={{ fontSize: 13, color: "#86868b" }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),

  args: {
    gap: 20,
    autoScroll: true,
    autoScrollInterval: 3500,
    pauseOnHover: true,
  },
};

// ──────────────────────────────────────────────
// Image Gallery
// ──────────────────────────────────────────────

export const ImageGallery: Story = {
  name: "Image Gallery",

  parameters: {
    docs: {
      description: {
        story:
          "Responsive image gallery with infinite scroll. Ideal for photography portfolios, real estate listings, or product galleries.",
      },
    },
  },

  render: (args) => (
    <div style={{ maxWidth: 1400, margin: "40px auto", padding: "0 24px" }}>
      <Carousel {...args}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 400,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <img
              src={`https://picsum.photos/600/400?random=${i + 10}`}
              alt={`Gallery image ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLImageElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLImageElement).style.transform = "scale(1)";
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                color: "white",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Image {i + 1}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),

  args: {
    itemsPerView: { 0: 1, 640: 2, 1024: 3 },
    gap: 16,
    infinite: true,
  },
};

// ──────────────────────────────────────────────
// Single Item Navigation
// ──────────────────────────────────────────────

export const SingleItemNavigation: Story = {
  name: "Mobile-Optimized Cards",

  parameters: {
    docs: {
      description: {
        story:
          "Touch-optimized carousel for mobile applications. Shows one item at a time with peek of next/prev items for better UX.",
      },
    },
  },

  render: (args) => (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <div style={{ padding: "0 16px", marginBottom: 24 }}>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: "#1d1d1f" }}>
          Trending Now
        </h3>
      </div>

      <Carousel {...args}>
        {products.slice(0, 6).map((product) => (
          <div
            key={product.name}
            style={{
              height: 220,
              borderRadius: 20,
              background: "white",
              border: "1px solid #e5e5e7",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{ fontSize: 48 }}>{product.icon}</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: "#1d1d1f" }}>
              {product.name}
            </span>
            <span style={{ fontSize: 14, color: "#0071e3" }}>From $999</span>
          </div>
        ))}
      </Carousel>
    </div>
  ),

  args: {
    gap: 16,
    itemsPerView: 1,
  },
};

// ──────────────────────────────────────────────
// Content Slider with Action Cards
// ──────────────────────────────────────────────

export const ContentCards: Story = {
  name: "Content Cards",

  parameters: {
    docs: {
      description: {
        story:
          "Content-heavy cards perfect for blog posts, tutorials, or feature highlights. Uses responsive breakpoints for optimal reading experience.",
      },
    },
  },

  render: (args) => (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: "0 24px" }}>
      <Carousel {...args}>
        {[
          {
            title: "Getting Started Guide",
            description:
              "Learn the basics and set up your first project in minutes",
            category: "Tutorial",
            readTime: "5 min read",
            color: "#0071e3",
          },
          {
            title: "Advanced Techniques",
            description:
              "Deep dive into advanced features and optimization strategies",
            category: "Advanced",
            readTime: "12 min read",
            color: "#5e6ad2",
          },
          {
            title: "Best Practices 2024",
            description:
              "Stay up to date with the latest industry standards and patterns",
            category: "Guide",
            readTime: "8 min read",
            color: "#bf4800",
          },
          {
            title: "API Reference",
            description:
              "Complete API documentation with examples and use cases",
            category: "Documentation",
            readTime: "20 min read",
            color: "#30b158",
          },
          {
            title: "Case Studies",
            description:
              "Real-world examples from companies that scaled successfully",
            category: "Stories",
            readTime: "15 min read",
            color: "#f5a623",
          },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              height: 280,
              borderRadius: 16,
              background: "white",
              border: "1px solid #e5e5e7",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "all 0.2s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: card.color,
              }}
            />
            <div>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 100,
                  background: `${card.color}15`,
                  color: card.color,
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                {card.category}
              </span>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "#1d1d1f",
                }}
              >
                {card.title}
              </h3>
              <p style={{ fontSize: 14, color: "#86868b", lineHeight: 1.6 }}>
                {card.description}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, color: "#aeaeb2" }}>
                {card.readTime}
              </span>
              <span
                style={{ color: card.color, fontWeight: 600, fontSize: 14 }}
              >
                Read more →
              </span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),

  args: {
    itemsPerView: { 0: 1, 768: 2, 1200: 3 },
    gap: 24,
  },
};
