# Simple UI

A React + TypeScript component library, developed and documented with [Storybook](https://storybook.js.org/). Each component lives in its own package under [`packages/`](packages) with its own source, styles, and stories.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (via `@storybook/react-vite`) for bundling
- **Storybook 10** for component development, docs, and a11y checks
- **Sass** for component styles
- Design tokens package (`packages/tokens`) for shared colors, spacing, radius, shadows, animation, etc.

## Getting Started

```bash
npm install
npm run dev     # starts Storybook at http://localhost:6006
npm run build   # builds the static Storybook site
```

## Project Structure

```
packages/
  <component-name>/
    src/            # component implementation, exported via src/index.tsx
    stories/        # *.stories.tsx (interactive stories) and *.docs.mdx (docs pages)
```

Every component package is self-contained: its `src/index.tsx` is the public entry point, and its styles (`.scss`) live alongside the component.

## Importing Components

Components are imported using the `@simple-ui/<package>` alias, which resolves directly to that package's `src` folder (no build/publish step required):

```tsx
import { Button } from "@simple-ui/button";
import { Avatar } from "@simple-ui/avatar";
```

This alias is configured in two places, and both must stay in sync:

- [`.storybook/main.ts`](.storybook/main.ts) — Vite `resolve.alias`, used at runtime/build time by Storybook
- [`tsconfig.json`](tsconfig.json) — `compilerOptions.paths`, used for editor/type-checking support

Subpath imports are also supported, e.g. `@simple-ui/tokens/json` resolves to `packages/tokens/src/json`.

## Available Components

`accordion`, `alert`, `avatar`, `badge`, `button`, `card`, `carousel`, `checkbox`, `combo-box`, `date-input`, `drawer`, `drop-menu`, `dropdown`, `form-field`, `heading`, `image`, `input`, `label`, `line`, `link`, `list`, `list-view`, `loader`, `modal`, `otp-input`, `pagination`, `progress`, `radio`, `segmented-control`, `switch`, `table`, `text-area`, `toast`, `tokens`, `tooltip`

Browse each one's stories and docs page in Storybook for usage examples and prop tables.

## Adding a New Component

1. Create `packages/<name>/src/<Name>/<Name>.tsx` and export it from `packages/<name>/src/index.tsx`.
2. Add a matching stylesheet (`.scss`) next to the component if needed.
3. Add `packages/<name>/stories/<Name>.stories.tsx` for interactive stories.
4. Add `packages/<name>/stories/<Name>.docs.mdx` for the docs page.
5. Import it elsewhere via `@simple-ui/<name>` — no extra config needed.

## Notes

- `packages/tokens/dist/tokens.css` is the compiled design tokens stylesheet, loaded globally in [`.storybook/preview.tsx`](.storybook/preview.tsx).

