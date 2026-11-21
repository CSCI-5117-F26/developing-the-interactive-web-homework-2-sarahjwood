import { redirect, fail } from '@sveltejs/kit';
import * as database from '#lib/server/database.ts';

export async function load({ locals }) {
	if (!locals.user) {
		redirect(303, '/');
	}

	return {
		items: await database.getItems(locals.user.id)
	};
}

export const actions = {
	create: async ({ request, locals }) => {
		if (!locals.user) {
			redirect(303, '/');
		}

		const data = await request.formData();
		const description = data.get('description');
		const category = data.get('category') || 'General';

		try {
			await database.createItem(locals.user.id, description, category);
		} catch (error) {
			return fail(422, {
				description,
				error: error.message
			});
		}
	},

	toggle: async ({ request, locals }) => {
		if (!locals.user) {
			redirect(303, '/');
		}

		const data = await request.formData();
		const id = data.get('id');

		await database.buyItem(locals.user.id, id);
	}
};