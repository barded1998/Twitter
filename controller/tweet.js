import * as tweetRepository from '../data/tweet.js';
import {} from 'express-async-errors';
export async function getTweets(req, res, next) {
	const username = req.query.username;
	const data = await (username
		? tweetRepository.getAllByUsername(username)
		: tweetRepository.getAll());
	res.status(200).json(data);
}

export async function getTweet(req, res, next) {
	const id = req.params.id;
	const tweet = await tweetRepository.getById(id);
	if (tweet) {
		res.status(200).json(tweet);
	} else {
		res.status(404).json({ message: `Tweet id(${id}) not found` });
	}
}

export async function createTweet(req, res, next) {
	const { text } = req.body;
	const userId = req.userId;
	const data = await tweetRepository.create(text, userId);
	res.status(201).json(data);
}

export async function updateTweet(req, res, next) {
	const id = req.params.id;
	const { text } = req.body;
	const tweet = await tweetRepository.getById(id);
	if (!tweet) {
		return res.status(404).json({ message: `Tweet id(${id}) not found` });
	}
	if (tweet.userId !== req.userId) {
		return res.sendStatus(403);
		s;
	}
	const updated = await tweetRepository.update(id, text);
	res.status(200).json(updated);
}

export async function deleteTweet(req, res, next) {
	const id = req.params.id;
	const tweet = await tweetRepository.getById(id);
	if (!tweet) {
		return res.status(404).json({ message: `Tweet id(${id}) not found` });
	}
	if (tweet.userId !== req.userId) {
		return res.sendStatus(403);
	}
	await tweetRepository.remove(id);
	res.sendStatus(204);
}
