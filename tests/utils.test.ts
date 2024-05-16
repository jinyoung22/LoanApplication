import { calculateMonthlyPayment, validateLoanApplication } from '../src/utils';
import { LoanApplication } from '../database/LoanApplication';

describe('Loan Application Tests', () => {
  describe('calculateMonthlyPayment', () => {
    it('should calculate the monthly payment correctly', () => {
      const loanAmount = 10000; // Example loan amount
      const interestRate = 5; // Example interest rate
      const loanTerm = 2; // Example loan term in years

      const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
      const expectedPayment = 438.71; // Expected result calculated manually or from a reliable source

      expect(monthlyPayment).toBeCloseTo(expectedPayment, 2); // The second argument is the number of decimal places to check
    });
  });

  describe('validateLoanApplication', () => {
    it('should validate the loan application correctly', () => {
      const validLoanApplication: LoanApplication = {
        id: 5,
        name: 'John Doe',
        amount: 25000,
        type: 'personal',
        income: 50000,
        interestRate: 5
      };

      const validationResult = validateLoanApplication(validLoanApplication);

      expect(validationResult).toEqual({ valid: true });
    });

    it('should return an error message for invalid loan application', () => {
      const invalidLoanApplication: LoanApplication = {
        id:2,
        name: '', // Missing name
        amount: 25000,
        type: 'personal',
        income: 50000,
        interestRate: 5
      };

      const validationResult = validateLoanApplication(invalidLoanApplication);

      expect(validationResult).toEqual({
        valid: false,
        message: 'Bad Request: Missing required fields'
      });
    });
  });

  // Add more tests for other functions and edge cases
});


describe('validateLoanApplication', () => {
  it('should fail validation for invalid loan amount', () => {
    const loanApplication: LoanApplication = {
      id:1,
      name: 'Jane Doe',
      amount: 999, // 너무 낮은 금액
      type: 'personal',
      income: 30000,
      interestRate: 5
    };

    const validationResult = validateLoanApplication(loanApplication);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.message).toBe('Bad Request: Loan amount out of limits');
  });

  it('should fail validation for invalid interest rate', () => {
    const loanApplication: LoanApplication = {
      id: 3,
      name: 'John Doe',
      amount: 20000,
      type: 'personal',
      income: 50000,
      interestRate: 31 // 너무 높은 이자율
    };

    const validationResult = validateLoanApplication(loanApplication);
    expect(validationResult.valid).toBe(false);
    expect(validationResult.message).toBe('Bad Request: Interest rate out of limits');
  });

});
