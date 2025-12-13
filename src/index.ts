import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

import { registerRoutes } from './web-api/routes';

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

registerRoutes(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
