"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.anonymizeData = anonymizeData;
exports.encryptData = encryptData;
exports.assessRisk = assessRisk;

const crypto_1 = __importDefault(require("crypto"));
const key = crypto_1.default.randomBytes(32); // 256 bits for AES-256
const iv = crypto_1.default.randomBytes(16);
// Anonymization function
function anonymizeData(userDetails) {
    return Object.assign(Object.assign({}, userDetails), { firstName: crypto_1.default.createHash('sha256').update(userDetails.firstName).digest('hex'), lastName: crypto_1.default.createHash('sha256').update(userDetails.lastName).digest('hex') });
}
// Encryption function
function encryptData(data) {
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
// Risk assessment function
function assessRisk(transactionDetails) {
    return Math.random(); 
}
