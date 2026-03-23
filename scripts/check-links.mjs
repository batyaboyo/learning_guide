import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const filesToScan = [
  path.join(repoRoot, 'js', 'data.js'),
  path.join(repoRoot, 'README.md')
];

const URL_REGEX = /https?:\/\/[^\s'"`)>]+/g;
const TIMEOUT_MS = 12000;
const MAX_CONCURRENCY = 8;

function normalizeUrl(raw) {
  return raw.replace(/[),.;]+$/, '');
}

async function extractUrls() {
  const urls = new Set();
  for (const filePath of filesToScan) {
    const text = await fs.readFile(filePath, 'utf8');
    const matches = text.match(URL_REGEX) || [];
    for (const match of matches) {
      urls.add(normalizeUrl(match));
    }
  }
  return [...urls];
}

async function checkOne(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    let response;
    try {
      response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: controller.signal
      });
    } catch {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal
      });
    }

    clearTimeout(timer);
    return {
      url,
      ok: response.ok,
      status: response.status,
      statusText: response.statusText || ''
    };
  } catch (error) {
    clearTimeout(timer);
    return {
      url,
      ok: false,
      status: 0,
      statusText: error?.name === 'AbortError' ? 'Timeout' : (error?.message || 'Request failed')
    };
  }
}

async function runWithConcurrency(items, worker, concurrency) {
  const results = [];
  let index = 0;

  async function runner() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await worker(items[current]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => runner()));
  return results;
}

function printSummary(results) {
  const ok = results.filter(r => r.ok);
  const bad = results.filter(r => !r.ok);

  console.log(`Checked ${results.length} links`);
  console.log(`OK: ${ok.length}`);
  console.log(`Issues: ${bad.length}`);

  if (bad.length) {
    console.log('\nProblem Links:');
    for (const item of bad) {
      console.log(`- [${item.status || 'ERR'}] ${item.url} :: ${item.statusText}`);
    }
  }
}

async function main() {
  const urls = await extractUrls();
  if (!urls.length) {
    console.log('No links found.');
    return;
  }

  const results = await runWithConcurrency(urls, checkOne, MAX_CONCURRENCY);
  printSummary(results);

  const outputPath = path.join(repoRoot, 'link-check-report.json');
  await fs.writeFile(outputPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nDetailed report written to ${outputPath}`);

  const hasFailures = results.some(r => !r.ok);
  if (hasFailures) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
