import { db } from '#lib/mongo.ts';

const todos = db.collection('todos');

export async function getItems(userid, category = null) {
	const query = { userid };
	if (category) {
		query.category = category;
	}

	return await todos
		.find(query, { projection: { _id: 0 } })
		.sort({ createdAt: -1 })
		.toArray();
}

export async function createItem(userid, description, category = 'All') {
	const trimmed = description?.trim();
	if (!trimmed) {
		throw new Error('item must have a description');
	}

	const existing = await todos.findOne({ userid, description: trimmed });
	if (existing) {
		throw new Error('items must be unique');
	}

	const newItem = {
		id: crypto.randomUUID(),
		userid,
		description: trimmed,
		category: category?.trim() || 'General',
		purchased: false,
		createdAt: new Date()
	};

	await todos.insertOne(newItem);
	return newItem;
}

export async function buyItem(userid, itemid) {
	const item = await todos.findOne({ userid, id: itemid });
	if (!item) return;

	await todos.updateOne(
		{ userid, id: itemid },
		{ $set: { purchased: !item.purchased } }
	);
}

export async function deleteItem(userid, itemid) {
	await todos.deleteOne({ userid, id: itemid });
}