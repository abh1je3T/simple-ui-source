import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { Image, ImageSkeleton } from "../src";

const meta: Meta<typeof Image> = {
  title: "Atoms/Image",
  component: Image,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: "select",
      options: ["sq", "wd", "uwd", "pt"],
    },
    fit: {
      control: "select",
      options: ["cover", "contain"],
    },
    radius: {
      control: "select",
      options: ["sm", "md", "lg", "round", "none"],
    },
    loading: {
      control: "select",
      options: ["lazy", "eager"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Image>;

const baseImage =
  "https://img.freepik.com/premium-photo/white-marble-texture-background-wallpaper-4k-hd-photo_1193781-33759.jpg";

const brokenImage = "https://invalid-url/image.jpg";

/* ---------------- DEFAULT ---------------- */

export const Default: Story = {
  args: {
    src: baseImage,
    alt: "Marble texture image",
  },
};

/* ---------------- RATIOS ---------------- */

export const Ratios: Story = {
  render: () => {
    const ratios = ["sq", "wd", "uwd", "pt"] as const;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "var(--layout-spacing-md)",
        }}
      >
        {ratios.map((ratio) => (
          <div
            key={ratio}
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "var(--layout-spacing-sm)",
            }}
          >
            <Image src={baseImage} ratio={ratio} alt={ratio} />

            <div
              style={{
                marginTop: "var(--layout-spacing-sm)",
                fontSize: "var(--font-size-sm)",
                color: "var(--muted-foreground)",
                textAlign: "center",
              }}
            >
              {ratio}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/* ---------------- FALLBACK ---------------- */

export const Fallback: Story = {
  args: {
    src: brokenImage,
    alt: "Broken image",
    fallback: (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "var(--font-size-sm)",
          color: "var(--muted-foreground)",
        }}
      >
        Image failed to load
      </div>
    ),
  },
};

/* ---------------- LOADING WITH REAL IMAGE EVENTS ---------------- */

const ImageLoader = () => {
  const [src, setSrc] = useState("");
  console.log("Logsss-", baseImage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSrc(baseImage);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: 280,
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--card)",
      }}
    >
      <Image src={src} ratio="sq" alt="Marble" showSkeleton />
    </div>
  );
};
export const LoadingWithSkeleton: Story = {
  render: () => <ImageLoader />,
};

/* ---------------- STYLING ---------------- */

export const Styling: Story = {
  render: () => {
    const styles = [
      { radius: "sm", fit: "cover" },
      { radius: "md", fit: "cover" },
      { radius: "lg", fit: "cover" },
      { radius: "round", fit: "cover" },
      { radius: "md", fit: "contain" },
    ] as const;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "var(--layout-spacing-md)",
        }}
      >
        {styles.map((style, i) => (
          <div
            key={i}
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "var(--layout-spacing-sm)",
            }}
          >
            <Image
              src={baseImage}
              ratio="sq"
              radius={style.radius}
              fit={style.fit}
            />

            <div
              style={{
                marginTop: "var(--layout-spacing-sm)",
                fontSize: "var(--font-size-xs)",
                color: "var(--muted-foreground)",
                textAlign: "center",
              }}
            >
              {style.radius} / {style.fit}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/* ---------------- ERROR STATE ---------------- */

export const ErrorState: Story = {
  render: () => (
    <div
      style={{
        width: 280,
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--card)",
      }}
    >
      <Image
        src={brokenImage}
        alt="Broken image"
        fallback={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--font-size-sm)",
              color: "var(--muted-foreground)",
            }}
          >
            ⚠️ Image failed to load
          </div>
        }
      />
    </div>
  ),
};

/* ---------------- GALLERY ---------------- */

export const GalleryShowcase: Story = {
  render: () => {
    const ratios = ["sq", "wd", "uwd", "pt"] as const;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "var(--layout-spacing-lg)",
          padding: "var(--layout-spacing-lg)",
          background: "var(--background)",
        }}
      >
        {ratios.map((r) => (
          <div
            key={r}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              background: "var(--card)",
              overflow: "hidden",
            }}
          >
            <Image src={baseImage} ratio={r} />

            <div
              style={{
                padding: "var(--layout-spacing-sm)",
                textAlign: "center",
                fontSize: "var(--font-size-sm)",
                color: "var(--muted-foreground)",
              }}
            >
              {r}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
