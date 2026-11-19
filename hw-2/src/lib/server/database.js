const db = new Map();

export function getItems(userid) {
	if (!db.get(userid)) {
		db.set(userid, []);
	}

	return db.get(userid);
}

export function createItem(userid, description) {
	if (description === '') {
		throw new Error('item must have a description');
	}

	const items = db.get(userid);

	if (items.find((item) => item.description === description)) {
		throw new Error('items must be unique');
	}

	items.push({
		id: crypto.randomUUID(),
		description,
		purchased: false
	});
}

export function buyItem(userid, itemid) {
	const items = db.get(userid);
	const item = items.find((item) => item.id === itemid);

	if (item) {
		item.purchased = !item.purchased;
	}
}
