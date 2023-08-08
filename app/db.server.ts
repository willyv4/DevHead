import { Client } from "pg";

let db: any;

const getDatabaseUri = () => {
	return process.env.NODE_ENV === "test"
		? "devhead_test"
		: process.env.DEVHEAD_DATABASE_URL || "postgres://@localhost:5432/devhead";
};

if (process.env.NODE_ENV === "production") {
	db = new Client({
		connectionString: getDatabaseUri(),
		ssl: {
			rejectUnauthorized: false,
		},
	});
} else {
	db = new Client({
		connectionString: getDatabaseUri(),
	});
}

db.connect();

export default db;
