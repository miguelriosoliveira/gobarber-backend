import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import storageConfig from '@config/storage';

import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(storageConfig.uploadsFolder));
app.use(routes);
app.use(errors());

app.use((err: Error, _request: Request, response: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({ status: 'error', message: err.message });
	}

	// eslint-disable-next-line no-console
	console.error(err);

	return response.status(500).json({ status: 'error', messege: 'Internal Server Error' });
});

const port = 3333;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`🚀 Server started on port ${port}! 🚀`));
