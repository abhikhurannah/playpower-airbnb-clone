# Submission steps

1. Review the assignment listing at `/rooms/mirashya-ug10`. Test the photo tour, arrow keys, Escape, calendar and wishlist. Read README.md and docs/ARCHITECTURE.md so you can explain the work.
2. Use the drafts in docs/FORM-ANSWERS.md for the first three form steps. Replace `[your actual total time]` with your own estimate, including your initial UI work, review and testing. Revise any sentence you cannot explain or substantiate.
3. Complete the separate `submission-prompt-log.md` file with your original builder conversation. The supplied log contains the available Codex requests and explicitly identifies the missing earlier history. Do not invent prompts.
4. Deploy the app to obtain the live URL requested by the form. The localhost preview works only on your computer. See the deployment steps below.
5. At form step 4, upload `submission/playpower-completed.zip` (under 50 MB). It contains source, local assets, AGENTS.md, CLAUDE.md, .claude/ configurations and docs/architecture.png, without node_modules.
6. Upload `submission-prompt-log.md` in the separate prompt-log field.
7. Paste the deployed HTTPS URL ending in `/rooms/mirashya-ug10`. Open it in a private browser window first and verify the listing and gallery.
8. The walkthrough video is optional. If included, record 2–3 minutes showing the listing, photo tour, keyboard controls and architecture diagram, and explain AI assistance and demo limitations.
9. Add the optional comments from docs/FORM-ANSWERS.md if useful. Continue to step 5, review the actual fields shown there (not supplied in the screenshots), then submit. Keep the confirmation.

## Deployment example: Render Node web service

These settings adapt Render's documented Node web-service workflow to this project's tested Nitro Node build. A public deployment has not been performed or verified.

1. Place this project's contents in a **private** GitHub repository. Do not include node_modules, .output or submission. Preserve hidden files such as .claude and .gitignore. Keep the assessment source private.
2. Sign into Render and choose **New → Web Service**, then connect the private repository. Choose the Node runtime, not a static site.
3. Set the build command to `npm exec --yes --package=bun@1.4.2 -- bun install --frozen-lockfile && npm run build`.
4. Set the start command to `node .output/server/index.mjs`.
5. Set environment variables `NODE_VERSION=22.12.0` and `HOST=0.0.0.0`. Allow the service to supply its PORT. Review the selected plan and its price before creating it.
6. Deploy. When successful, open the generated HTTPS address with `/rooms/mirashya-ug10` appended and exercise the photo viewer. Use that verified address in the form.

Reference: [Render Node deployment documentation](https://render.com/docs/deploy-node-express-app).
