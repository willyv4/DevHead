import { Pool } from "pg";

let db: any;

const getDatabaseUri = () => {
	return process.env.NODE_ENV === "test"
		? "devhead_test"
		: process.env.LIVE_DATABASE_URL;
};

if (process.env.NODE_ENV === "production") {
	db = new Pool({
		connectionString: getDatabaseUri(),
		ssl: {
			rejectUnauthorized: false,
		},
	});
} else {
	db = new Pool({
		connectionString: getDatabaseUri(),
	});
}

db.connect();

export { db };
