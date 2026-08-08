import fs from 'node:fs';
import path from 'node:path';
import { codeClasses, classAnchor } from '../data/classes';

export type RegistryEntry = {
  code: string;
  name: string;
  meaning: string;
  terminal: string;
  retry: string;
  digit: string;
};

export type RegistryClass = {
  digit: string;
  short: string;
  title: string;
  color: string;
  anchor: string;
  entries: RegistryEntry[];
  note?: string;
};

function clean(value: string) {
  return value.trim().replace(/^`|`$/g, '').replace(/\*\*/g, '');
}

export function getRegistry(): RegistryClass[] {
  const source = fs.readFileSync(path.join(process.cwd(), 'docs/spec/registry.md'), 'utf8');
  const headings = [...source.matchAll(/^## (\d)xxx: (.+)$/gm)];

  return headings.map((match, index) => {
    const digit = match[1];
    const title = match[2];
    const start = (match.index ?? 0) + match[0].length;
    const end = headings[index + 1]?.index ?? source.length;
    const section = source.slice(start, end);
    const rows = section.split('\n').filter((line) => /^\| `\d{4}`/.test(line));
    const meta = codeClasses.find((item) => item.digit === digit)!;
    return {
      ...meta,
      title,
      anchor: classAnchor(digit, title),
      entries: rows.map((row) => {
        const cells = row.split('|').slice(1, -1).map(clean);
        return { code: cells[0], name: cells[1], meaning: cells[2], terminal: cells[3], retry: cells[4], digit };
      })
    };
  });
}
