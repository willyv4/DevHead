import { ClerkApp, useUser, V2_ClerkErrorBoundary } from "@clerk/remix";
import type { LinksFunction, LoaderFunction } from "@vercel/remix";
import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import stylesheet from "./tailwind.css";
import NavBar from "./components/NavBar";

import { useEffect, useState } from "react";
import axios from "axios";
export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
];

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

export const ErrorBoundary = V2_ClerkErrorBoundary();

function App() {
	const [CURR_USER, SET_CURR_USER] = useState<any>(null);

	const { user } = useUser();

	useEffect(() => {
		async function getUser() {
			try {
				const req = await axios.post("http://localhost:3000/api/getuser", {
					userId: user?.id,
				});

				SET_CURR_USER(req.data[0]);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		}

		if (user?.id && CURR_USER === null) {
			getUser();
		}
	}, [CURR_USER, user]);

	console.log("Stored user:", CURR_USER);

	return (
		<html lang="en" data-theme="night">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<NavBar currUser={CURR_USER} />
				<Outlet />
				<Scripts />
				<LiveReload />
				<Analytics />
			</body>
		</html>
	);
}

export default ClerkApp(App);
