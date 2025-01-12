import express from 'express';
import multer from 'multer';
import path from 'path';
import FitController from './controllers/fitController';

const app = express();
const upload = multer();

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

const fitController = new FitController();

app.post('/upload', upload.array('fitFile'), fitController.importFitFile.bind(fitController));
app.post('/collection-query', fitController.collectionQuery.bind(fitController));

const PORT = 4700;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
