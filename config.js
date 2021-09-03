import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue = undefined) {
	const value = process.env[key] || defaultValue;
	if (value == null) {
		throw new Error('Key is undefined');
	}
	return value;
}

export const config = {
	host: {
		port: required('HOST_PORT', 8080),
	},
	jwt: {
		secretKey: required('JWT_SECRET'),
		expiresIn: required('JWT_EXPIRES_SEC', 86400),
	},
	bcrypt: {
		saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
	},
	db: {
		host: required('DB_HOST'),
		user: required('DB_USER'),
		password: required('DB_PASSWORD'),
		database: required('DB_DATABASE'),
	},
};
