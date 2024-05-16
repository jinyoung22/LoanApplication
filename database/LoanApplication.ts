export interface LoanApplication {
    id: number;
    name: string;
    amount: number;
    type: 'car' | 'personal';
    income: number;
    interestRate: number;
    monthlyPayment?: number;
  }