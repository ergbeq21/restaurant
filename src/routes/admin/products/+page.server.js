import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export async function load({ locals, url }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/');
	}
	const connection = await createConnection();

	const category = url.searchParams.get('category') || '';
	const search = (url.searchParams.get('search') || '').trim();

	let query = `
    SELECT items.id, items.name, items.beschreibung, items.preis, items.bild_url, categories.name as category
    FROM items
    JOIN categories ON items.kategorie_id = categories.id
    `;

	let params = [];

	if (category) {
		query += ' WHERE categories.name = ?';
		params.push(category);
	}

	if (search) {
		query += category ? ' AND' : ' WHERE';
		query += ' LOWER(items.name) LIKE ? ';
		params.push(`%${search}%`);
	}

	const [productRows] = await connection.execute(query, params);

	const [categoryRows] = await connection.execute(
		'SELECT categories.id, categories.name, count(items.id) as product_count FROM categories LEFT JOIN items ON categories.id = items.kategorie_id GROUP BY categories.id;'
	);


	return {
		products: productRows,
		categories: categoryRows,
		user: locals.user
	};
}

export const actions = {
	editProdukt: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const name = formData.get('name');
		const description = formData.get('description');
		const price = Number(formData.get('price'));

		const connection = await createConnection();

		await connection.execute(
			'UPDATE items SET name = ?, beschreibung = ?, preis = ? WHERE id = ?',
			[name, description, price, id]
		);

		return { success: true };
	},
	deleteProdukt: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		const connection = await createConnection();
		console.log(id);

		await connection.execute('DELETE FROM items WHERE id = ?', [id]);

		return { success: true };
	},
	createProdukt: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const description = formData.get('description');
		const price = Number(formData.get('price'));
		const category = Number(formData.get('category'));
		const image = formData.get('image');

		const { url } = await put('restaurant_app/' + image.name, image, {
			access: 'public',
			token: BLOB_READ_WRITE_TOKEN,
			allowOverwrite: true
		});

		const connection = await createConnection();

		await connection.execute(
			'INSERT INTO items (name, beschreibung, preis,bild_url, kategorie_id) VALUES (?, ?, ?, ?, ?)',
			[name, description, price, url, category]
		);

		return { success: true };
	},
	createCategory: async ({ request }) => {
		const formData = await request.formData();

		const name = formData.get('name');

		if (!name) {
			return { success: false, message: 'Name is required' };
		}
		const connection = await createConnection();

		await connection.execute('INSERT INTO categories (name) VALUES (?)', [name]);

		return { success: true };
	},
	deleteCategorie: async ({ request }) => {
		const formData = await request.formData();
		const categorieId = formData.get('categorieId');

		if (!categorieId) {
			return { success: false, message: 'No categories selected' };
		}

		const connection = await createConnection();

		await connection.execute('DELETE FROM categories WHERE id = ?', [categorieId]);

		return { success: true };
	}
};
