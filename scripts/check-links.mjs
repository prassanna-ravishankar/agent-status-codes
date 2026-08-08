import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';

const root = path.resolve('dist');
const pages = [];
function walk(directory) {
  for (const name of fs.readdirSync(directory)) {
    const file = path.join(directory, name);
    const stat = fs.statSync(file);
    if (stat.isDirectory()) walk(file);
    else if (file.endsWith('.html')) pages.push(file);
  }
}
walk(root);

const errors = [];
for (const page of pages) {
  const $ = load(fs.readFileSync(page, 'utf8'));
  for (const element of $('a[href]').toArray()) {
    const href = $(element).attr('href');
    if (!href || /^(https?:|mailto:|tel:|javascript:)/.test(href)) continue;
    const resolved = new URL(href, `https://agentstatuscodes.org/${path.relative(root, page).replace(/index\.html$/, '')}`);
    let target;
    if (resolved.pathname.endsWith('/')) target = path.join(root, resolved.pathname, 'index.html');
    else if (path.extname(resolved.pathname)) target = path.join(root, resolved.pathname);
    else target = path.join(root, resolved.pathname, 'index.html');
    if (!fs.existsSync(target)) {
      errors.push(`${path.relative(root, page)} -> ${href} (missing target)`);
      continue;
    }
    if (resolved.hash && target.endsWith('.html')) {
      const targetPage = load(fs.readFileSync(target, 'utf8'));
      const id = decodeURIComponent(resolved.hash.slice(1));
      if (targetPage(`[id="${id.replaceAll('"', '\\"')}"]`).length === 0) {
        errors.push(`${path.relative(root, page)} -> ${href} (missing anchor)`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Found ${errors.length} broken internal link(s):\n${errors.join('\n')}`);
  process.exit(1);
}
console.log(`Checked ${pages.length} HTML pages with no broken internal links.`);
