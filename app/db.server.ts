import type { PoolConfig } from "pg";
import { Pool } from "pg";

const connectionString =
	process.env.NODE_ENV === "test"
		? "postgres://@localhost:5432/devhead_test"
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

const query = async (text: string, params?: (string | number | null)[]) => {
	const db = new Pool(config);
	// const start = Date.now();
	const res = await db.query(text, params);
	// const duration = Date.now() - start;
	// console.log("executed query", { text, duration, rows: res.rowCount });
	db.end();
	return res;
};

const db = {
	query,
};

export { db, query };
