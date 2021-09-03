import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res, next) {
	const username = req.query.username;
	const data = await (username
		? tweetRepository.getAllByUsername(username)
		: tweetRepository.getAll());
	res.status(200).json(data);
}

export async function getTweet(req, res, next) {
	const id = req.params.id;
	const tweet = await tweetRepository.getAllById(id);
	if (tweet) {
		res.status(200).json(data);
	} else {
		res.status(404).json({ message: `Tweet id(${id}) not found` });
	}
}

export async function createTweet(req, res, next) {
	const { text, userId } = req.body;
	const data = await tweetRepository.create(text, userId);
	res.status(201).json(data);
}

export async function updateTweet(req, res, next) {
	const id = req.params.id;
	const { text } = req.body;
	const tweet = await tweetRepository.getAllById(id);
	if (!tweet) {
		return res.status(404).json({ message: `Tweet id(${id}) not found` });
	}
	const updated = await tweetRepository.update(id, text);
	res.status(200).json(updated);
}

export async function deleteTweet(req, res, next) {
	const id = req.params.id;
	const tweet = await tweetRepository.getAllById(id);
	if (!tweet) {
		return res.status(404).json({ message: `Tweet id(${id}) not found` });
	}
	await tweetRepository.remove(id);
	res.sendStatus(204);
}
