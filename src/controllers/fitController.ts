import { Request, Response } from 'express';
import { extractKeyData } from '../services/fitService';
import { saveFitData } from '../utils/db';

class FitController {
    public async uploadFitFile(req: Request, res: Response): Promise<void> {
        try {
            const files = req.files as Express.Multer.File[];
            for (const file of files) {
                const keyData = await extractKeyData(file.buffer);
                await saveFitData(keyData);
            }
            res.status(200).send('Files uploaded and data saved successfully');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    public async collectionQuery(req: Request, res: Response): Promise<void> {
        try {
            const query = req.body.query;
            const data = await executeQuery(query);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default FitController;