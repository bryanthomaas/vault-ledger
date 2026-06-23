import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import plaidRoutes from './routes/plaidRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/plaid', plaidRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Vault Ledger API' });
});

app.listen(PORT, () => {
  console.log(`Vault Ledger API running on http://localhost:${PORT}`);
});