import type { V2_MetaFunction } from "@vercel/remix";
import { User } from "../models/users";

export const meta: V2_MetaFunction = () => [{ title: "New Remix App" }];

export default function Index() {
	const getUsers = async () => {
		const res = await User.findAll();
		console.group(res);
	};

	getUsers();
	return <h1 className="text-3xl font-bold text-emerald-500"></h1>;
}
