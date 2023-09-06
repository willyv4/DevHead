import { Pool, PoolConfig, PoolClient } from "pg";

const connectionString =
	process.env.NODE_ENV === "test"
		? "devhead_test"
		: process.env.LIVE_DATABASE_URL;

const config: PoolConfig = {
	connectionString,
	max: 5,
	connectionTimeoutMillis: 0,
	idleTimeoutMillis: 0,
};

if (process.env.NODE_ENV === "production") {
	config["ssl"] = {
		rejectUnauthorized: false,
	};
}
const pool = new Pool(config);

let db: PoolClient | undefined = undefined;
const initDB = async (): Promise<PoolClient> => {
	if (db) {
		return db;
	}
	const newDb = await pool.connect();
	db = newDb;
	return db;
};

initDB();
process.on("SIGTERM", () => {
	console.info("SIGTERM signal received.");
	console.log("Shutting down server and closing db.");
	db?.release();
});
export { db };
