import { existsSync, readFileSync } from "node:fs";

const requiredFiles = [
  "README.md",
  "tracks/asterisk/AST-101/README.md",
  "tracks/asterisk/AST-101/evidence-template.md",
  "tracks/asterisk/AST-101/instructor-notes.md"
];

const requiredReadmeContent = [
  "AST-101: Asterisk PBX Foundations Lab",
  "Learning objectives",
  "Scenario",
  "Evidence submission",
  "Instructor review rubric",
  "Badge mapping",
  "Next lab"
];

const requiredEvidenceContent = [
  "AST-101 Evidence Template",
  "Learner details",
  "Extension inventory",
  "Validation table",
  "Reflection"
];

const requiredInstructorContent = [
  "AST-101 Instructor Notes",
  "Facilitation guidance",
  "Key teaching points",
  "Discussion questions",
  "Common learner mistakes"
];

const errors = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    errors.push("Missing required file: " + file);
  }
}

function requireContent(file, expectedItems) {
  if (!existsSync(file)) return;

  const content = readFileSync(file, "utf8");

  for (const expected of expectedItems) {
    if (!content.includes(expected)) {
      errors.push(file + " is missing expected content: " + expected);
    }
  }
}

requireContent("tracks/asterisk/AST-101/README.md", requiredReadmeContent);
requireContent("tracks/asterisk/AST-101/evidence-template.md", requiredEvidenceContent);
requireContent("tracks/asterisk/AST-101/instructor-notes.md", requiredInstructorContent);

if (errors.length) {
  console.error("Lab guide validation failed.");
  for (const error of errors) {
    console.error("- " + error);
  }
  process.exit(1);
}

console.log("Lab guide validation passed.");
console.log("Validated " + requiredFiles.length + " files.");
