import { createConnection } from '$lib/db/mysql';

export async function load({locals}) {
	const connection = await createConnection();
	const [productRows] = await connection.execute(`SELECT items.id, items.name, items.beschreibung, 
        items.preis, items.bild_url, categories.name as category FROM items JOIN categories ON items.kategorie_id = categories.id`);

	return {
		products: productRows,
        user: locals.user
	};
}
