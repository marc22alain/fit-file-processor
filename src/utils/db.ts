import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { FitDataRecord } from '../types/database';

const DB_FILENAME = path.join(__dirname, '../../database/database.sqlite');

export async function saveFitData(keyData: FitDataRecord): Promise<void> {
    const db = await open({
        filename: DB_FILENAME,
        driver: sqlite3.Database
    });

    const fields = Object.keys(keyData);
    const placeholders = fields.map(() => '?').join(', ');
    const values = fields.map(field => {
        const value = keyData[field as keyof FitDataRecord];
        // Convert Date to ISO string for SQLite storage
        return value instanceof Date ? value.toISOString() : value;
    });
    
    const query = `INSERT INTO fit_data (${fields.join(', ')}) VALUES (${placeholders})`;

    try {
        await db.run(query, values);
    } catch (error) {
        if ((error as any).code === 'SQLITE_CONSTRAINT' && (error as any).message.includes('UNIQUE constraint failed: fit_data.start_time')) {
            throw new Error(`A record with the start_time ${keyData.start_time.toISOString()} already exists.`);
        } else {
            throw error;
        }
    } finally {
        await db.close();
    }
}

export async function executeQuery(query: string): Promise<FitDataRecord[]> {
    const db = await open({
        filename: DB_FILENAME,
        driver: sqlite3.Database
    });

    if (/^\s*(INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\s+/i.test(query)) {
        throw new Error('Modification queries are not allowed');
    }

    const data = await db.all(query);
    
    // Convert ISO string dates back to Date objects
    return data.map(row => {
        if (row.start_time) {
            row.start_time = new Date(row.start_time);
        }
        return row;
    });
}
