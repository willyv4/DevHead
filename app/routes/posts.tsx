import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Posts from "~/models/projects";

export const loader: LoaderFunction = async () => {
	const projects = Posts.getAllProjects();

	return projects;
};

export default function Projects() {
	const loaderData = useLoaderData<any>();

	return <div>Hello {JSON.stringify(loaderData)}</div>;
}
