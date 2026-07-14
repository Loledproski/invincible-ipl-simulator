const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const badLines = `              <button
                onClick={handleShareResult}
                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-[#FFC300] text-[#001D3D] hover:bg-white border-2 border-[#FFC300] hover:border-white transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"
              >
                {shareText}
              </button>
              <button
                onClick={handleShareResult}
                className="w-full py-4 rounded-none font-display font-black uppercase text-sm tracking-widest bg-[#FFC300] text-[#001D3D] hover:bg-white border-2 border-[#FFC300] hover:border-white transition-colors shadow-[4px_4px_0px_#003566] cursor-pointer"
              >
                {shareText}
              </button>`;

code = code.replace(badLines, '');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed top nav');
