export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  roundUpsEnabled: boolean;
  plaidLinked: boolean;
  createdAt: any; // Firebase Timestamp
}

export interface Account {
  id?: string;
  userId: string;
  type: 'depository' | 'credit' | 'vault';
  name: string;
  balance: number;
  currency: string;
  lastUpdated: any; // Firebase Timestamp
}

export interface Transaction {
  id?: string;
  userId: string;
  accountId: string;
  amount: number;
  date: any; // Firebase Timestamp
  name: string;
  category: string[];
  pending: boolean;
  isRoundUp: boolean;
  createdAt: any; // Firebase Timestamp
}

// Predict forecast point
export interface ForecastPoint {
  date: string; // ISO string
  predictedNetWorth: number;
}
