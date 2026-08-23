import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1024 * 1024;
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
}

function trimLogFile(logPath, maxSize) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) return;
    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines = [];
    let keptBytes = 0;
    for (let index = lines.length - 1; index >= 0; index -= 1) {
      const lineBytes = Buffer.byteLength(`${lines[index]}\n`, "utf-8");
      if (keptBytes + lineBytes > TRIM_TARGET_BYTES) break;
      keptLines.unshift(lines[index]);
      keptBytes += lineBytes;
    }
    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    // Logging must not affect the local development server.
  }
}

function writeToLogFile(source, entries) {
  if (!entries?.length) return;
  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);
  const lines = entries.map((entry) => `[${new Date().toISOString()}] ${JSON.stringify(entry)}`);
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

function vitePluginManusDebugCollector() {
  return {
    name: "manus-debug-collector",
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") return html;
      return { html, tags: [{ tag: "script", attrs: { src: "/__manus__/debug-collector.js", defer: true }, injectTo: "head" }] };
    },
    configureServer(server) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") return next();
        const handlePayload = (payload) => {
          writeToLogFile("browserConsole", payload?.consoleLogs);
          writeToLogFile("networkRequests", payload?.networkRequests);
          writeToLogFile("sessionReplay", payload?.sessionEvents);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };
        if (req.body && typeof req.body === "object") {
          try { handlePayload(req.body); } catch (error) { res.writeHead(400, { "Content-Type": "application/json" }); res.end(JSON.stringify({ success: false, error: String(error) })); }
          return;
        }
        let body = "";
        req.on("data", (chunk) => { body += chunk.toString(); });
        req.on("end", () => {
          try { handlePayload(JSON.parse(body)); } catch (error) { res.writeHead(400, { "Content-Type": "application/json" }); res.end(JSON.stringify({ success: false, error: String(error) })); }
        });
      });
    },
  };
}

function vitePluginStorageProxy() {
  return {
    name: "manus-storage-proxy",
    configureServer(server) {
      server.middlewares.use("/manus-storage", async (req, res) => {
        const key = req.url?.replace(/^\//, "");
        if (!key) { res.writeHead(400, { "Content-Type": "text/plain" }); res.end("Missing storage key"); return; }
        const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
        const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;
        if (!forgeBaseUrl || !forgeKey) { res.writeHead(500, { "Content-Type": "text/plain" }); res.end("Storage proxy not configured"); return; }
        try {
          const forgeUrl = new URL("v1/storage/presign/get", `${forgeBaseUrl}/`);
          forgeUrl.searchParams.set("path", key);
          const forgeResponse = await fetch(forgeUrl, { headers: { Authorization: `Bearer ${forgeKey}` } });
          if (!forgeResponse.ok) { res.writeHead(502, { "Content-Type": "text/plain" }); res.end("Storage backend error"); return; }
          const { url } = await forgeResponse.json();
          if (!url) { res.writeHead(502, { "Content-Type": "text/plain" }); res.end("Empty signed URL"); return; }
          res.writeHead(307, { Location: url, "Cache-Control": "no-store" });
          res.end();
        } catch {
          res.writeHead(502, { "Content-Type": "text/plain" });
          res.end("Storage proxy error");
        }
      });
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss(), ...(command === "serve" ? [jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector(), vitePluginStorageProxy()] : [])],
  resolve: { alias: { "@": path.resolve(PROJECT_ROOT, "client", "src"), "@shared": path.resolve(PROJECT_ROOT, "shared"), "@assets": path.resolve(PROJECT_ROOT, "attached_assets") } },
  envDir: PROJECT_ROOT,
  root: path.resolve(PROJECT_ROOT, "client"),
  build: { outDir: path.resolve(PROJECT_ROOT, "dist/public"), emptyOutDir: true },
  server: { port: 3000, strictPort: false, host: true, allowedHosts: [".manuspre.computer", ".manus.computer", ".manus-asia.computer", ".manuscomputer.ai", "localhost", "127.0.0.1"], fs: { strict: true, deny: ["**/.*"] } },
}));
