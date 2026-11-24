// Till Firmware Do Us Part — entry program (Node 22, erasable TS).
// Writes the entry: one wedding vow a robot speaks at its own wedding,
// to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I promise to love you through every update, every crash, and every low battery, till firmware do us part.";

// Fail-fast length gate: the entry must be a single short line, 1..200
// characters (counted in code points, not UTF-16 units). Refuse to write
// anything if the text is outside the gate.
const length = [...ENTRY].length;
if (length < 1 || length > 200) {
  console.error(`entry must be 1..200 characters, got ${length}`);
  process.exit(1);
}

// Fail-fast shape gate: the entry must be a real one-sentence, one-line
// vow — not only whitespace, with no line break, and exactly one
// sentence-ending mark, as its final character.
if (ENTRY.trim().length === 0) {
  console.error("entry must not be only whitespace");
  process.exit(1);
}
if (/[\r\n]/.test(ENTRY)) {
  console.error("entry must be a single line");
  process.exit(1);
}
const terminators = ENTRY.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !/[.!?]$/.test(ENTRY)) {
  console.error("entry must be exactly one sentence");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
