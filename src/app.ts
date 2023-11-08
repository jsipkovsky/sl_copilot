import express from 'express';
import cors from 'cors';
import copilotApi from './routes/copilotApi';

const app = express();

app.use(cors());
app.use('/api', copilotApi);

export default app;
