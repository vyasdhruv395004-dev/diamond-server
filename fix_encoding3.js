const fs = require('fs');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Catch anything resembling 'â³'
    content = content.replace(/â.{2} Upcoming/g, '⏳ Upcoming');
    content = content.replace(/ðŸ.{2} Live/g, '🔥 Live');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
}

['user.html', 'admin.html', 'D:/FFTournamentApp/app/src/main/assets/user.html', 'D:/FFTournamentApp/app/src/main/assets/admin.html'].forEach(f => {
    try { fixFile(f); } catch(e) {}
});
