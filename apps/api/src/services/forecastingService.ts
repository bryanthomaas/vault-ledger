import { db } from '../config/firebase';
import { ForecastPoint, Transaction } from '@vault-ledger/shared-types';

export const generateForecast = async (userId: string): Promise<ForecastPoint[]> => {
  const accountsSnapshot = await db.collection('accounts').where('userId', '==', userId).get();
  let currentNetWorth = 0;
  
  accountsSnapshot.docs.forEach(doc => {
    currentNetWorth += doc.data().balance;
  });

  const txSnapshot = await db.collection('transactions')
    .where('userId', '==', userId)
    .orderBy('date', 'desc')
    .limit(300) // Look at the last 300 transactions
    .get();

  let monthlyNetDelta = 0;
  
  // Velocity Algorithm: Calculate net change over recent history to find monthly velocity
  const transactions = txSnapshot.docs.map(d => d.data() as Transaction);
  if (transactions.length > 0) {
    const totalDelta = transactions.reduce((acc, tx) => acc + tx.amount, 0);
    // Assuming these transactions cover roughly 6 months for the velocity calculation
    monthlyNetDelta = totalDelta / 6; 
  } else {
    // Default positive growth if no history is present yet
    monthlyNetDelta = 500; 
  }

  const forecast: ForecastPoint[] = [];
  let projectedWorth = currentNetWorth;
  const now = new Date();

  // Generate next 6 months
  for (let i = 1; i <= 6; i++) {
    projectedWorth += monthlyNetDelta;
    const projectedDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
    
    forecast.push({
      date: projectedDate.toISOString(),
      predictedNetWorth: parseFloat(projectedWorth.toFixed(2))
    });
  }

  return forecast;
};
