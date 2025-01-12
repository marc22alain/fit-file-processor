import { parseFitFile } from '../utils/fitParser';

export async function extractKeyData(buffer: Buffer): Promise<any> {
    const fitData = await parseFitFile(buffer);
    const session = fitData.activity.sessions[0];
    const activity = fitData.activity;

    const keyData = {
        startTime: session.start_time,
        endTime: session.end_time,
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