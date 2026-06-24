import crypto from 'crypto';

export const generateRandomString = (length = 12) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

// Kết quả trả về api key có dạng: web-${customerId}$-${email}-${randomString}$
// Ví dụ:  web-$12312321312$-$example@gmail.com$-$abcdef$
export const buildApiKey = (customerId, email, randomString) => {
    return `web-$${customerId}$-$${email}$-$${randomString}$`;
};
