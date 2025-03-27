import { ClerkApp, useUser, V2_ClerkErrorBoundary } from "@clerk/remix";
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
import Footer from "./components/Footer";
import { User } from "./models/users";
import logo from "../public/devhead_logo.png";

export const ErrorBoundary = V2_ClerkErrorBoundary();
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    href: logo,
    type: "image/png",
  },
];

export const meta: V2_MetaFunction = () => [{ title: "DevHead" }];
export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(
    args,
    async ({ request }) => {
      const { userId } = request.auth;
      if (!userId) {
        return { currUser: { id: "", image_url: "" }, userId: "" };
      }
      const user = await User.getUserById(userId);

      return { currUser: user, userId: userId };
    },
    {
      loadUser: true,
    }
  );
};

function App() {
  const { user } = useUser();
  const { currUser } = useLoaderData();

  console.log("🔍 currUser", currUser);
  console.log("🔍 user", user);

  return (
    <html lang="en" className="bg-gray-900">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar currUser={currUser} userId={user?.id} />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
}

export default ClerkApp(App);
