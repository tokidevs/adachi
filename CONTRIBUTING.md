# Contributing

Thanks for helping improve Adachi.

## Structure

- `packages/adachi` — publishable npm library (`@tokidevs/adachi`)
- `apps/web` — Vite demo site (also deployed as the live showcase)

## Local setup

```bash
npm install
npm run dev
```

The dev script builds the library once, then runs `tsup --watch` for the package and Vite for the app.

## Checks before a PR

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Publishing `@tokidevs/adachi`

Maintainers with npm access:

```bash
cd packages/adachi
npm version patch   # or minor / major
npm publish --access public
```

Ensure `npm run build` passes and the `dist/` output is committed **not** required — publish runs `prepublishOnly` build.

Please open an issue first for large API changes.
