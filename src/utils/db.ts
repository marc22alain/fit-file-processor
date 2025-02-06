import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const DB_FILENAME = path.join(__dirname, '../../database/database.sqlite');

export async function saveFitData(keyData: any): Promise<void> {
    const db = await open({
        filename: DB_FILENAME,
        driver: sqlite3.Database
    });

    try {
        await db.run(
            'INSERT INTO fit_data (start_time, end_time, activity_type, total_distance, avg_heart_rate, max_heart_rate, avg_power, max_power, event, event_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [keyData.startTime, keyData.endTime, keyData.activityType, keyData.totalDistance, keyData.avgHeartRate, keyData.maxHeartRate, keyData.avgPower, keyData.maxPower, keyData.event, keyData.eventType]
        );
    } catch (error) {
        if ((error as any).code === 'SQLITE_CONSTRAINT' && (error as any).message.includes('UNIQUE constraint failed: fit_data.start_time')) {
            console.error(`A record with the start_time ${keyData.startTime} already exists.`);
        } else {
            throw error;
        }
    } finally {
        await db.close();
    }
}

export async function executeQuery(query: string): Promise<any[]> {
    const db = await open({
        filename: DB_FILENAME,
        driver: sqlite3.Database
    });

    if (/^\s*(INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\s+/i.test(query)) {
        throw new Error('Modification queries are not allowed');
    }

    const data = await db.all(query);

    await db.close();
    return data;
}
