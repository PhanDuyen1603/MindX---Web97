import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { customers, products, orders } from './data.js';
const dir = dirname(fileURLToPath(import.meta.url));
const db = { customers, products, orders };

writeFileSync(join(dir, 'db.json'), JSON.stringify(db, null, 2));
console.log('Seed data generated successfully');