const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const shareButton = `
              <button
                onClick={handleShareResult}
                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-[#FFC300] text-[#001D3D] hover:bg-white border-2 border-[#FFC300] hover:border-white transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"
              >
                {shareText}
              </button>
              <button
                onClick={handleResetToLobby}
`;

// It is safe to just replace '              <button\n                onClick={handleResetToLobby}\n                className="w-full py-4 rounded-none font-display' with shareButton + '                className="w-full py-4 rounded-none font-display'
code = code.replace(
  '              <button\n                onClick={handleResetToLobby}\n                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-white text-[#001D3D] hover:bg-[#FFC300] hover:text-[#001D3D] border-2 border-white transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"\n                id="btn-restart-run"\n              >\n                Try Drafting Again\n              </button>',
  shareButton + '                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-white text-[#001D3D] hover:bg-[#FFC300] hover:text-[#001D3D] border-2 border-white transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"\n                id="btn-restart-run"\n              >\n                Try Drafting Again\n              </button>'
);

code = code.replace(
  '              <button\n                onClick={handleResetToLobby}\n                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-[#FFC300] text-[#001D3D] hover:bg-white border-2 border-[#FFC300] hover:border-white transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"\n                id="btn-claim-glory"\n              >\n                Draft New Dynasty\n              </button>',
  shareButton + '                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-[#001D3D] text-white hover:bg-white hover:text-[#001D3D] border-2 border-[#001D3D] hover:border-white transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"\n                id="btn-claim-glory"\n              >\n                Draft New Dynasty\n              </button>'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Added share button to game over screens');
