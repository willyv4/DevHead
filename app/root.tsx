import { ClerkApp } from "@clerk/remix";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import type { LinksFunction, LoaderFunction } from "@vercel/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";

import stylesheet from "./tailwind.css";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
];

// export async function loader() {
// 	console.log("CLERK PUB KEY", process.env.CLERK_PUBLISHABLE_KEY);
// 	console.log("CLERK SEC KEY", process.env.CLERK_SECRET_KEY);
// 	return process.env.CLERK_PUBLISHABLE_KEY;
// }

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
				<Analytics />
			</body>
		</html>
	);
}

export default ClerkApp(App);
