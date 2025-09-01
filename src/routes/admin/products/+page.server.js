import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({locals}) {

    if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/');
	}

	const connection = await createConnection();
	const [productRows] = await connection.execute('SELECT * FROM items;');

	return {
		products: productRows
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

        await connection.execute('DELETE FROM items WHERE id = ?', [id]);

        return { success: true };
    },
    createProdukt: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const description = formData.get('description');
        const price = Number(formData.get('price'));

        const connection = await createConnection();

        await connection.execute(
            'INSERT INTO items (name, beschreibung, preis) VALUES (?, ?, ?)',
            [name, description, price]
        );

        return { success: true };
    }
};
