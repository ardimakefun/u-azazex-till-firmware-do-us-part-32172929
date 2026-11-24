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

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
