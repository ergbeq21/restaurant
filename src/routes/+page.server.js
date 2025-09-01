import { createConnection } from '$lib/db/mysql';

export async function load() {
    const connection = await createConnection();
    const [productRows] = await connection.execute('SELECT * FROM items;');

    return {
        products: productRows
    };
}
