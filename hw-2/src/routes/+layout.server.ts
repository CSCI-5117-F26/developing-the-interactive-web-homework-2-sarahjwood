import * as database from '#lib/server/database.ts';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return {
			user: null,
			items: []
		};
	}

	return {
		user: locals.user,
		items: await database.getItems(locals.user.id)
	};
};