"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataProcessing_1 = require("../dataProcessing");
describe('Data Processing Functions', () => {
    test('anonymizeData should hash the first and last names', () => {
        const userDetails = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+11234567890',
            billingAddress: {
                street: '123 Elm St',
                city: 'Anytown',
                state: 'CA',
                postalCode: '90210',
                country: 'USA',
            },
        };
        const anonymized = (0, dataProcessing_1.anonymizeData)(userDetails);
        expect(anonymized.firstName).not.toBe('John');
        expect(anonymized.lastName).not.toBe('Doe');
    });
    test('encryptData should return an encrypted string', () => {
        const data = { test: 'data' };
        const encrypted = (0, dataProcessing_1.encryptData)(data);
        expect(typeof encrypted).toBe('string');
        expect(encrypted).not.toBe(JSON.stringify(data));
    });
    test('assessRisk should return a number between 0 and 1', () => {
        const transactionDetails = { amount: 100 };
        const risk = (0, dataProcessing_1.assessRisk)(transactionDetails);
        expect(typeof risk).toBe('number');
        expect(risk).toBeGreaterThanOrEqual(0);
        expect(risk).toBeLessThanOrEqual(1);
    });
});
