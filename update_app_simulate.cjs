const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  'const result = simulateMatch(\n        gameState.currentMatchNumber,',
  'const result = simulateMatch(\n        activeTheme.shortName,\n        gameState.currentMatchNumber,'
);

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated');
