# Adachi

**Adachi** is an open-source **React + TypeScript UI kit** (`@tokidevs/adachi`) plus a **production-style demo app** you can fork for dashboards and marketing shells.

| Package | Role |
|---------|------|
| [`@tokidevs/adachi`](./packages/adachi) | npm-ready components, themes, and compiled `styles.css` |
| [`adachi-web`](./apps/web) | Vite showcase (analytics, profile, settings, landing) |

## Links

- **Repository:** [github.com/tokidevs/adachi](https://github.com/tokidevs/adachi)
- **Live demo:** [adachi-theta.vercel.app](https://adachi-theta.vercel.app) *(updates after deploy)*

## Monorepo scripts

```bash
npm install
npm run dev      # build library once, then watch library + Vite app
npm run build    # library (tsup + Tailwind) then web app
npm run test     # Vitest — library package
npm run lint
npm run typecheck
```

## Use the library in another repo

```bash
npm install @tokidevs/adachi framer-motion
```

```tsx
import '@tokidevs/adachi/styles.css'
import { ThemeProvider, Button } from '@tokidevs/adachi'
```

See **[packages/adachi/README.md](./packages/adachi/README.md)** for the full consumer guide.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
