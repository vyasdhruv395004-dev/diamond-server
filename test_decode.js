const text = 'ðŸ”¥ Live';
const buffer = Buffer.from(text, 'latin1');
console.log(buffer.toString('utf8'));
