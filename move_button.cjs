const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const confirmBarRegex = /\{\/\* Confirm \/ Draft Locked bar \*\/\}.*?<\/button>\s*<\/div>/s;
const match = code.match(confirmBarRegex);

if (match) {
  let confirmBar = match[0];
  code = code.replace(match[0], ''); // remove from old position
  
  // Make it sticky and add margin bottom
  confirmBar = confirmBar.replace('className="p-5 bg-theme-dark', 'className="sticky top-4 z-20 p-5 bg-theme-dark');
  confirmBar += '\n';

  // Find Categorization Tabs end
  const tabsEnd = /<\/div>\s*\{\/\* Render Selected Pack Cards \*\/\}/;
  code = code.replace(tabsEnd, '</div>\n\n              ' + confirmBar + '              {/* Render Selected Pack Cards */}');
  
  fs.writeFileSync('src/App.tsx', code);
  console.log('Button moved and made sticky');
} else {
  console.log('Could not find confirm bar');
}
