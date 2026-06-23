import { Request, Response } from 'express';
import { seedPlaidData } from '../services/seedingService';

export const linkPlaid = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Simulate OAuth Delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Execute data seeding engine
    const result = await seedPlaidData(userId);
    
    res.json(result);
  } catch (error) {
    console.error('Plaid Link Error:', error);
    res.status(500).json({ error: 'Internal Server Error during Plaid linkage.' });
  }
};
