import { PencilIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import GitHubIcon from "../icon-components/GitHubIcon";
import Modal from "../Modal";
import EmptyStatus from "./EmptyStatus";
import GitHubForm from "./forms/GitHubForm";

type Props = {
	githubUsername: string | null;
	userId: string | undefined;
};

const GitHubStat: React.FC<Props> = ({ githubUsername, userId }) => {
	const [data, setData] = useState<any | undefined>();
	const [languages, setLanguages] = useState<any | undefined>();
	const [gitHubOpen, setGitHubOpen] = useState(false);

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

	const GitHubModal = (
		<button
			className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			onClick={() => setGitHubOpen(true)}
		>
			Connect Github
		</button>
	);

	if (!githubUsername)
		return (
			<>
				<Modal
					FormComponent={<GitHubForm userId={userId} />}
					open={gitHubOpen}
					setOpen={setGitHubOpen}
				/>
				<EmptyStatus
					Icon={<GitHubIcon height="2.5rem" width="2.5rem" />}
					ModalButton={GitHubModal}
				/>
			</>
		);

	return (
		<>
			{gitHubOpen && (
				<Modal
					FormComponent={<GitHubForm userId={userId} />}
					open={gitHubOpen}
					setOpen={setGitHubOpen}
				/>
			)}
			<div className="border-t-2 pt-6 mt-6">
				<button
					className="flex flex-row rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-1"
					onClick={() => setGitHubOpen(true)}
				>
					Edit <PencilIcon className="h-4 w-4 ml-2 mt-[2px]" />
				</button>
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
									<div
										key={stat.name}
										className="flex flex-col bg-gray-400/5 p-8"
									>
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
			</div>
		</>
	);
};

export default GitHubStat;
