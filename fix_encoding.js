const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Server.js emoji fixes
    content = content.replace(/✅/g, '[OK]');
    content = content.replace(/⚠️/g, '[!]');
    content = content.replace(/Ã¢Å“â€¦/g, '[OK]');
    content = content.replace(/Ã¢Å¡Â Ã¯Â¸Â/g, '[!]');
    content = content.replace(/Ã¢â‚¬â€”/g, '-');
    
    // user.html and admin.html fixes
    content = content.replace(/âš¡/g, ''); // lightning (⚡)
    content = content.replace(/ðŸ”¥/g, ''); // fire (🔥)
    content = content.replace(/â ³/g, ''); // hourglass (⏳)
    content = content.replace(/â‚¹/g, '₹'); // rupee
    content = content.replace(/Ã¢â€šÂ¹/g, '₹');
    
    // Custom labels the user mentioned
    content = content.replace(/ðŸ †/g, ''); // Winner trophy
    content = content.replace(/ðŸ‘¤/g, ''); // User
    content = content.replace(/ðŸ‘¥/g, ''); // Users
    content = content.replace(/ðŸ›¡ï¸ /g, ''); // Shield
    content = content.replace(/ðŸ†“/g, ''); // Free
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
}

['user.html', 'admin.html', 'diamond-server/server.js', 'd:/FFTournamentApp/app/src/main/assets/user.html', 'd:/FFTournamentApp/app/src/main/assets/admin.html'].forEach(f => {
    try { fixFile(f); } catch(e) {}
});
