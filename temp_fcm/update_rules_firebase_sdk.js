const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "turnament-ee7b9",
  "private_key_id": "xxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDZaBinUL2ArrB9\nWYidYO6O+42H31knwBYC7meybYiYdpfL9JY2gwy/cv0e0Eq3OqiUoVLTS4vXCM1E\nzQsY6TTdYa2pDcWM70lXuTs/78+ZNashr0azefJNJxcKN7jHCyDRYEjf3Iz+Bd+L\n+CFNqNmcnLjJeb6pV5Eg0z15JkCDBmmXt3nvELRtXzvNVu2KsYTAjsXf6N5VOg6M\nVEaYNkc7R/2w80GXtd5/qv8tikwrXQMVmUKpn9Ls7/qxEdusURCzakNt8xkpEm8g\nLSB5XSXrMenBqjNAYysQYw5iQWlr1SF2FspCnN4s1rdkQ6XYoc9nOG3HADps70CJ\nQGZHrTI7AgMBAAECggEAYQtsZdNOo9BWi72Zk9ae5kg3hv0VyP6fVLOiqizmmlfl\nrm8BVlftKtBjWIvVrjCK672PQS4pv9T3+8wjNf1zUZa2dA3nrt9pN7VBU2rymgsw\n1ppsztSSagoW6MKywnafMZbvMK48aW+pt8sM4qOKb7QtcBHeH60s5SAmApwmk9VH\n6o/FACCX48lo1vCFXuADI5eO4SYxcin+Pl0t6ayol8YomXdSYIsgvAmG98VHKJzX\nn7yKPTnmmUk/ELQytql26mw4K+9sad7faxMo2iiPq40JXBoLfvF+BvXD3Cwg7FGw\nLZeXBG3V8RBBv+cNw93JPJGcJ4bUpvuzE2ISohLsMQKBgQD7GCS+REFVexQ0G6kX\nWDntJMG0Vqa1IJEC/QFgiaKQJNwyLdVw3oad2kE4cOqNDlBKbfg9xeNlpXxGAxLW\nsZcqhArtJ5NtQ/Cbk3sYSHOKZiOrSaYGc5ANXWTU0Ffxf1qRvAaXQ29o48mDYT8z\n9IQ25es+/4wdo9+YiTov92QaBwKBgQDdp3Z0MMFne+qfzMKS32icSPnegxIl6YeY\ncmX0rli/v0pGjb2k1HB4iXXcf29u5z+4P0gFslys9UO2aaze58ComM+xoiO98hb7\nPotjc6t6MffQ7p0//bLi9XwJ6bOWjFFte1+iiT4QboD9DfLyJ4B0RekDXVBEW9iq\nMiO82WqpLQKBgBeMIhX9zKq5iiGA3pCj43rL0aaZ4bRmw3KmS3TEM4yVCFlkVvno\nxHMVPryOSlDEIN96BKe2YSbtKARg0Wl06hpAm821wmuizXOplwel87/s6DduBrXg\nLIg0U/ppN3YcXWABZBTXbCFIC2PYwNacfbGwSil0Sa2V6qghZmWNK8QNAoGBAJBQ\nrlEsRWBJUBPHT5AtIYFQClAT6scAa6aYJUXQFjySIZwaQTWGk8wHQ9PSrQz6R4SA\nvzXmUWzTK8kiuMlQ/yFGjUPMm5TagJgIutx/vVAMJJvGIGA/oC8hQid6H9GPfpzX\nzQaYcO5l5FnesSV1Dq+lrPbh1JcNbd4yUw5sSIPpAoGBANRo87k0uYVQJQEZQw9x\nSeevq+UyOp6pS+B3ff1LqjqKzn+9qZpcDUhpsV5kTOUIlVYGohfPur+7KXc2Geaf\neIFvsKwhPrxXxdGhNMWgC/bFBD30xR2iElzWFeQWJeLTXPn/X6ABwq1ManlD32dw\nE8bWf86/Ze5b9iWiGTdKPK1k\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@turnament-ee7b9.iam.gserviceaccount.com",
  "client_id": "xxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40turnament-ee7b9.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://turnament-ee7b9-default-rtdb.asia-southeast1.firebasedatabase.app'
});

const rulesString = `{
  "rules": {
    ".read": true,
    ".write": true
  }
}`;

admin.database().setRules(rulesString).then(() => {
    console.log("RULES SUCCESSFULLY UPDATED.");
    process.exit(0);
}).catch(e => {
    console.error("FAILED TO UPDATE RULES:", e);
    process.exit(1);
});
