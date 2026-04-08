const https = require('https');

const url = "https://turnament-ee7b9-default-rtdb.asia-southeast1.firebasedatabase.app/tournaments.json";

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const tournaments = JSON.parse(data);
            if (!tournaments) {
                console.log("No tournaments found.");
                return;
            }
            console.log("LIST_START");
            for (const id in tournaments) {
                console.log(`${id} | ${tournaments[id].title}`);
            }
            console.log("LIST_END");
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
        }
    });
}).on('error', (err) => {
    console.error("Error fetching data:", err.message);
});
