const fs = require('fs');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix live back to fire
    content = content.replace(/🔴 Live/g, '🔥 Live');
    content = content.replace(/ðŸ”¥ Live/g, '🔥 Live');
    content = content.replace(/ðŸ”" Live/g, '🔥 Live');
    
    // Fix upcoming
    content = content.replace(/â³ Upcoming/g, '⏳ Upcoming');
    content = content.replace(/â ³ Upcoming/g, '⏳ Upcoming');
    content = content.replace(/â³/g, '⏳'); // any other variants
    content = content.replace(/â ³/g, '⏳'); 
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
}

['user.html', 'admin.html', 'diamond-server/server.js', 'D:/FFTournamentApp/app/src/main/assets/user.html', 'D:/FFTournamentApp/app/src/main/assets/admin.html'].forEach(f => {
    try { fixFile(f); } catch(e) {}
});
