import * as database from '#lib/server/database.js';

export function load({ cookies }) {
	let userid = cookies.get('userid');

	if (!userid) {
		userid = crypto.randomUUID();
		cookies.set('userid', userid, { path: '/' });
	}

	return {
		items: database.getItems(userid)
	};
}
export const actions = {
	create: async ({ request, cookies }) => {
		const data = await request.formData();
		const description = data.get('description');
		const userid = cookies.get('userid');

		database.createItem(userid, description);
	},
	
	toggle: async ({ request, cookies }) => {
		const data = await request.formData();
		const id = data.get('id');
		const userid = cookies.get('userid');

		database.buyItem(userid, id);
	}

};