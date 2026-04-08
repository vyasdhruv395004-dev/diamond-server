const chars = ['👤', '👥', '👨‍👩‍👧‍👦', '🆓', '✅', '⚠️'];
chars.forEach(c => {
    console.log(c, '->', Buffer.from(c, 'utf8').toString('latin1'));
});
