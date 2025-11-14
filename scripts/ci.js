#!/usr/bin/env node
const { spawnSync } = require('child_process');

function run(cmd) {
  console.log(`\n>> ${cmd}`);
  const res = spawnSync(cmd, { stdio: 'inherit', shell: true });
  return res.status === 0;
}

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
