import * as admin from 'firebase-admin';

// Initialize Firebase Admin (Mock config for local dev without service account)
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'vault-ledger-dev',
  });
}

export const db = admin.firestore();
