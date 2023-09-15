import LeetCodeIcon from "../icon-components/LeetCodeIcon";
import EmptyStatus from "../EmptyStatus";
import useLeetCodeFetcher from "~/hooks/useLeetCodeFetcher";
import LeetCodeStats from "../LeetCodeStats";

type Props = {
	leetcodeUsername: string | null;
};

const LeetCodeUserView: React.FC<Props> = ({ leetcodeUsername }) => {
	const [stats] = useLeetCodeFetcher(leetcodeUsername);

	const LeetCodeModal = (
		<div className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
			Connecting LeetCode...
		</div>
	);

	if (!stats) {
		return (
			<div className="my-96 sm:my-32 animate-pulse">
				<EmptyStatus
					Icon={<LeetCodeIcon height="2.5rem" width="2.5rem" />}
					ModalButton={LeetCodeModal}
				/>
			</div>
		);
	}

	return (
		<div className="mt-10 pb-8">
			<div className="border-b border-gray-950 pb-5">
				<h3 className="text-base font-semibold leading-6 text-gray-100">
					<div className="flex flex-row ml-5">
						<LeetCodeIcon height="2rem" width="2rem" />
						<p className="ml-2 mt-1 text-xl">LeetCode</p>
					</div>
				</h3>
			</div>
			<LeetCodeStats stats={stats} />
		</div>
	);
};

export default LeetCodeUserView;
