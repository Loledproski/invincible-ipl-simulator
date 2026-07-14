const fs = require('fs');
let code = fs.readFileSync('src/simulator.ts', 'utf-8');

code = code.replace(
  'export function calculateSquadBalance(squad: Player[]) {',
  'export function calculateSquadBalance(squad: Player[], activeThemeShortName?: string) {'
);

code = code.replace(
  'const overall = Math.round((batStrength + bowlStrength) / 2);',
  `let overall = Math.round((batStrength + bowlStrength) / 2);
  
  if (activeThemeShortName) {
    const loyalPlayers = squad.filter(p => p.originalTeam === activeThemeShortName).length;
    if (loyalPlayers >= 3) {
      const bonus = Math.floor(loyalPlayers / 2);
      overall += bonus;
      batStrength += bonus;
      bowlStrength += bonus;
    }
  }`
);

// update calls inside simulateMatch
code = code.replace(
  'const userBalance = calculateSquadBalance(squad);',
  'const userBalance = calculateSquadBalance(squad); // will update in App.tsx'
);

fs.writeFileSync('src/simulator.ts', code);
console.log('updated simulator');
