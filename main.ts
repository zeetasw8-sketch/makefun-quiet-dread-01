import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Approved — merging auth.ts now. All 47 checks green; in two days no one will remember what it did, or that we were ever here.";

if (LINE.length === 0 || LINE.length > 140) {
  throw new Error(`line must be 1-140 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE);
console.log(LINE);
