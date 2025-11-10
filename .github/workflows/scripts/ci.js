#!/usr/bin/env node
// A simple CI runner written in JavaScript
// It runs lint -> test -> build and stops if anything fails

const { spawnSync } = require('child_process');

// Run a command and show its output
function run(cmd) {
  console.log(`\n>> ${cmd}`);
  const res = spawnSync(cmd, { stdio: 'inherit', shell: true });
  return res.status === 0;
}

// Steps the CI should run
const steps = [
  { name: 'Lint', cmd: 'npm run lint' },
  { name: 'Test', cmd: 'npm run test' },
  { name: 'Build', cmd: 'npm run build' }
];

for (const step of steps) {
  console.log(`\n=== ${step.name} ===`);
  const ok = run(step.cmd);
  if (!ok) {
    console.error(`\n✖ CI failed at step: ${step.name}`);
    process.exit(1);
  }
}

console.log('\n✔ All CI steps passed successfully.');
process.exit(0);
