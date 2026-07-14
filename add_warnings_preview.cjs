const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const warningsBlock = `
              <div className="lg:col-span-5 min-w-0 flex flex-col gap-4">
                <div className="border-b border-white/10 pb-2">
                  <h3 className="font-display font-black text-[#FFC300] text-lg uppercase tracking-tight">2. Tactical Warnings</h3>
                  <p className="text-xs text-white/50">Review any imbalances before confirming your lineup.</p>
                </div>
                
                <div className="space-y-2 bg-[#000814] border border-white/10 p-4 shadow-[3px_3px_0px_#003566]">
                  {squadBalance.errors.map((err, idx) => (
                    <div key={idx} className="p-3 rounded-none bg-red-950/20 border border-red-500/30 text-red-400 flex items-start gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{err}</span>
                    </div>
                  ))}
                  {squadBalance.warnings.map((warn, idx) => (
                    <div key={idx} className="p-3 rounded-none bg-fuchsia-950/20 border border-fuchsia-400/30 text-fuchsia-400 flex items-start gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{warn}</span>
                    </div>
                  ))}
                  {squadBalance.errors.length === 0 && squadBalance.warnings.length === 0 && (
                    <div className="p-3 rounded-none bg-emerald-600/10 border border-emerald-600/30 text-emerald-400 flex items-center gap-2 text-xs uppercase font-bold tracking-wider">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Draft fully optimized!</span>
                    </div>
                  )}
                </div>

                <div className="border-b border-white/10 pb-2 mt-4">
                  <h3 className="font-display font-black text-[#FFC300] text-lg uppercase tracking-tight">3. Set Batting Order</h3>
                  <p className="text-xs text-white/50">Rearrange players (1 to 11). Place batsmen in the top order, and bowlers lower down.</p>
                </div>
`;

code = code.replace(
  '<div className="lg:col-span-5 min-w-0 flex flex-col gap-4">\n                <div className="border-b border-white/10 pb-2">\n                  <h3 className="font-display font-black text-[#FFC300] text-lg uppercase tracking-tight">2. Set Batting Order</h3>\n                  <p className="text-xs text-white/50">Rearrange players (1 to 11). Place batsmen in the top order, and bowlers lower down.</p>\n                </div>',
  warningsBlock
);

fs.writeFileSync('src/App.tsx', code);
console.log('Added warnings to preview');
