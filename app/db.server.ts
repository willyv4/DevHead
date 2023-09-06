import { Pool, PoolConfig, QueryArrayResult } from "pg";

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
	query: async (q: any, args?: any) => {
		try {
			const db = await pool.connect();
			const value = await db.query(q, args);
			db.release();
			return value as QueryArrayResult<any[]>;
		} catch (error) {
			return [] as unknown as QueryArrayResult<any[]>;
			console.error(error);
		}
	},
};

export { db };
