import { parseFitFile } from '../utils/fitParser';

export async function extractKeyData(buffer: Buffer): Promise<any> {
    const fitData = await parseFitFile(buffer);
    const activity = fitData.activity || {};

    // Check if sessions array exists and has at least one session
    if (!activity.sessions || activity.sessions.length === 0) {
        console.error('No sessions found in FIT data. Full data structure:', 
            JSON.stringify(fitData, null, 2));
        throw new Error('No session data found in FIT file');
    }

    const session = activity.sessions[0];

    const keyData = {
        startTime: session.start_time,
        totalElapsedTime: session.total_elapsed_time,
        activityType: session.sport,
        totalDistance: session.total_distance,
        avgHeartRate: session.avg_heart_rate,
        maxHeartRate: session.max_heart_rate,
        avgPower: session.avg_power,
        maxPower: session.max_power,
        event: activity.event,
        eventType: activity.event_type,
    };
    return keyData;
}
