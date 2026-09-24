import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";

// The CSS is loaded by Storybook's bundler; TypeScript does not type-check CSS assets.
// @ts-expect-error No declaration file is provided for this side-effect stylesheet import.
import "../packages/tokens/dist/tokens.css";
// @ts-expect-error No declaration file is provided for this side-effect stylesheet import.
import "./preview.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      options: {
        light: { name: "light", value: "#ffffff" },
        dark: { name: "dark", value: "#21272A" },
        "high-contrast": { name: "high contrast", value: "#000000" },
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.backgrounds?.value || "light";

      useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", theme);
        root.classList.remove("sb-light", "sb-dark", "sb-high-contrast");
        root.classList.add(`sb-${theme}`);
      }, [theme]);

      return (
        <div style={{ padding: "1rem" }}>
          <Story />
        </div>
      );
    },
  ],

  initialGlobals: {
    backgrounds: {
      value: "light",
    },
  },
};

export default preview;
