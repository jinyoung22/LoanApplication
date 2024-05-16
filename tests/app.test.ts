import request from 'supertest';
import app from '../src/app';

describe('Loans API success test', () => {
  it('GET /loans', async () => {
    const res = await request(app).get('/loans');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('POST /loans', async () => {
    const loanData = {
      name: 'Phoebe',
      amount: 10000,
      type: 'personal',
      income: 50000,
      interestRate: 5
    };

    const res = await request(app).post('/loans').send(loanData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  describe('PUT /loans/:id', () => {
    it('should update the loan successfully', async () => {
      const updatedLoanData = {
        name: 'Jinyoung',
        amount: 20000,
        type: 'personal',
        income: 60000,
        interestRate: 4
      };

      const res = await request(app).put('/loans/1').send(updatedLoanData);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('name', 'Jinyoung');
      expect(res.body).toHaveProperty('amount', 20000);
      expect(res.body).toHaveProperty('type', 'personal');
      expect(res.body).toHaveProperty('income', 60000);
      expect(res.body).toHaveProperty('interestRate', 4);
    });
  });

  describe('DELETE /loans/:id', () => {
    it('should delete the loan successfully', async () => {
      const res = await request(app).delete('/loans/1');
      expect(res.statusCode).toEqual(204);
    });
  });

});

describe('Loans API Failure Tests', () => {
  describe('GET /loans/:id', () => {
    it('should return 404 if id is not found', async () => {
      const res = await request(app).get('/loans/9999');
      expect(res.statusCode).toEqual(404);
      expect(res.text).toContain('Loan not found');
    });
  });

  describe('POST /loans', () => {
    it('should return 400 for invalid data', async () => {
      const invalidLoanData = {
        name: 'Phoebe',
        amount: 99,
        type: 'personal',
        income: 50000,
        interestRate: 5
      };

      const res = await request(app).post('/loans').send(invalidLoanData);
      expect(res.statusCode).toEqual(400);
      expect(res.text).toContain('Bad Request: Loan amount out of limits');
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteLoanData = {
        amount: 10000,
        type: 'personal',
        income: 50000,
        interestRate: 5
      };

      const res = await request(app).post('/loans').send(incompleteLoanData);
      expect(res.statusCode).toEqual(400);
      expect(res.text).toContain('Bad Request: Missing required fields');
    });
  });

  describe('PUT /loans/:id failure', () => {
    it('should return 404 if id is not found', async () => {
      const updatedLoanData = {
        name: 'Phoebe',
        amount: 20000,
        type: 'personal',
        income: 60000,
        interestRate: 4
      };

      const res = await request(app).put('/loans/9999').send(updatedLoanData);
      expect(res.statusCode).toEqual(404);
      expect(res.text).toContain('Loan not found');
    });
  });

  describe('DELETE /loans/:id failure', () => {
    it('should return 404 if id is not found', async () => {
      const res = await request(app).delete('/loans/9999');
      expect(res.statusCode).toEqual(404);
      expect(res.text).toContain('Loan not found');
    });
  });
});


