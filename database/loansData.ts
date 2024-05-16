import { LoanApplication } from "./LoanApplication";

export const mockLoans:LoanApplication[] = [
    {
    id:1,
    name:'Jinyoung',
    amount: 5000000,
    type: 'personal',
    income: 60000000,
    interestRate: 3.5,
    monthlyPayment: 143201.83
  },
  {
    id: 2,
    "name": 'jy',
    "amount": 1000000,
    "type": 'car',
    "income": 130000000,
    "interestRate": 4,
    "monthlyPayment": 18416.522055265967
  },
  {
    "id": 3,
    "name": 'Kat',
    "amount": 600000,
    "type": 'personal',
    "income": 6000000,
    "interestRate": 6.5,
    "monthlyPayment": 18389.401725905995
  }
];