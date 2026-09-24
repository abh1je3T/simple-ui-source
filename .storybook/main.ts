import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesRoot = path.resolve(dirname, "../packages");

const config: StorybookConfig = {
  stories: ["../packages/**/*.mdx", "../packages/**/*.stories.@(ts|tsx)"],

  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  typescript: {
    reactDocgen: "react-docgen",
  },

  async viteFinal(config) {
    const existingAlias = Array.isArray(config.resolve?.alias) ? config.resolve.alias : [];
    config.resolve = {
      ...config.resolve,
      alias: [
        // "@simple-ui/<package>/<sub-path>" -> "packages/<package>/src/<sub-path>"
        { find: /^@simple-ui\/([^/]+)\/(.+)$/, replacement: `${packagesRoot}/$1/src/$2` },
        // "@simple-ui/<package>" -> "packages/<package>/src"
        { find: /^@simple-ui\/([^/]+)$/, replacement: `${packagesRoot}/$1/src` },
        ...existingAlias,
      ],
    };
    return config;
  },
};

export default config;
