import { sequelize } from '../database/db.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

const Tweet = sequelize.define('tweet', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		unique: true,
	},
	text: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

const ORDER_DESC = {
	order: [['createdAt', 'DESC']],
};

export async function getAll() {
	return Tweet.findAll({ ...ORDER_DESC });
}

export async function getAllByUsername(userId) {
	return Tweet.findAll({
		where: { userId },
		...ORDER_DESC,
	});
}

export async function getAllById(id) {
	return Tweet.findByPk(id);
}

export async function create(text, userId) {
	return Tweet.create({ text, userId }).then((data) => {
		console.log(data);
		return data;
	});
}

export async function update(id, text) {
	return Tweet.findByPk(id) //
		.then((tweet) => {
			tweet.text = text;
			return tweet.save();
		});
}

export async function remove(id) {
	return Tweet.findByPk(id) //
		.then((tweet) => {
			tweet.destroy();
		});
}
