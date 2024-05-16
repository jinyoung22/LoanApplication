import { LoanApplication } from "../database/LoanApplication";

export const calculateMonthlyPayment = (loanAmount: number, interestRate: number, loanTerm: number): number => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  
    return monthlyPayment;
  };

export const validateLoanApplication = (data: LoanApplication): { valid: boolean; message?: string } => {
    const { name, amount, type, income, interestRate } = data;
  
    if (!name || !amount || !type || !income || !interestRate) {
      return { valid: false, message: 'Bad Request: Missing required fields' };
    }
  
    if (typeof name !== 'string' || typeof amount !== 'number' || !['car', 'personal'].includes(type) ||
        typeof income !== 'number' || typeof interestRate !== 'number') {
      return { valid: false, message: 'Bad Request: Invalid data types' };
    }
  
    if (amount < 1000 || amount > 50000000) {
      return { valid: false, message: 'Bad Request: Loan amount out of limits' };
    }
  
    if (interestRate < 0 || interestRate > 30) {
      return { valid: false, message: 'Bad Request: Interest rate out of limits' };
    }
  
    return { valid: true };
  }
  