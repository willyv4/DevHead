import { ClerkApp, V2_ClerkErrorBoundary } from "@clerk/remix";
import type {
	LinksFunction,
	LoaderFunction,
	V2_MetaFunction,
} from "@vercel/remix";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import stylesheet from "./tailwind.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import Footer from "./components/Footer";
import { getEnv } from "./env.starter";
import { User } from "./models/users";
export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
];
export const meta: V2_MetaFunction = () => [{ title: "DevHead" }];
export const loader: LoaderFunction = (args) => {
	return rootAuthLoader(
		args,
		async ({ request }) => {
			const { userId, sessionId, getToken }: any = request.auth;

			const currUser = await User.getUserById(userId);

			console.log("Root loader auth:", { userId, sessionId, getToken });
			return { ENV: getEnv(), currUser: currUser };
		},
		{
			loadUser: true,
		}
	);
};

export const ErrorBoundary = V2_ClerkErrorBoundary();

function App() {
	const { ENV, currUser } = useLoaderData();
	const [CURR_USER] = useState<any>(currUser[0]);

	console.log("ENV", ENV);

	return (
		<html lang="en" className="bg-gray-900">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<NavBar currUser={CURR_USER} />
				<Outlet />
				<Footer />
				<ScrollRestoration />
				<Scripts />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(ENV)}`,
					}}
				/>
				<LiveReload />
				<Analytics />
			</body>
		</html>
	);
}

export default ClerkApp(App);
