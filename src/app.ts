import express from 'express';
import { LoanApplication } from '../database/LoanApplication';
import { mockLoans } from '../database/loansData';
import http from "http";
import { calculateMonthlyPayment, validateLoanApplication } from './utils';
const app = express();
app.use(express.json());

app.get('/loans', (req, res) => {
  try {
    res.status(200).json(mockLoans);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/loans/:id', (req, res) => {
  try {
    const loan = mockLoans.find(l => l.id === parseInt(req.params.id));
    if (!loan) {
      return res.status(404).send('Loan not found');
    }
    res.status(200).json(loan);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/loans', (req, res) => {
  try {
    const validation = validateLoanApplication(req.body);

    if (!validation.valid) {
      return res.status(400).send(validation.message);
    }

    const { name, amount, type, income, interestRate } = req.body;
    const termYears = type === 'car' ? 5 : 3;
    const monthlyPayment = calculateMonthlyPayment(amount, interestRate, termYears);

    const maxId = Math.max(...mockLoans.map(loan => Number(loan.id)), 0);
    const newLoan: LoanApplication = {
      id: (maxId + 1),
      name,
      amount,
      type,
      income,
      interestRate,
      monthlyPayment
    };

    mockLoans.push(newLoan);
    res.status(201).json(newLoan);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.put('/loans/:id', (req, res) => {
  try {
    const index = mockLoans.findIndex(l => l.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).send('Loan not found');
    }

    const validation = validateLoanApplication(req.body);

    if (!validation.valid) {
      return res.status(400).send(validation.message);
    }

    const { name, amount, type, income, interestRate } = req.body;
    const termYears = type === 'car' ? 5 : 3;
    const monthlyPayment = calculateMonthlyPayment(amount, interestRate, termYears);

    mockLoans[index] = { ...mockLoans[index], name, amount, type, income, interestRate, monthlyPayment };
    res.status(200).json(mockLoans[index]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/loans/:id', (req, res) => {
  try {
    const index = mockLoans.findIndex(l => l.id === Number(req.params.id));
    if (index === -1) {
      return res.status(404).send('Loan not found');
    }
  
    mockLoans.splice(index, 1);
    res.status(204).send();
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const server = http.createServer({}, app).listen(3000);
server.keepAliveTimeout = (60 * 1000) + 1000; //61sec
server.headersTimeout = (60 * 1000) + 2000; //62sec

export default app;