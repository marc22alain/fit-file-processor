declare module 'fit-file-parser' {
    interface FitParserOptions {
        force?: boolean;
        speedUnit?: 'm/s' | 'km/h' | 'mph';
        lengthUnit?: 'm' | 'km' | 'mi';
        temperatureUnit?: 'celsius' | 'fahrenheit';
        elapsedRecordField?: boolean;
        mode?: 'cascade' | 'list';
    }

    export interface FitParserResult {
        sessions?: Array<{
            start_time?: Date;
            total_elapsed_time?: number;
            total_distance?: number;
            avg_heart_rate?: number;
            max_heart_rate?: number;
            avg_power?: number;
            max_power?: number;
            [key: string]: any;
        }>;
        activities?: Array<{
            event?: string;
            event_type?: string;
            [key: string]: any;
        }>;
        [key: string]: any;
    }

    export default class FitParser {
        constructor(options?: FitParserOptions);
        parse(buffer: Buffer, callback: (error: Error | null, data: FitParserResult) => void): void;
    }
}
