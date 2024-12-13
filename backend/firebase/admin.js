import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';  // Import fs module

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load your Firebase service account key
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../serviceAccount.json'))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;
