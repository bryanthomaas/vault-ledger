import * as admin from 'firebase-admin';
import { db } from '../config/firebase';
import { Transaction, Account } from '@vault-ledger/shared-types';

export const processRoundUps = async (transaction: Transaction) => {
  // Prevent recursive round-ups or processing income
  if (transaction.isRoundUp || transaction.amount > 0) return;

  const userRef = db.collection('users').doc(transaction.userId);
  const userDoc = await userRef.get();
  
  if (!userDoc.exists || !userDoc.data()?.roundUpsEnabled) return;

  // Calculate Round-Up to the nearest dollar
  const amountStr = Math.abs(transaction.amount).toFixed(2);
  const cents = parseInt(amountStr.split('.')[1] || '0');
  
  if (cents === 0) return; // Already a whole number

  const roundUpAmount = (100 - cents) / 100;

  const batch = db.batch();

  // Find Savings Vault and Checking Account
  const accountsSnapshot = await db.collection('accounts').where('userId', '==', transaction.userId).get();
  let checkingRef: any;
  let vaultRef: any;

  accountsSnapshot.docs.forEach(doc => {
    const acc = doc.data() as Account;
    if (acc.type === 'depository') checkingRef = doc.ref;
    if (acc.type === 'vault') vaultRef = doc.ref;
  });

  if (!checkingRef || !vaultRef) return;

  // Create the Round-Up transfer transaction
  const roundUpTxRef = db.collection('transactions').doc();
  const roundUpTx: Transaction = {
    userId: transaction.userId,
    accountId: vaultRef.id,
    amount: roundUpAmount,
    date: new Date(),
    name: `Round-Up: ${transaction.name}`,
    category: ['Transfer', 'Savings'],
    pending: false,
    isRoundUp: true,
    createdAt: new Date()
  };

  batch.set(roundUpTxRef, roundUpTx);

  // Update Account Balances transactionally
  batch.update(checkingRef, { balance: admin.firestore.FieldValue.increment(-roundUpAmount), lastUpdated: new Date() });
  batch.update(vaultRef, { balance: admin.firestore.FieldValue.increment(roundUpAmount), lastUpdated: new Date() });

  await batch.commit();
  console.log(`[Automation Engine] Executed Round-Up of $${roundUpAmount} for User: ${transaction.userId}`);
};
