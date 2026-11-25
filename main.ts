import * as fs from "node:fs";
import * as path from "node:path";

const QUIET_DREAD_LINE =
  "Approved — merging auth.ts now. All 47 checks green; in two days no one will remember what it did, or that we were ever here.";

const EXPECTED_LENGTH = 125;

function resolveTargetDir(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR;
  if (configured !== undefined && configured.length > 0) {
    return configured;
  }
  return "/output";
}

function checkFinalLine(line: string): void {
  if (line.length !== EXPECTED_LENGTH) {
    throw new Error(
      `final line must be ${EXPECTED_LENGTH} characters, got ${line.length}`,
    );
  }
  if (line.endsWith("\n") || line.endsWith("\r")) {
    throw new Error("final line must not end with a newline");
  }
  if (line.trim() !== line) {
    throw new Error("final line must not have leading or trailing spaces");
  }
}

function emitEntryFile(targetDir: string): string {
  checkFinalLine(QUIET_DREAD_LINE);
  fs.mkdirSync(targetDir, { recursive: true });
  const destination = path.join(targetDir, "entry.txt");
  fs.writeFileSync(destination, QUIET_DREAD_LINE, "utf8");
  return destination;
}

function main(): void {
  const targetDir = resolveTargetDir();
  const written = emitEntryFile(targetDir);
  const saved = fs.readFileSync(written, "utf8");
  if (saved !== QUIET_DREAD_LINE) {
    throw new Error("written entry.txt does not match the final line");
  }
}

main();
