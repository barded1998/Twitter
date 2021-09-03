import { sequelize } from '../database/db.js';
import SQ from 'sequelize';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING(128),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		url: {
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: false,
	}
);

export async function findByUsername(username) {
	return User.findOne({ where: { username } });
}
export async function findById(id) {
	return User.findByPk(id);
}
export async function create(user) {
	return User.create(user).then((data) => {
		console.log(data);
		return data.dataValues.id;
	});
}
