declare module 'fit-file-parser' {
    interface FitParserOptions {
        force?: boolean;
        speedUnit?: 'm/s' | 'km/h' | 'mph';
        lengthUnit?: 'm' | 'km' | 'mi';
        temperatureUnit?: 'celsius' | 'fahrenheit';
        elapsedRecordField?: boolean;
        mode?: 'cascade' | 'list';
    }

    interface FitParserResult {
        // Define the structure of the parsed result here
        [key: string]: any;
    }

    class FitParser {
        constructor(options?: FitParserOptions);
        parse(buffer: Buffer, callback: (error: Error | null, data: FitParserResult) => void): void;
    }

    export = FitParser;
}
