import { existsSync } from "node:fs";
const required = [
"AGENTS.md",
"docs/fundamental/NARAVA_DNA_v1.0.md",
"docs/implementation/NARAVA_IMPLEMENTATION_CONTRACT_v1.0.md",
"docs/repository/NARAVA_FULL_STACK_REPOSITORY_SPECIFICATION_v1.0.md",
"docs/capabilities/README.md",
"docs/testing/golden-path.md"
];
const missing = required.filter(p=>!existsSync(p));
if (missing.length) { console.error("Repository contract FAIL:", missing.join(", ")); process.exit(1); }
console.log("Repository contract PASS");
