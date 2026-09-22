# Deploy to Vercel

The project includes vercel.json and a `build:vercel` script. Nitro produces Vercel's server-function and static-asset output in `.vercel/output`. A normal `npm run build` still creates the local Node server in `.output`.

## Commands

Use Node.js 22.12 or newer within the 22.x release line. Unzip playpower-final.zip and run these commands from the extracted playpower-final directory:

```sh
npm exec --yes --package=bun@1.4.2 -- bun install --frozen-lockfile
npm test
npm run typecheck
npm run build:vercel
npx vercel@latest login
npx vercel@latest --prod
```

The last command uploads and publicly deploys your app. No GitHub repository is required for this CLI workflow.

## CLI setup answers

- Set up and deploy this folder: Yes.
- Scope: your own Vercel account or intended team.
- Link to an existing project: No, unless you already created the intended project.
- Project name: choose an available name, for example `abhay-playpower-stays`.
- Code directory: `./`.
- Framework, if prompted: Other. vercel.json explicitly configures the build.
- Keep the included install and build commands. Leave any output-directory override unset; Nitro emits Build Output API files automatically. Do not change it to `dist` or add a static SPA rewrite.

Wait for success, then open the production HTTPS URL with `/rooms/mirashya-ug10` appended. Check it in an incognito/private window; reviewers must be able to access it without your Vercel login. Verify photos, keyboard navigation and a direct refresh of the room route.

Paste that verified HTTPS URL in the assignment form. Upload playpower-final.zip in the project field and the actual prompt history in the prompt-log field. The separately provided eight-prompt reconstruction is a supplement, not a historical transcript. The walkthrough video is optional.

A local target build is not proof of a successful hosted deployment. If deployment fails, retain the error output for troubleshooting.

Official references: [TanStack Start on Vercel](https://vercel.com/docs/frameworks/full-stack/tanstack-start), [CLI deployment](https://vercel.com/docs/cli/deploy), [CLI login](https://vercel.com/docs/cli/login).
