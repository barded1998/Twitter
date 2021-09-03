import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import tweetRouter from './router/tweet.js';
import { config } from './config.js';
import { sequelize } from './database/db.js';
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(helmet());

app.use('/tweets', tweetRouter);

sequelize.sync().then(() => {
	app.listen(config.host.port);
});
