"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const dataProcessing_1 = require("./dataProcessing");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
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
    const anonymizedData = (0, dataProcessing_1.anonymizeData)(userDetails);
    const encryptedData = (0, dataProcessing_1.encryptData)(anonymizedData);
    const riskAssessment = (0, dataProcessing_1.assessRisk)(transactionDetails);
    // Attempt to save processed data to a file
    fs_1.default.writeFile('output.json', JSON.stringify({ encryptedData, riskAssessment }, null, 2), err => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Failed to save data');
        }
        res.send('Data processed and saved successfully');
    });
});
const server = app.listen(3000, () => console.log('Server running on http://localhost:3000'));
exports.default = server;
