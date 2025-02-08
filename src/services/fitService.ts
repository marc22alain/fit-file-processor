import { parseFitFile } from '../utils/fitParser';
import { FitDataRecord } from '../types/database';

export async function extractKeyData(buffer: Buffer): Promise<FitDataRecord> {
    const fitData = await parseFitFile(buffer);
    const activity = fitData.activity || {};

    // Check if sessions array exists and has at least one session
    if (!activity.sessions || activity.sessions.length === 0) {
        console.error('No sessions found in FIT data. Full data structure:', 
            JSON.stringify(fitData, null, 2));
        throw new Error('No session data found in FIT file');
    }

    const session = activity.sessions[0];

    return {
        start_time: session.start_time,
        total_elapsed_time: session.total_elapsed_time,
        activity_type: session.sport,
        total_distance: session.total_distance,
        avg_heart_rate: session.avg_heart_rate,
        max_heart_rate: session.max_heart_rate,
        avg_power: session.avg_power,
        max_power: session.max_power,
        event: activity.event,
        event_type: activity.event_type,
    };
}
