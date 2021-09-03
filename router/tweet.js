import express from 'express';
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import { validation } from '../middleware/validate.js';
const tweetRouter = express.Router();

const validateTweet = [
	body('text') //
		.trim()
		.isLength({ min: 3 })
		.withMessage('text should be at least 3 characters'),
	validation,
];

// GET /tweets
// GET /tweets?username=:username
tweetRouter.get('/', tweetController.getTweets);

// GET /tweets/:id
tweetRouter.get('/:id', tweetController.getTweet);

//POST /tweets
tweetRouter.post('/', validateTweet, tweetController.createTweet);

//PUT /tweets/:id
tweetRouter.put('/:id', validateTweet, tweetController.updateTweet);

//DELETE /tweets/:id
tweetRouter.delete('/:id', tweetController.deleteTweet);

export default tweetRouter;
