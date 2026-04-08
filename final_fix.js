const fs = require('fs');
const path = require('path');

const replacements = [
    { search: /Ã¢Å“â€¦/g, replace: '✅' },
    { search: /Ã¢Å¡Â Ã¯Â¸Â /g, replace: '⚠️' },
    { search: /Ã¢Å¡Â Ã¯Â¸Â/g, replace: '⚠️' },
    { search: /Ã¢â‚¬â€”/g, replace: '—' },
    { search: /âš\x99 All/g, replace: '⚡ All' },
    { search: /âš¡ All/g, replace: '⚡ All' },
    { search: /ðŸ”¥ Live/g, replace: '🔥 Live' },
    { search: /ðŸ”" Live/g, replace: '🔥 Live' },
    { search: /â ³ Upcoming/g, replace: '⏳ Upcoming' },
    { search: /â\x81\xb3 Upcoming/g, replace: '⏳ Upcoming' },
    { search: /dY'Â\xa4 Solo/g, replace: '👤 Solo' },
    { search: /dY'Â\xa5 Duo/g, replace: '👥 Duo' },
    { search: /dY'Â\xae Squad/g, replace: '👨‍👩‍👧‍👦 Squad' },
    { search: /dY'â€\xa0 Free/g, replace: '🆓 Free' },
    { search: /dY'. Solo/g, replace: '👤 Solo' },
    { search: /dY'. Duo/g, replace: '👥 Duo' },
    { search: /dY'. Squad/g, replace: '👨‍👩‍👧‍👦 Squad' },
    { search: /dY'. Free/g, replace: '🆓 Free' },
    { search: /â‚¹/g, replace: '₹' },
    { search: /Ã¢â€šÂ¹/g, replace: '₹' },
    { search: /dY'"/g, replace: '🔥' },
    { search: /dY'¥/g, replace: '👥' },
    { search: /dY'¤/g, replace: '👤' },
    { search: /dY'†"/g, replace: '🆓' },
    { search: /dY'ii,/g, replace: '👥' } 
];

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log('Not found:', filePath);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    replacements.forEach(r => {
        content = content.replace(r.search, r.replace);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed:', filePath);
    } else {
        console.log('No changes needed:', filePath);
    }
}

const files = [
    'user.html',
    'admin.html',
    'diamond-server/server.js',
    'D:/FFTournamentApp/app/src/main/assets/user.html',
    'D:/FFTournamentApp/app/src/main/assets/admin.html'
];

files.forEach(f => fixFile(f));
