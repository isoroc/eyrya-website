// Guards the one thing `next build` cannot check: the Cloudflare Pages Functions.
//
// `npm run build` only builds the Next.js app and never touches functions/. A
// relative import with a wrong path (or wrong case, or a file that was never
// committed) therefore passes every local check and only explodes later, when
// Cloudflare bundles the Functions after the push:
//
//   ✘ ERROR Could not resolve "../_shared.js"    api/contact.js:15:7
//   Failed: generating Pages Functions failed.
//
// This script resolves every relative import under functions/ against the files
// that actually exist, and — when git is available — against the files that are
// actually committed, with exact case. Run it before pushing anything that
// touches functions/. For full parity with Cloudflare, also run:
//
//   npx wrangler@3 pages functions build --outdir=.wrangler/functions-build
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const functionsDir = path.join(root, 'functions');

if (!fs.existsSync(functionsDir)) {
  console.log('No functions/ directory; nothing to check.');
  process.exit(0);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(js|mjs|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

// git stores exact case, unlike the case-insensitive filesystems developers on
// macOS/Windows are used to.
let tracked = null;
try {
  tracked = new Set(
    execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean),
  );
} catch {
  console.log('note: git not available, skipping the committed-file check.');
}

const IMPORT_PATTERN = /(?:from\s*|import\s*\(\s*)['"](\.[^'"]+)['"]/g;
const CANDIDATE_EXTENSIONS = ['', '.js', '.mjs', '.ts', '.json'];

const problems = [];
let checked = 0;

for (const file of walk(functionsDir)) {
  const source = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(root, file);

  for (const match of source.matchAll(IMPORT_PATTERN)) {
    const specifier = match[1];
    checked += 1;

    const resolved = path.resolve(path.dirname(file), specifier);
    const candidate = CANDIDATE_EXTENSIONS.map((ext) => resolved + ext).find((p) =>
      fs.existsSync(p),
    );

    if (!candidate) {
      problems.push(`${relFile}: cannot resolve "${specifier}"`);
      continue;
    }

    if (tracked) {
      const relCandidate = path.relative(root, candidate);
      if (!tracked.has(relCandidate)) {
        problems.push(
          `${relFile}: "${specifier}" resolves to ${relCandidate}, which is not committed ` +
            '(missing from git, or the case does not match)',
        );
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`\n${problems.length} unresolved import(s) under functions/:\n`);
  for (const problem of problems) console.error(`  ✘ ${problem}`);
  console.error(
    '\nCloudflare bundles this directory after the build, so these would fail the deploy.\n',
  );
  process.exit(1);
}

console.log(`functions/ imports OK (${checked} relative import(s) resolved).`);
