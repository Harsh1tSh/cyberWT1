"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server")); // Ensure you are exporting your Express app from server.ts
afterAll(() => {
    server_1.default.close();
});
describe('Server', () => {
    it('should respond with a message on GET /', async () => {
        const response = await (0, supertest_1.default)(server_1.default).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Server is running. Use the /process-data endpoint to post data.');
    });
    it('should respond with a message on GET /process-data', async () => {
        const response = await (0, supertest_1.default)(server_1.default).get('/process-data');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('This endpoint expects a POST request with transaction data.');
    });
    it('should process data on POST /process-data', async () => {
        const data = {
            transactionId: "TXN123456789",
            userId: "USER98765",
            transactionDetails: {
                amount: 250.00,
                currency: "USD",
                transactionDate: "2024-04-18T12:34:56Z",
                paymentMethod: "CreditCard",
                merchantDetails: {
                    merchantId: "MERCHANT12345",
                    name: "Example Merchant",
                    category: "Electronics",
                    countryCode: "US"
                }
            },
            userDetails: {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                phone: "+11234567890",
                billingAddress: {
                    street: "123 Elm St",
                    city: "Anytown",
                    state: "CA",
                    postalCode: "90210",
                    country: "USA"
                }
            },
            additionalInfo: {
                deviceIp: "192.168.1.1",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
        };
        const response = await (0, supertest_1.default)(server_1.default).post('/process-data').send(data);
        expect(response.status).toBe(200);
        expect(response.text).toBe('Data processed and saved successfully');
    });
});
