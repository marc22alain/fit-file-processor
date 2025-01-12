import express from 'express';
import multer from 'multer';
import FitController from './controllers/fitController';

const app = express();
const upload = multer();

app.use(express.json());

const fitController = new FitController();

app.post('/upload', upload.array('fitFile'), fitController.uploadFitFile.bind(fitController));
app.post('/collection-query', fitController.collectionQuery.bind(fitController));

const PORT = 4700;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});