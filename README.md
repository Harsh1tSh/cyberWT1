# Financial Record Processing Application

## Overview

This application anonymizes sensitive financial data, performs risk assessment calculations based on dynamic criteria, and securely stores the results.

## Technical Requirements

- Node.js
- TypeScript
- Express
- Jest
- Supertest

## Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/cyberwaves-internship.git
    cd cyberwaves-internship
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the server:**
    ```bash
    npm start
    ```

4. **Run tests:**
    ```bash
    npm test
    ```

## API Endpoints

- **GET /:** Check server status.
- **POST /process-data:** Process financial data.

### Request Body:
```json
{
    "transactionId": "TXN123456789",
    "userId": "USER98765",
    "transactionDetails": {
        "amount": 250.00,
        "currency": "USD",
        "transactionDate": "2024-04-18T12:34:56Z",
        "paymentMethod": "CreditCard",
        "merchantDetails": {
            "merchantId": "MERCHANT12345",
            "name": "Example Merchant",
            "category": "Electronics",
            "countryCode": "US"
        }
    },
    "userDetails": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "+11234567890",
        "billingAddress": {
            "street": "123 Elm St",
            "city": "Anytown",
            "state": "CA",
            "postalCode": "90210",
            "country": "USA"
        }
    },
    "additionalInfo": {
        "deviceIp": "192.168.1.1",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }
}
```
## Response
```
{
    "success": true,
    "data": "<encrypted_data>",
    "risk": "<risk_assessment>"
}
```



