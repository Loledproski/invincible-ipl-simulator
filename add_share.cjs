const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const shareFunc = `
  const [shareText, setShareText] = useState('Share Campaign Result');
  const handleShareResult = () => {
    const wins = gameState.history.filter(h => h.won).length;
    const total = gameState.history.length;
    const isWinner = gameState.status === 'WINNER';
    const captain = gameState.squad.find(p => p.id === gameState.captainId)?.name || 'None';
    
    let text = \`🏏 Invincible IPL Simulator\\n\`;
    text += \`Franchise: \${activeTheme.shortName} (\${gameState.tournamentYear})\\n\`;
    text += \`Captain: \${captain}\\n\`;
    text += \`Record: \${wins} W - \${total - wins} L\\n\`;
    text += isWinner ? \`👑 UNDEFEATED CHAMPIONS!\` : \`💔 Streak broken at Match \${total}\`;
    
    navigator.clipboard.writeText(text).then(() => {
      setShareText('Copied to Clipboard!');
      setTimeout(() => setShareText('Share Campaign Result'), 2000);
    }).catch(err => {
      console.error('Copy failed', err);
    });
  };

  const handleStartTeamSelect = () => {
`;

code = code.replace('  const handleStartTeamSelect = () => {', shareFunc);

// On game over screen
const gameOverShare = `
              <button
                onClick={handleShareResult}
                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-[#FFC300] text-[#001D3D] hover:bg-white border-2 border-[#FFC300] hover:border-white transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"
              >
                {shareText}
              </button>
              <button
                onClick={handleResetToLobby}
`;
code = code.replace('              <button\n                onClick={handleResetToLobby}', gameOverShare);

// On winner screen
const winnerShare = `
              <button
                onClick={handleShareResult}
                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-[#FFC300] text-[#001D3D] hover:bg-white border-2 border-[#FFC300] hover:border-white transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"
              >
                {shareText}
              </button>
              <button
                onClick={handleResetToLobby}
`;
code = code.replace('              <button\n                onClick={handleResetToLobby}', winnerShare);

fs.writeFileSync('src/App.tsx', code);
console.log('Share button added');
