import { Request, Response } from 'express';
import { extractKeyData } from '../services/fitService';
import { saveFitData, executeQuery } from '../utils/db';

interface FileProcessResult {
    filename: string;
    success: boolean;
    error?: string;
}

class FitController {
    public async importFitFile(req: Request, res: Response): Promise<void> {
        try {
            const files = req.files as Express.Multer.File[];
            if (!files || files.length === 0) {
                res.status(400).send('No files were uploaded');
                return;
            }

            const results: FileProcessResult[] = [];
            
            for (const file of files) {
                try {
                    const keyData = await extractKeyData(file.buffer);
                    await saveFitData(keyData);
                    results.push({
                        filename: file.originalname,
                        success: true
                    });
                } catch (error) {
                    console.error(`Error processing file ${file.originalname}:`, error);
                    results.push({
                        filename: file.originalname,
                        success: false,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    });
                }
            }

            const successCount = results.filter(r => r.success).length;
            const failureCount = results.filter(r => !r.success).length;
            
            res.status(200).json({
                message: `Processed ${files.length} files: ${successCount} succeeded, ${failureCount} failed`,
                results,
                failedFiles: results.filter(r => !r.success).map(r => ({
                    filename: r.filename,
                    reason: r.error
                }))
            });

        } catch (error) {
            console.error('Server error during file processing:', error);
            res.status(500).json({
                message: 'Server error during file processing',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    public async collectionQuery(req: Request, res: Response): Promise<void> {
        try {
            const query = req.body.query;
            const data = await executeQuery(query);
            res.status(200).json(data);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send(error.message);
            } else {
                res.status(500).send('An unknown error occurred');
            }
        }
    }
}

export default FitController;
