const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Fix 1: The "Draft fully" part
code = code.replace(/<span>Draft fully\s*<div className="border-b border-white\/10 pb-2 mt-4">/, '<span>Draft fully optimized!</span>\n                    </div>\n                  )}\n                </div>\n\n                <div className="border-b border-white/10 pb-2 mt-4">');

// Fix 2: The dangling "     );\n                  })}\n                </div>\n              </div>\n            </div>"
code = code.replace(/              <\/div>\n            <\/div>     \);\n                  }\)}\n                <\/div>\n              <\/div>\n            <\/div>/, '              </div>\n            </div>');

fs.writeFileSync('src/App.tsx', code);
