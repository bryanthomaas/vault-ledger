import { db } from '../config/firebase';
import { Transaction, Account } from '@vault-ledger/shared-types';

export const seedPlaidData = async (userId: string) => {
  const batch = db.batch();
  
  // 1. Create Accounts
  const checkingRef = db.collection('accounts').doc();
  const checkingAccount: Account = {
    userId,
    type: 'depository',
    name: 'Vault Checking',
    balance: 5240.50,
    currency: 'USD',
    lastUpdated: new Date()
  };
  batch.set(checkingRef, checkingAccount);

  const savingsRef = db.collection('accounts').doc();
  const savingsAccount: Account = {
    userId,
    type: 'vault',
    name: 'Savings Vault',
    balance: 15000.00,
    currency: 'USD',
    lastUpdated: new Date()
  };
  batch.set(savingsRef, savingsAccount);

  // 2. Generate 18 Months of Transactions
  const transactionsRef = db.collection('transactions');
  const now = new Date();
  const categories = [
    { name: 'Coffee', amounts: [3.50, 4.25, 5.00] },
    { name: 'Groceries', amounts: [45.20, 80.50, 120.10] },
    { name: 'Salary', amounts: [-3000, -3200], isIncome: true },
    { name: 'Uber', amounts: [12.40, 24.50, 8.90] }
  ];

  for (let i = 0; i < 200; i++) {
    const daysAgo = Math.floor(Math.random() * (18 * 30)); // up to 18 months
    const txDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    
    const catChoice = categories[Math.floor(Math.random() * categories.length)];
    const amountChoice = catChoice.amounts[Math.floor(Math.random() * catChoice.amounts.length)];
    const finalAmount = catChoice.isIncome ? Math.abs(amountChoice) : -Math.abs(amountChoice);

    const docRef = transactionsRef.doc();
    const tx: Transaction = {
      userId,
      accountId: checkingRef.id,
      amount: finalAmount,
      date: txDate,
      name: catChoice.name,
      category: [catChoice.name],
      pending: false,
      isRoundUp: false,
      createdAt: new Date()
    };
    
    batch.set(docRef, tx);
  }

  // 3. Mark User as Plaid Linked
  const userRef = db.collection('users').doc(userId);
  batch.set(userRef, { plaidLinked: true }, { merge: true });

  await batch.commit();
  return { success: true, message: 'Seeded 18 months of historical data.' };
};
