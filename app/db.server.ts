import { Pool, PoolConfig } from "pg";

const connectionString =
	process.env.NODE_ENV === "test"
		? "devhead_test"
		: process.env.LIVE_DATABASE_URL;

const config: PoolConfig = {
	connectionString,
	max: 10,
	connectionTimeoutMillis: 0,
	idleTimeoutMillis: 0,
};

if (process.env.NODE_ENV === "production") {
	config["ssl"] = {
		rejectUnauthorized: false,
	};
}
const pool = new Pool(config);

const db = {
	query: async (args: any) => {
		try {
			const db = await pool.connect();
			await db.query(args);
			db.release();
		} catch (error) {
			console.error(error);
		}
	},
};

export { db };
