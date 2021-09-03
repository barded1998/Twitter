import * as userRepository from '../data/auth.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import { config } from '../config.js';

export async function signup(req, res, next) {
	const { name, username, password, email, url } = req.body;
	const found = await userRepository.findByUsername(username);
	if (found) {
		return res
			.status(409)
			.json({ message: `username ${username} already exsist` });
	}
	const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
	const id = await userRepository.create({
		name,
		username,
		password: hashed,
		email,
		url,
	});
	const token = createJwtToken(id);
	res.status(201).json({ token, username });
}

export async function login(req, res, next) {
	const { username, password } = req.body;
	const user = await userRepository.findByUsername(username);
	if (!user) {
		return res.status(401).json({ message: 'Invalid user or password' });
	}
	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		return res.status(401).json({ message: 'Invalid user or password' });
	}
	const token = createJwtToken(user.id);
	res.status(201).json({ token, username });
}

export async function me(req, res, next) {
	const user = await userRepository.findById(req.userId);
	if (!user) {
		return res.status(404).json({ message: 'user not found' });
	}
	res.status(201).json({ token: req.token, username: user.username });
}

function createJwtToken(id) {
	return jwt.sign({ id }, config.jwt.secretKey, {
		expiresIn: config.jwt.expiresIn,
	});
}
