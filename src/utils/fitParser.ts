import FitParser, { FitParserResult } from 'fit-file-parser';

export function parseFitFile(buffer: Buffer): Promise<FitParserResult> {
    const fitParser = new FitParser({
        force: true,
        speedUnit: 'km/h',
        lengthUnit: 'km',
        temperatureUnit: 'celsius',
        elapsedRecordField: true,
        mode: 'cascade',
    });

    return new Promise((resolve, reject) => {
        fitParser.parse(buffer, (error: Error | null, data: FitParserResult) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
