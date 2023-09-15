import { PencilIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import GitHubIcon from "../../icon-components/GitHubIcon";
import Modal from "../../Modal";
import EmptyStatus from "../../EmptyStatus";
import GitHubForm from "./forms/GitHubForm";
import GithubStat from "~/components/GitHubStat";
import useGitHubFetcher from "~/hooks/useGitHubFetcher";

type Props = {
	githubUsername: string | null;
	userId: string | undefined;
};

const GitHubProfile: React.FC<Props> = ({ githubUsername, userId }) => {
	const [gitHubOpen, setGitHubOpen] = useState<boolean>(false);
	const [languages, stats, gitHubFetcher] = useGitHubFetcher(githubUsername);

	const GitHubModal = (
		<button
			className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
			onClick={() => setGitHubOpen(true)}
		>
			{gitHubFetcher.state === "loading" ? "connecting..." : "Connect GitHub"}
		</button>
	);

	if (!githubUsername)
		return (
			<>
				<Modal
					FormComponent={<GitHubForm userId={userId} setOpen={setGitHubOpen} />}
					open={gitHubOpen}
					setOpen={setGitHubOpen}
				/>
				<EmptyStatus
					Icon={<GitHubIcon height="2.5rem" width="2.5rem" />}
					ModalButton={GitHubModal}
				/>
			</>
		);

	if (!gitHubFetcher.data) {
		return (
			<div className="my-52 sm:my-20 animate-pulse">
				<EmptyStatus
					Icon={<GitHubIcon height="2.5rem" width="2.5rem" />}
					ModalButton={GitHubModal}
				/>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-row justify-between border-b border-gray-950 pb-5 mt-10">
				<div className="font-bold leading-6 text-gray-100">
					<div className="ml-5 flex flex-row">
						<GitHubIcon height="2rem" width="2rem" />
						<h3 className="ml-2 mt-1 text-xl">Github</h3>
					</div>
				</div>
				<div>
					<button
						className="mr-4 flex flex-row rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
						onClick={() => setGitHubOpen(true)}
					>
						Edit <PencilIcon className="h-4 w-4 ml-2 mt-[2px]" />
					</button>
				</div>
			</div>
			{gitHubOpen && (
				<Modal
					FormComponent={<GitHubForm userId={userId} setOpen={setGitHubOpen} />}
					open={gitHubOpen}
					setOpen={setGitHubOpen}
				/>
			)}
			<div>
				<div className="mx-auto max-w-7xl px-4 lg:px-8">
					<div className="mx-auto max-w-2xl lg:max-w-none">
						<div className="font-bold tracking-tight sm:text-4xl text-gray-900">
							<div className="flex flex-row">
								<GitHubIcon height="2.5rem" width="2.5rem" />
								<p className="ml-2 text-3xl">Github</p>
							</div>
						</div>
						<GithubStat languages={languages} stats={stats} />
					</div>
				</div>
			</div>
		</>
	);
};

export default GitHubProfile;
