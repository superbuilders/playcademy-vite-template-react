# Vite + React + TypeScript + Playcademy Template

This template provides a starting point for building web-native games for the Playcademy platform using Vite, React, and TypeScript.

## Features

- A standard Vite React TypeScript setup.
- Pre-configured `@playcademy/sdk` integration.
- Automatic `playcademy.manifest.json` generation using `@playcademy/vite-plugin`.
- Initialization logic in `src/playcademy.ts` to handle both running within the Playcademy platform (iframe) and local development (standalone with mock context).
- Example React component structure (`src/App.tsx`, `src/components/*`) showing initialization status and an exit button.

## Getting Started

### Using `degit` (Recommended)

```bash
# Replace my-cademy-game with your desired project name
bunx degit superbuilders/playcademy-vite-template-react my-playcademy-game
cd my-cademy-game
bun install # or npm install / yarn install
```

## Development

Run the development server:

```bash
bun dev
# or
npm run dev
# or
yarn dev
```

- **Development Mode (Standalone):** When you run the dev server and open the localhost URL directly in your browser, the template uses a **mock `window.PLAYCADEMY` context** defined in `src/playcademy.ts`. This allows the game to load and the React app to initialize the SDK, but **SDK API calls will _not_ interact with a real backend**.

    - The template uses the `window.self === window.top` check to determine if it's running in this Development Mode and displays "[Development Mode]" in the status UI.
    - The `baseUrl` in the mock context is set to `/api`. If you make API calls (like `client.users.me()`), they will likely hit the Vite dev server, which might return the `index.html` content instead of API data. For a better local development experience, consider implementing a mocking strategy (e.g., using MSW or mocking `fetch`) or ensuring a backend API is available and proxied correctly via Vite. See the `TODO` comment in `src/components/GameArea.tsx` and the Vite documentation for proxy configuration.
    - The `client.runtime.exit()` function will only log a warning in Development Mode, as there is no platform environment to exit.

- **Platform Mode (Iframe):** When running inside the actual Playcademy platform, the platform will provide the necessary `PLAYCADEMY_INIT` via `postMessage`, and `src/playcademy.ts` will use that to initialize the SDK with the correct `baseUrl` and tokens. API calls should work as expected.

## SDK Access & Game Logic

- The SDK is initialized within the main `<App>` component (`src/App.tsx`) using the `setupPlaycademy` function from `src/playcademy.ts`.
- The initialized `CademyClient` instance is stored in the `client` state variable within `<App>`.
- Once initialization is successful (`initStatus === 'success'`), the `client` instance is passed down to the `<GameArea>` component (`src/components/GameArea.tsx`).
- **Start implementing your game logic within the `<GameArea>` component.** You have access to the `client` prop there to make SDK calls (e.g., `client.progress.update(...)`).
- See the example `client.users.me()` call in `<GameArea>` and the `<ExitButton>` component (`src/components/Controls.tsx`) for usage patterns.

## Building for Playcademy

Build the production-ready assets:

```bash
bun run build
# or npm run build / yarn build
```

This command will:

1.  Run Vite's build process, outputting optimized files to the `dist/` directory.
2.  Trigger the `@playcademy/vite-plugin`, which will generate the `playcademy.manifest.json` file inside `dist/`. Ensure you have configured the plugin options (like `bootMode`, `entryPoint`) in `vite.config.ts` as needed for your game.

The `dist/` directory will contain all the necessary files for your game. **You must create a zip file from the contents of this `dist/` directory** and upload that zip file to the Playcademy platform when creating or updating your game.

For more details on the build and upload process, please refer to the [Playcademy Documentation](https://docs.playcademy.net).

## Customization

- **Game Logic**: Implement your core game logic primarily within `src/components/GameArea.tsx` and potentially other components you create.
- **Component Structure**: Modify or add React components in `src/components/`. Update `src/App.tsx` to integrate them.
- **Initialization**: Modify SDK initialization behavior or the mock context in `src/playcademy.ts`.
- **Styling**: Adjust global styles in `src/index.css` and component-specific styles (like `src/rainbow-status.css`) as needed.
- **HTML Structure**: The base HTML is in `index.html`.
- **Vite Configuration**: Add plugins or adjust build settings in `vite.config.ts`.
