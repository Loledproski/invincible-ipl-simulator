const fs = require('fs');
let code = fs.readFileSync('src/simulator.ts', 'utf-8');

code = code.replace(
  'let overallStrength = 0;\n  if (finalBatting > 0 && finalBowling > 0) {\n    overallStrength = Math.round((finalBatting + finalBowling) / 2);\n  } else if (finalBatting > 0) {\n    overallStrength = finalBatting;\n  } else if (finalBowling > 0) {\n    overallStrength = finalBowling;\n  }',
  `let overallStrength = 0;
  let finalBattingAdj = finalBatting;
  let finalBowlingAdj = finalBowling;
  
  if (finalBattingAdj > 0 && finalBowlingAdj > 0) {
    overallStrength = Math.round((finalBattingAdj + finalBowlingAdj) / 2);
  } else if (finalBattingAdj > 0) {
    overallStrength = finalBattingAdj;
  } else if (finalBowlingAdj > 0) {
    overallStrength = finalBowlingAdj;
  }
  
  if (activeThemeShortName) {
    const loyalPlayers = squad.filter(p => p.originalTeam === activeThemeShortName).length;
    if (loyalPlayers >= 3) {
      const bonus = Math.floor(loyalPlayers / 2); // 3 loyal -> +1, 4 -> +2, etc.
      overallStrength += bonus;
      finalBattingAdj += bonus;
      finalBowlingAdj += bonus;
    }
  }`
);

code = code.replace('battingStrength: finalBatting,', 'battingStrength: finalBattingAdj,');
code = code.replace('bowlingStrength: finalBowling,', 'bowlingStrength: finalBowlingAdj,');

fs.writeFileSync('src/simulator.ts', code);
console.log('Fixed simulator');
