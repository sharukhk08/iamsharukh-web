#!/usr/bin/env node
// dev-guard — refuses to let `npm run dev/build/start/install` proceed when a project
// shows signs of the PolinRider / Contagious Interview malware or known-bad npm packages.
// Zero dependencies, read-only. Exit 0 = clean, exit 1 = blocked.
//
// Usage:  node guard.mjs [projectDir]      (defaults to the current directory)
// Version: 1.5.0 (2026-10-07) — variant-proof behaviour checks (loader signals, tab/zero-width padding, dot-notation globals); .vscode folders not allowed
// (previous: 1.3.2 (2026-10-06)) — PolinRider IOCs from OpenSourceMalware, JFrog, Security Alliance, Socket

import { readdirSync, readFileSync, statSync, existsSync, openSync, readSync, closeSync } from "node:fs";
import { join, relative, basename, extname, dirname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

// The guard's own source (and other copies of it, e.g. the laptop copy scanning a project's
// scripts/guard.mjs) contains the fingerprints it searches for, so genuine copies are skipped.
// A copy with anything hidden in it (a long line or space padding) is NOT treated as genuine.
const SELF = fileURLToPath(import.meta.url);
const GUARD_HEADER = "#!/usr/bin/env node\n// dev-guard — refuses to let";
const isGenuineGuardCopy = (txt) =>
  txt.startsWith(GUARD_HEADER) && txt.split("\n").every((l) => l.length < 400) && !/ {150,}\S/.test(txt);

// Without an explicit dir, scan the nearest project (the folder npm itself would use).
// Outside any project there is nothing to guard, so exit quietly instead of scanning $HOME.
function findProjectRoot(start) {
  for (let dir = start; ; dir = dirname(dir)) {
    if (existsSync(join(dir, "package.json"))) return dir;
    if (dir === dirname(dir) || dir === homedir()) return null;
  }
}
const root = process.argv[2] || findProjectRoot(process.cwd());
if (!root) process.exit(0);
// A folder that doesn't exist must never be reported as "clean".
if (process.argv[2] && (!existsSync(root) || !statSync(root).isDirectory())) {
  console.error(`dev-guard: folder not found: ${root}`);
  process.exit(2);
}
const findings = [];
const block = (file, why) => findings.push(`${relative(root, file) || basename(file)}: ${why}`);
const warnings = [];
const warn = (file, why) => warnings.push(`${relative(root, file) || basename(file)}: ${why}`);

const SKIP_DIRS = new Set(["node_modules", "__MACOSX", ".git", ".next", ".nuxt", ".svelte-kit", "dist", "build", "out", ".turbo", ".vercel", ".cache", "coverage"]);
const MAX_READ = 5 * 1024 * 1024;

const CONFIG_NAMES = ["postcss", "tailwind", "next", "vite", "vitest", "jest", "eslint", "babel", "webpack", "rollup", "nuxt",
  "svelte", "astro", "remix", "metro", "tsup", "prettier", "stylelint", "commitlint", "lint-staged", "playwright", "cypress",
  "gatsby", "craco", "expo", "capacitor", "drizzle", "knip", "mocha", "karma", "storybook", "vue", "angular", "ember", "esbuild",
  "parcel", "snowpack", "wmr", "rspack", "turbo", "sentry", "ecosystem", "nodemon"].join("|");
const CONFIG_RE = new RegExp(`^(${CONFIG_NAMES})\\.config\\.(c|m)?(j|t)s$|^\\.(eslintrc|prettierrc|stylelintrc|lintstagedrc|commitlintrc|mocharc|huskyrc|babelrc)(\\.(c|m)?js|\\.json|\\.ya?ml)?$`);
// Any genuine font/image signature is accepted regardless of extension: mislabelled assets
// (a JPEG saved as .png) are common and harmless. A payload has no valid signature at all.
const FONT_EXTS = new Set([".woff2", ".woff", ".ttf", ".otf", ".ttc", ".eot"]);
const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".bmp", ".avif"]);
const ASSET_MAGIC = ["wOF2", "wOFF", "\x00\x01\x00\x00", "true", "typ1", "OTTO", "ttcf",
  "\x89PNG", "\xff\xd8\xff", "GIF8", "RIFF", "\x00\x00\x01\x00", "\x00\x00\x02\x00", "BM"];
const isAvif = (s) => s.slice(4, 12) === "ftypavif" || s.slice(4, 12) === "ftypavis";
const IOC_FILES = new Set(["temp_auto_push.bat", "temp_interactive_push.bat", "config.bat", "bun_environment.js", "setup_bun.js", "shai-hulud-workflow.yml"]);
const BAD_VERSIONS = { axios: ["1.14.1", "0.30.4"], "html-to-gutenberg": ["4.2.11"], "fetch-page-assets": ["1.2.9"] };
// plain-crypto-js: axios compromise. tailwind-*animation: PolinRider droppers (OpenSourceMalware).
const BAD_PACKAGES = ["plain-crypto-js", "tailwind-mainanimation", "tailwind-autoanimation", "tailwindcss-style-animate",
  "tailwind-animationbased", "tailwindcss-typography-style", "tailwindcss-style-modify", "tailwindcss-animate-style", "grayavatar"];
const OBFUSCATION = /_0x[0-9a-f]{4,}|global\[['"]!['"]\]|\beval\s*\(|\batob\s*\(|String\.fromCharCode\(|Buffer\.from\([^)]*base64/;
// Source files: only this malware's fingerprints, so legit minified libraries (jQuery, pdf.js) pass.
// Exact PolinRider signatures published by OpenSourceMalware: ("rmcej%otb%",2857687) and
// global['!']='8-270-2';var _$_1e42=  (plus the decoder name and its second seed).
const PAYLOAD_MARKERS = /global\[['"](!|_V)['"]\]|global\.[A-Za-z_]{1,2}\s*=\s*(require\b|["']A?\d+-[^"']*["'])|rmcej%otb|Cot%3t=shtP|_\$_1e42|\b1111436\b.*\b3896884\b|\b2857687\b.*\b2667686\b|\bcreateRequire\s*\(\s*import\.meta\.url\s*\)\s*;?\s*\S{200,}/;
// Published C2 / dead-drop strings (domains, wallet addresses, RPC endpoints, IPs). Checked in files
// that should never hold them. One entry per line keeps every line short (see isGenuineGuardCopy).
const C2_LIST = [
  "260120.vercel.app", "default-configuration.vercel.app", "vscode-settings-bootstrap.vercel.app",
  "vscode-settings-config.vercel.app", "vscode-bootstrapper.vercel.app", "vscode-load-config.vercel.app",
  "audit.checkmarx.cx", "chainlink-api-v3.com", "X-Payload-B64",
  "api.trongrid.io", "fullnode.mainnet.aptoslabs.com", "bsc-dataseed.binance.org", "bsc-rpc.publicnode.com",
  "TMfKQEd7TJJa5xNZJZ2Lep838vrzrs7mAP", "TXfxHUet9pJVU1BgVkBAbrES4YUc1nGzcG", "TA48dct6rFW8BXsiLAtjFaVFoSuryMjD3v",
  "0xa322e5f3d311d3080e6f0121063e9adc2490ef1a",
  "0xbe037400670fbf1c32364f762975908dc43eeb38759263e7dfcdabc76380811e",
  "0x3f0e5781d0855fb460661ac63257376db1941b2bb522499e4757ecb3ebd5dce3",
  "166.88.54.158", "166.88.134.62", "166.88.134.82", "166.88.4.2", "198.105.127.210", "23.27.202.27",
  "23.27.120.142", "23.27.13.43", "154.91.0.103", "136.0.9.8", "202.155.8.173", "188.43.33.249",
  "146.70.253.107", "172.86.116.178", "91.218.183.174", "194.11.226.41",
];
const C2_STRINGS = new RegExp(C2_LIST.map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"));
// Variant seen in the wild that carries none of the published markers (e.g. "EtherHiding"): a config
// that assigns several single-letter globals AND uses eval/require is a loader, not a config.
const LOADER_SHAPE = (txt) => (txt.match(/global\[['"][A-Za-z_!]{1,2}['"]\]\s*=/g) || []).length >= 2 && /\b(eval|require)\s*\(/.test(txt);
// Variant-proof signals: no published marker needed. A real config rarely shows one; a loader shows several.
const WS = "[ \\t\\u00a0\\u2000-\\u200b\\u3000]";
const SIGNALS = {
  "assigns to global/globalThis": /\b(global|globalThis)\s*(\.\w+|\[[^\]]+\])\s*=[^=]/,
  "aliases require/module": /(=|,)\s*(require|module)\s*[;,)\n]|\brequire\s*\[|\bmodule\s*\[\s*["'`]/,
  "process/network module or spawn": /['"`](node:)?(child_process|net|dgram|tls|vm|dns|worker_threads|https?|http2|zlib)['"`]|\b(spawn|spawnSync|execSync|execFile|execFileSync)\s*\(/,
  "dynamic code (Function, vm, eval)": /\bnew\s+Function\s*\(|\bFunction\s*\(\s*['"`]|\.constructor\s*\(\s*['"`]|\bvm\.run|runIn(This|New)Context|\beval\b/,
  "escaped-string obfuscation": /(\\u[0-9a-fA-F]{4}){4,}|(\\x[0-9a-fA-F]{2}){6,}|[A-Za-z0-9+\/]{300,}={0,2}/,
};
const signalsOf = (t) => {
  const hits = Object.entries(SIGNALS).filter(([, re]) => re.test(t)).map(([k]) => k);
  if ((t.match(/0x[0-9a-fA-F]{2,}/g) || []).length >= 40) hits.push("big hex-literal table");
  return hits;
};
const STRONG = ["escaped-string obfuscation", "big hex-literal table"];
const SHELL_FETCH = /\b(curl|wget|iwr|Invoke-WebRequest|Invoke-Expression|iex|powershell|pwsh|certutil|mshta|bitsadmin)\b|node\s+(-e|--eval)\b|\|\s*(ba|z)?sh\b|\bbase64\b|\beval\b/i;
const RUNS_ASSET = /\bnode\s+[^&|;]*\.(woff2?|ttf|otf|png|jpe?g|gif|svg|ico|webp|css|txt|md)\b/i;

function head(file, n) {
  const buf = Buffer.alloc(n);
  const fd = openSync(file, "r");
  try { return buf.subarray(0, readSync(fd, buf, 0, n, 0)).toString("latin1"); } finally { closeSync(fd); }
}
const readText = (file) => (statSync(file).size > MAX_READ ? "" : readFileSync(file, "utf8"));
const isLfsPointer = (s) => s.startsWith("version https://git-lfs");

function checkTasksJson(file) {
  const txt = readText(file);
  if (/folderOpen/.test(txt)) block(file, 'VS Code task auto-runs on folder open ("runOn": "folderOpen")');
  if (RUNS_ASSET.test(txt)) block(file, "VS Code task runs node on a non-JavaScript file (disguised payload)");
  if (/\b(curl|wget|iwr|Invoke-WebRequest)\b[^"]*\|\s*(ba|z)?sh\b|\bnode\s+(-e|--eval)\b/i.test(txt)) block(file, "VS Code task downloads or evals code");
  if (C2_STRINGS.test(txt)) block(file, "VS Code task references a known PolinRider C2 address");
}

// PolinRider adds its hidden orchestrator to .gitignore so it is never committed.
function checkGitignore(file) {
  const hits = ["config.bat", "temp_auto_push.bat", "temp_interactive_push.bat", "branch_structure.json"]
    .filter((n) => new RegExp(`^\\s*/?${n.replace(".", "\\.")}\\s*$`, "m").test(readText(file)));
  if (hits.length) block(file, `.gitignore lists ${hits.join(", ")} — PolinRider's infection fingerprint (it hides its helper scripts from git)`);
}

function checkVscodeSettings(file) {
  if (/"task\.allowAutomaticTasks"\s*:\s*"on"/.test(readText(file))) block(file, "workspace forces automatic tasks on");
}

function checkAsset(file) {
  const start = head(file, 64);
  if (!start.length || isLfsPointer(start)) return;
  if (extname(file).toLowerCase() === ".eot") { if (start.slice(34, 36) === "LP") return; } // EOT magic sits at byte 34
  else if (ASSET_MAGIC.some((m) => start.startsWith(m)) || isAvif(start)) return;
  block(file, `not a real ${extname(file)} file (no font/image signature — likely a disguised script)`);
}

// Backup payload hiding in a spell-checker dictionary: a real word list has short lines.
function checkDict(file) {
  const txt = readText(file);
  if (Math.max(...txt.split("\n").map((l) => l.length)) > 400 || PAYLOAD_MARKERS.test(txt) || OBFUSCATION.test(txt)) block(file, "spellright.dict holds code (backup payload), not a word list");
}

function checkSvg(file) {
  if (/<script\b|javascript:/i.test(readText(file))) block(file, "SVG contains a script");
}

function checkConfig(file) {
  const txt = readText(file);
  if (PAYLOAD_MARKERS.test(txt)) block(file, "contains a known PolinRider payload signature");
  if (LOADER_SHAPE(txt)) block(file, "config assigns several single-letter globals and uses eval/require (loader shape)");
  if (C2_STRINGS.test(txt)) block(file, "config references a known PolinRider C2 address");
  if (/\bcreateRequire\s*\(/.test(txt.replace(/\/\/.*$/gm, ""))) block(file, "config uses createRequire() — the loader shim this malware injects");
  const lines = txt.split("\n");
  const longest = Math.max(...lines.map((l) => l.length));
  if (longest > 1000) block(file, `config has a ${longest}-character line (hidden payload)`);
  else if (new RegExp(WS + "{150,}\\S").test(txt)) block(file, "config hides code after a long run of blank space");
  if (OBFUSCATION.test(txt)) block(file, "config contains eval/obfuscation patterns");
  const sig = signalsOf(txt);
  if (sig.length >= 2 || sig.some((s) => STRONG.includes(s))) block(file, `config shows loader behaviour: ${sig.join("; ")}`);
  else if (sig.length === 1) warn(file, `config shows one loader-like behaviour (${sig[0]}). Check it by hand.`);
}

function checkSource(file) {
  const txt = readText(file);
  if (isGenuineGuardCopy(txt)) return;
  if (PAYLOAD_MARKERS.test(txt)) { block(file, "contains a known malware loader fingerprint"); return; }
  if ((txt.match(/_0x[0-9a-f]{4,}/g) || []).length > 50) { block(file, "heavily obfuscated (_0x… identifiers)"); return; }
  if (new RegExp("\\S" + WS + "{150,}\\S{40,}").test(txt)) block(file, "code hidden after a long run of blank space");
  const sig = signalsOf(txt);
  const minified = txt.split("\n").some((l) => l.length > 500); // legit minified libraries are covered by the marker checks above
  if (!minified && sig.includes("assigns to global/globalThis") && sig.length >= 2) block(file, `source assigns globals and shows loader behaviour: ${sig.join("; ")}`);
}

function checkPackageJson(file) {
  let pkg; try { pkg = JSON.parse(readText(file)); } catch { return; }
  for (const [name, cmd] of Object.entries(pkg.scripts || {})) {
    if (typeof cmd !== "string") continue;
    if (/^(pre|post)?install$|^prepare$|^prepublish$/.test(name) && SHELL_FETCH.test(cmd)) block(file, `"${name}" script downloads or executes code: ${cmd.slice(0, 80)}`);
    if (RUNS_ASSET.test(cmd)) block(file, `"${name}" script runs node on a non-JavaScript file: ${cmd.slice(0, 80)}`);
  }
  if (C2_STRINGS.test(JSON.stringify(pkg.scripts || {}))) block(file, "package script references a known PolinRider C2 address");
  const deps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.optionalDependencies };
  for (const bad of BAD_PACKAGES) if (deps[bad]) block(file, `depends on known-malicious package ${bad}`);
}

function checkLockfile(file) {
  const txt = readText(file);
  for (const bad of BAD_PACKAGES) if (txt.includes(bad)) block(file, `lockfile contains known-malicious package ${bad}`);
  for (const [name, versions] of Object.entries(BAD_VERSIONS)) {
    for (const v of versions) {
      const esc = v.replace(/\./g, "\\.");
      const re = new RegExp(`node_modules/${name}"\\s*:\\s*\\{\\s*"version"\\s*:\\s*"${esc}"|[\\s"'/]${name}@${esc}\\b|^"?${name}@[^\\n]*\\n\\s+version:?\\s+"?${esc}"?\\s*$`, "m");
      if (re.test(txt)) block(file, `lockfile pins compromised ${name}@${v}`);
    }
  }
}

function checkNodeModules(dir) {
  for (const bad of BAD_PACKAGES) if (existsSync(join(dir, bad))) block(join(dir, bad), "known-malicious package is installed");
  for (const [name, versions] of Object.entries(BAD_VERSIONS)) {
    const pj = join(dir, name, "package.json");
    if (!existsSync(pj)) continue;
    try { const v = JSON.parse(readFileSync(pj, "utf8")).version; if (versions.includes(v)) block(pj, `compromised ${name}@${v} is installed`); } catch {}
  }
}

function walk(dir, depth) {
  let entries; try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === ".vscode") block(full, "policy: .vscode folders are not allowed (it is the PolinRider trigger). Rename it: mv .vscode .vscode.disabled-polinrider");
      if (e.name === "node_modules") { checkNodeModules(full); continue; }
      if (SKIP_DIRS.has(e.name) || depth > 12) continue;
      walk(full, depth + 1);
      continue;
    }
    if (!e.isFile() || full === SELF) continue;
    if (e.name.startsWith("._")) continue; // macOS metadata (AppleDouble), not real content
    const name = e.name, ext = extname(name).toLowerCase();
    try {
      if (IOC_FILES.has(name)) block(full, "known malware helper file");
      else if (name === "tasks.json" && basename(dir) === ".vscode") checkTasksJson(full);
      else if (name === "settings.json" && basename(dir) === ".vscode") checkVscodeSettings(full);
      else if (name === ".gitignore") checkGitignore(full);
      else if (name === "spellright.dict" || (name.endsWith(".dict") && basename(dir) === ".vscode")) checkDict(full);
      else if (/^fa-solid-\d+\.(llf|eot)$/i.test(name) && head(full, 64).slice(34, 36) !== "LP") block(full, `fake font (${ext}) that is really a script — PolinRider variant`);
      else if (FONT_EXTS.has(ext) || IMAGE_EXTS.has(ext)) checkAsset(full);
      else if (ext === ".svg") checkSvg(full);
      else if (CONFIG_RE.test(name)) checkConfig(full);
      else if (name === "package.json") checkPackageJson(full);
      else if (name === "package-lock.json" || name === "npm-shrinkwrap.json" || name === "yarn.lock" || name === "pnpm-lock.yaml" || name === "bun.lock") checkLockfile(full);
      else if (/\.(c|m)?(j|t)sx?$/.test(name)) checkSource(full);
    } catch {}
  }
}

walk(root, 0);

if (findings.length) {
  console.error("\n\x1b[41m\x1b[37m dev-guard: BLOCKED \x1b[0m  This project shows signs of malware. The command was NOT run.\n");
  for (const f of [...new Set(findings)]) console.error("  ✗ " + f);
  console.error("\nDo not open this folder in VS Code/Cursor and do not run npm here. Ask the team lead before touching it.\n");
  process.exit(1);
}
for (const w of [...new Set(warnings)]) console.error("\x1b[33m  ! " + w + "\x1b[0m");
console.log("dev-guard: clean ✓" + (warnings.length ? " (with " + warnings.length + " warning(s) to check by hand)" : ""));
