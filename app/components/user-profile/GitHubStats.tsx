// import { useUser } from "@clerk/remix";
import axios from "axios";
import { useEffect, useState } from "react";
import GitHubIcon from "../icon-components/GitHubIcon";

type GitHubStatProps = {
	githubUsername: string | null;
};

const GitHubStat: React.FC<GitHubStatProps> = ({ githubUsername }) => {
	const [data, setData] = useState<any | undefined>();
	const [languages, setLanguages] = useState<any | undefined>();
	// const { user } = useUser();

	useEffect(() => {
		async function getGithubData() {
			const { data } = await axios.get(
				`http://localhost:3000/api/github/${githubUsername}`
			);

			setData(data.stats);
			setLanguages(data.language);
		}
		if (githubUsername) getGithubData();
	}, [githubUsername]);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					<div className="font-bold tracking-tight sm:text-4xl text-gray-900">
						<div className="flex flex-row">
							<GitHubIcon height="2.5rem" width="2.5rem" />
							<p className="ml-2 text-3xl">Github</p>
						</div>
					</div>

					<dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
						{data?.map((stat: any) => (
							<div key={stat.name} className="flex flex-col bg-gray-400/5 p-8">
								<dt className="text-sm font-semibold leading-6 text-gray-600">
									{stat.name}
								</dt>
								<dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
									{stat.value}
								</dd>
							</div>
						))}
						<div className="flex flex-col bg-gray-400/5 p-8">
							<dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
								{languages?.map((language: string) => (
									<small key={language}>{language}</small>
								))}
							</dd>
							<dt className="text-sm font-semibold leading-6 text-gray-600">
								Commonanly used languages
							</dt>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
};

export default GitHubStat;
