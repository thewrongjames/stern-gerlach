# Readme

(Hopefully eventually) an interactive simulator for something like the Stern-Gerlach experiment.

## Development

This is a purely JavaScript project that uses TypeScript only for type-checking, with no compilation. There is typescript code in the `types` directory, but that is only so it can be imported in JSDocs types for type assertions.

The project currently has no runtime dependencies, but it does have several development dependencies, which can be installed with `npm install`.

- `npm start` will run a development server.
  - You may need to either disable caching or hard-reload to have the browser update the static files.
- `npm run lint` will lint the codebase.
- `npm run types` will run type-checking against the codebase.
