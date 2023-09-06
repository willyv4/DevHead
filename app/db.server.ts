import { Client } from "pg";

// let db: Client | undefined;

// const getDatabaseUri = () => {
// 	return process.env.NODE_ENV === "test"
// 		? "devhead_test"
// 		: process.env.LIVE_DATABASE_URL;
// };

// class DB {
// 	db: Client;
// 	constructor() {
// 		if (process.env.NODE_ENV === "production") {
// 			this.db = new Client({
// 				connectionString: getDatabaseUri(),
// 				ssl: {
// 					rejectUnauthorized: false,
// 				},
// 			});
// 		} else {
// 			this.db = new Client({
// 				connectionString: getDatabaseUri(),
// 			});
// 		}
// 		this.db.connect()
// 	}

// 	[Symbol.dispose]() {
// 		// Close the file and delete it.
// 		this.db.end();
// 	}
// }

// using dbClient = new DB();
// const db = dbClient.db

// db.connect();
// db.end()
const connectionString =
	process.env.NODE_ENV === "test"
		? "devhead_test"
		: process.env.LIVE_DATABASE_URL;

const prodConfig = {
	connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
};
const devConfig = {
	connectionString,
};
const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

const db = new Client(config);
db.connect();
process.on("SIGTERM", () => {
	console.info("SIGTERM signal received.");
	console.log("Shutting down server and closing db.");
	db.end();
});
export { db };
