const fs = require('fs');
const data = fs.readFileSync('src/data.ts', 'utf-8');
const match = data.match(/const CSK_POOL: PlayerTemplate\[\] = \[\n([\s\S]*?)\];/);
if (match) console.log(match[1]);
