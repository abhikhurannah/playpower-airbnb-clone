// Run the built Node server with familiar preview CLI options.
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i += 2) {
  if (!["--host", "--port"].includes(args[i]) || !args[i + 1]) {
    throw new Error("Usage: npm run preview -- --host 127.0.0.1 --port 4173");
  }
  process.env[args[i] === "--port" ? "PORT" : "HOST"] = args[i + 1];
}
process.env.PORT ||= "4173";
process.env.HOST ||= "127.0.0.1";
await import("../.output/server/index.mjs");
