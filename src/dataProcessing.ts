import crypto from 'crypto';

const key = crypto.randomBytes(32);  // 256 bits for AES-256
const iv = crypto.randomBytes(16);



// Anonymization function
export function anonymizeData(userDetails: any): any {
    return {
        ...userDetails,
        firstName: crypto.createHash('sha256').update(userDetails.firstName).digest('hex'),
        lastName: crypto.createHash('sha256').update(userDetails.lastName).digest('hex')
    };
}


// Encryption function
export function encryptData(data: any): any {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}


// Risk assessment function
export function assessRisk(transactionDetails: any): number {
    return Math.random();
}
