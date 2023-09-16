import GitHubIcon from "../utility/icon-components/GitHubIcon";
import EmptyStatus from "../utility/EmptyStatus";
import useGitHubFetcher from "~/hooks/useGitHubFetcher";
import GithubStat from "../codeconnections/GitHubStat";

type Props = {
	githubUsername: string | null;
};

const GitHubView: React.FC<Props> = ({ githubUsername }) => {
	const [languages, stats, gitHubFetcher] = useGitHubFetcher(githubUsername);

	const GitHubModal = (
		<div className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
			{gitHubFetcher.state === "loading" ? "connecting..." : "Connect GitHub"}
		</div>
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
			<div className="border-b border-gray-950 pb-5 mt-6">
				<h3 className="font-bold leading-6 text-gray-100">
					<div className="ml-5 flex flex-row">
						<GitHubIcon height="2rem" width="2rem" />
						<p className="ml-2 mt-1 text-xl">Github</p>
					</div>
				</h3>
			</div>

			<div className="bg-gray-900">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
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

export default GitHubView;
