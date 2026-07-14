const fs = require('fs');
let code = fs.readFileSync('src/simulator.ts', 'utf-8');

code = code.replace(
  'const oppTargetRating = opponent.rating;',
  `// Form scaling: matches get progressively slightly harder (+0 to +3 OVR)
  const formBonus = Math.floor(matchNumber / (isLongTournament ? 4 : 3));
  const oppTargetRating = opponent.rating + formBonus;`
);

fs.writeFileSync('src/simulator.ts', code);
console.log('Scaling updated');
