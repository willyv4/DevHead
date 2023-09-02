import axios from "axios";
import { useEffect, useState } from "react";
import GitHubIcon from "../icon-components/GitHubIcon";

type Props = {
	githubUsername: string | null;
};

const GitHubView: React.FC<Props> = ({ githubUsername }) => {
	const [data, setData] = useState<any | undefined>();
	const [languages, setLanguages] = useState<any | undefined>();

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
		<>
			<div className="border-b border-gray-950 pb-5 mt-16">
				<h3 className="font-bold leading-6 text-gray-100">
					<div className="ml-5 flex flex-row">
						<GitHubIcon height="2rem" width="2rem" />
						<p className="ml-2 mt-1 text-xl">Github</p>
					</div>
				</h3>
			</div>

			<div className="mx-auto max-w-7xl">
				<div className="mx-auto max-w-2xl lg:max-w-none">
					<dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded text-center sm:grid-cols-2 lg:grid-cols-4">
						{data?.map((stat: any) => (
							<div key={stat.name} className="flex flex-col bg-gray-400/5 p-8">
								<dt className="text-sm font-bold leading-6 text-gray-400">
									{stat.name}
								</dt>
								<dd className="order-first text-3xl font-bold tracking-tight text-emerald-300">
									{stat.value}
								</dd>
							</div>
						))}
						<div className="flex flex-col bg-gray-400/5 p-8">
							<dd className="mt-2 flex flex-row justify-center order-first text-sm font-bold tracking-tight text-gray-950">
								{languages?.map((language: string) => (
									<span
										key={language}
										className="mx-1 inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/30"
									>
										{language}
									</span>
								))}
							</dd>
							<dt className="mt-1 text-sm font-bold leading-6 text-gray-400">
								Commonanly used languages
							</dt>
						</div>
					</dl>
				</div>
			</div>
		</>
	);
};

export default GitHubView;
