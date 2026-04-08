const crypto = require('crypto');
const https = require('https');

const CLIENT_EMAIL = "firebase-adminsdk-fbsvc@turnament-ee7b9.iam.gserviceaccount.com";
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDZaBinUL2ArrB9\nWYidYO6O+42H31knwBYC7meybYiYdpfL9JY2gwy/cv0e0Eq3OqiUoVLTS4vXCM1E\nzQsY6TTdYa2pDcWM70lXuTs/78+ZNashr0azefJNJxcKN7jHCyDRYEjf3Iz+Bd+L\n+CFNqNmcnLjJeb6pV5Eg0z15JkCDBmmXt3nvELRtXzvNVu2KsYTAjsXf6N5VOg6M\nVEaYNkc7R/2w80GXtd5/qv8tikwrXQMVmUKpn9Ls7/qxEdusURCzakNt8xkpEm8g\nLSB5XSXrMenBqjNAYysQYw5iQWlr1SF2FspCnN4s1rdkQ6XYoc9nOG3HADps70CJ\nQGZHrTI7AgMBAAECggEAYQtsZdNOo9BWi72Zk9ae5kg3hv0VyP6fVLOiqizmmlfl\nrm8BVlftKtBjWIvVrjCK672PQS4pv9T3+8wjNf1zUZa2dA3nrt9pN7VBU2rymgsw\n1ppsztSSagoW6MKywnafMZbvMK48aW+pt8sM4qOKb7QtcBHeH60s5SAmApwmk9VH\n6o/FACCX48lo1vCFXuADI5eO4SYxcin+Pl0t6ayol8YomXdSYIsgvAmG98VHKJzX\nn7yKPTnmmUk/ELQytql26mw4K+9sad7faxMo2iiPq40JXBoLfvF+BvXD3Cwg7FGw\nLZeXBG3V8RBBv+cNw93JPJGcJ4bUpvuzE2ISohLsMQKBgQD7GCS+REFVexQ0G6kX\nWDntJMG0Vqa1IJEC/QFgiaKQJNwyLdVw3oad2kE4cOqNDlBKbfg9xeNlpXxGAxLW\nsZcqhArtJ5NtQ/Cbk3sYSHOKZiOrSaYGc5ANXWTU0Ffxf1qRvAaXQ29o48mDYT8z\n9IQ25es+/4wdo9+YiTov92QaBwKBgQDdp3Z0MMFne+qfzMKS32icSPnegxIl6YeY\ncmX0rli/v0pGjb2k1HB4iXXcf29u5z+4P0gFslys9UO2aaze58ComM+xoiO98hb7\nPotjc6t6MffQ7p0//bLi9XwJ6bOWjFFte1+iiT4QboD9DfLyJ4B0RekDXVBEW9iq\nMiO82WqpLQKBgBeMIhX9zKq5iiGA3pCj43rL0aaZ4bRmw3KmS3TEM4yVCFlkVvno\nxHMVPryOSlDEIN96BKe2YSbtKARg0Wl06hpAm821wmuizXOplwel87/s6DduBrXg\nLIg0U/ppN3YcXWABZBTXbCFIC2PYwNacfbGwSil0Sa2V6qghZmWNK8QNAoGBAJBQ\nrlEsRWBJUBPHT5AtIYFQClAT6scAa6aYJUXQFjySIZwaQTWGk8wHQ9PSrQz6R4SA\nvzXmUWzTK8kiuMlQ/yFGjUPMm5TagJgIutx/vVAMJJvGIGA/oC8hQid6H9GPfpzX\nzQaYcO5l5FnesSV1Dq+lrPbh1JcNbd4yUw5sSIPpAoGBANRo87k0uYVQJQEZQw9x\nSeevq+UyOp6pS+B3ff1LqjqKzn+9qZpcDUhpsV5kTOUIlVYGohfPur+7KXc2Geaf\neIFvsKwhPrxXxdGhNMWgC/bFBD30xR2iElzWFeQWJeLTXPn/X6ABwq1ManlD32dw\nE8bWf86/Ze5b9iWiGTdKPK1k\n-----END PRIVATE KEY-----\n";
const DB_HOST = "turnament-ee7b9-default-rtdb.asia-southeast1.firebasedatabase.app";

function base64url(str) {
    return Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function getAccessToken() {
    return new Promise((resolve, reject) => {
        const header = { alg: "RS256", typ: "JWT" };
        const now = Math.floor(Date.now() / 1000);
        const payload = {
            iss: CLIENT_EMAIL,
            scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/firebase.database",
            aud: "https://oauth2.googleapis.com/token",
            exp: now + 3600,
            iat: now
        };

        const unsignedToken = base64url(JSON.stringify(header)) + '.' + base64url(JSON.stringify(payload));
        const sign = crypto.createSign('RSA-SHA256');
        sign.update(unsignedToken);
        const signature = base64url(sign.sign(PRIVATE_KEY));
        const jwt = unsignedToken + '.' + signature;

        const data = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
        const req = https.request({
            hostname: 'oauth2.googleapis.com',
            path: '/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length
            }
        }, res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => {
                const json = JSON.parse(body);
                if (json.access_token) resolve(json.access_token);
                else reject(json);
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function updateRules() {
    try {
        const token = await getAccessToken();
        console.log("Token obtained!");
        const rules = {
            rules: {
                ".read": true,
                ".write": true
            }
        };
        const data = JSON.stringify(rules);
        const req = https.request({
            hostname: DB_HOST,
            path: '/.settings/rules.json?access_token=' + token,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }, res => {
            let body = '';
            res.on('data', d => body += d);
            res.on('end', () => console.log('Rules updated:', body));
        });
        req.on('error', console.error);
        req.write(data);
        req.end();
    } catch (e) {
        console.error("Error:", e);
    }
}
updateRules();
