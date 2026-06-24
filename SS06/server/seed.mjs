import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { customers, products, orders } from './data.js';
import Customer from './models/Customer.js';

dotenv.config();

const dir = dirname(fileURLToPath(import.meta.url));
const db = { customers, products, orders };

writeFileSync(join(dir, 'db.json'), JSON.stringify(db, null, 2));
console.log('Seed data generated successfully');

try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Customer.deleteMany({});
    await Customer.insertMany(customers);
    console.log(`Seeded ${customers.length} customers to MongoDB`);
} catch (error) {
    console.error('Failed to seed MongoDB', error);
    process.exit(1);
} finally {
    await mongoose.disconnect();
}
