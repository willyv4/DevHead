import { Pool, PoolConfig } from "pg";

const connectionString =
	process.env.NODE_ENV === "test"
		? "devhead_test"
		: process.env.LIVE_DATABASE_URL;

const config: PoolConfig = {
	connectionString,
	max: 30,
};

if (process.env.NODE_ENV === "production") {
	config["ssl"] = {
		rejectUnauthorized: false,
	};
}
const db = new Pool(config);

// const db = {
// 	query: async (q: any, args?: any) => {
// 		try {
// 			const value = await pool.query(q, args);
// 			// pool.end();
// 			// const value = await db.query(q, args);
// 			// db.end();
// 			return value as QueryArrayResult<any[]>;
// 		} catch (error) {
// 			console.error(error);
// 			return [] as unknown as QueryArrayResult<any[]>;
// 		}
// 	},
// };

export { db };
