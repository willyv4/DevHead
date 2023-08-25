import { useUser } from "@clerk/remix";
import axios from "axios";
import { useEffect, useState } from "react";

type GitHubStatProps = {
	githubUsername: string | null;
};

const GitHubStat: React.FC<GitHubStatProps> = ({ githubUsername }) => {
	const [data, setData] = useState<any | undefined>();
	const [languages, setLanguages] = useState<any | undefined>();
	const { user } = useUser();

	console.log(user);

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

	return githubUsername ? (
		<div className="bg-gray-900 py-24 sm:py-32">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
							{user?.firstName}'s Github Stats
						</h2>
					</div>
					<dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
						{data?.map((stat: any) => (
							<div key={stat.name} className="flex flex-col bg-white/5 p-8">
								<dt className="text-sm font-semibold leading-6 text-gray-300">
									{stat.name}
								</dt>
								<dd className="order-first text-3xl font-semibold tracking-tight text-white">
									{stat.value}
								</dd>
							</div>
						))}
						<div className="flex flex-col bg-white/5 p-8">
							<dd>
								{languages?.map((language: string) => (
									<small key={language}>{language}</small>
								))}
							</dd>
							<dt className="text-sm font-semibold leading-6 text-gray-300">
								Commonanly used languages
							</dt>
						</div>
					</dl>
				</div>
			</div>
		</div>
	) : (
		<div className="bg-gray-900 py-24 sm:py-32">
			Connect Your GitHub Account
		</div>
	);
};

export default GitHubStat;
