import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import { anonymizeData, encryptData, assessRisk } from './dataProcessing';

// There were issues with my AWS account so i was
// not able to implement them


const app = express();
app.use(bodyParser.json());

// Handle GET requests to the root URL
app.get('/', (_, res) => {
    console.log('GET / was called');
    res.send('Server is running. Use the /process-data endpoint to post data.');
});

// Handle GET requests to /process-data
app.get('/process-data', (_, res) => {
    res.json({
        message: 'This endpoint expects a POST request with transaction data.'
    });
});


// Handle POST requests to /process-data
app.post('/process-data', (req, res) => {
    const { transactionId, userId, transactionDetails, userDetails, additionalInfo } = req.body;

    // Simple validation check
    if (!transactionId || !userId || !transactionDetails || !userDetails) {
        return res.status(400).send('Missing required transaction fields.');
    }

    // Processing steps
    const anonymizedData = anonymizeData(userDetails);
    const encryptedData = encryptData(anonymizedData);
    const riskAssessment = assessRisk(transactionDetails);

    // Attempt to save processed data to a file
    fs.writeFile('output.json', JSON.stringify({ encryptedData, riskAssessment }, null, 2), err => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Failed to save data');
        }
        res.send('Data processed and saved successfully');
    });

});

const server = app.listen(3000, () => console.log('Server running on http://localhost:3000'));

export default server;


// test done on postman for endpoints
// Output of POST Request at http://localhost:3000/process-data
// for 
// {
//     "transactionId": "TXN123456789",
//     "userId": "USER98765",
//     "transactionDetails": {
//         "amount": 250.00,
//         "currency": "USD",
//         "transactionDate": "2024-04-18T12:34:56Z",
//         "paymentMethod": "CreditCard",
//         "merchantDetails": {
//             "merchantId": "MERCHANT12345",
//             "name": "Example Merchant",
//             "category": "Electronics",
//             "countryCode": "US"
//         }
//     },
//     "userDetails": {
//         "firstName": "John",
//         "lastName": "Doe",
//         "email": "john.doe@example.com",
//         "phone": "+11234567890",
//         "billingAddress": {
//             "street": "123 Elm St",
//             "city": "Anytown",
//             "state": "CA",
//             "postalCode": "90210",
//             "country": "USA"
//         }
//     },
//     "additionalInfo": {
//         "deviceIp": "192.168.1.1",
//         "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
//     }
//   }
  

// was   :   Data processed and saved successfully
