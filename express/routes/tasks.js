const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');

async function getAll(req, res) {
	try {
		const tasks = await models.task.findAll();
		res.status(200).json(tasks);
	} catch (ex) {
		console.log('WTF: ', ex);
		res.status(500).send('Bad request. No Donut.');
	}
}

async function getById(req, res) {
	try {
		const id = getIdParam(req);
		const task = await models.task.findByPk(id);
		if (task) {
			res.status(200).json(task);
		} else {
			res.status(404).send('404 - Not found');
		}
	} catch (ex) {
		console.log('WTF: ', ex);
		res.status(500).send('Bad request. No Donut.');
	}
}

async function create(req, res) {
	try {
		if (req.body.id) {
			res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`);
		} else {
			await models.task.create(req.body);
			res.status(201).end();
		}
	} catch (ex) {
		console.log('WTF: ', ex);
		res.status(500).send('Bad request. No Donut.');
	}

}

async function update(req, res) {
	try {
		const id = getIdParam(req);

		// We only accept an UPDATE request if the `:id` param matches the body `id`
		if (req.body.id === id) {
			await models.task.update(req.body, {
				where: {
					id: id
				}
			});
			res.status(200).end();
		} else {
			res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
		}
	} catch (ex) {
		console.log('WTF: ', ex);
		res.status(500).send('Bad request. No Donut.');
	}
}

async function remove(req, res) {
	try {
		const id = getIdParam(req);
		await models.task.destroy({
			where: {
				id: id
			}
		});
		res.status(200).end();
	} catch (ex) {
		console.log('WTF: ', ex);
		res.status(500).send('Bad request. No Donut.');
	}
}

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
