import { FitParser } from 'fit-file-parser';

export function parseFitFile(buffer: Buffer): Promise<any> {
    const fitParser = new FitParser({
        force: true,
        speedUnit: 'km/h',
        lengthUnit: 'km',
        temperatureUnit: 'celsius',
        elapsedRecordField: true,
        mode: 'cascade',
    });

    return new Promise((resolve, reject) => {
        fitParser.parse(buffer, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}