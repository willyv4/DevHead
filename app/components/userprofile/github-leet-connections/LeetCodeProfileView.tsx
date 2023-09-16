import { PencilIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import LeetCodeIcon from "../../utility/icon-components/LeetCodeIcon";
import Modal from "../../utility/Modal";
import EmptyStatus from "../../utility/EmptyStatus";
import LeetCodeForm from "../../codeconnections/forms/LeetCodeForm";
import LeetCodeStats from "~/components/codeconnections/LeetCodeStats";
import useLeetCodeFetcher from "~/hooks/useLeetCodeFetcher";

type Props = {
	leetcodeUsername: string | null;
	userId: string | undefined;
};

const LeetCodeProfileView: React.FC<Props> = ({ leetcodeUsername, userId }) => {
	const [stats] = useLeetCodeFetcher(leetcodeUsername);
	const [leetCodeOpen, setLeetCodeOpen] = useState<boolean>(false);

	const LeetCodeModal = (
		<button
			className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
			onClick={() => setLeetCodeOpen(true)}
		>
			Connect LeetCode
		</button>
	);

	if (!stats)
		return (
			<div className="my-96 sm:my-32">
				<EmptyStatus
					Icon={<LeetCodeIcon height="2.5rem" width="2.5rem" />}
					ModalButton={LeetCodeModal}
				/>
			</div>
		);

	if (!leetcodeUsername)
		return (
			<div className="mt-20">
				<Modal
					FormComponent={
						<LeetCodeForm userId={userId} setOpen={setLeetCodeOpen} />
					}
					open={leetCodeOpen}
					setOpen={setLeetCodeOpen}
				/>
				<EmptyStatus
					Icon={<LeetCodeIcon height="2.5rem" width="2.5rem" />}
					ModalButton={LeetCodeModal}
				/>
			</div>
		);

	return (
		<div className="mt-10 pb-8">
			<div className="flex flex-row justify-between border-b border-gray-950 pb-5">
				<div className="text-base font-semibold leading-6 text-gray-100">
					<div className="flex flex-row ml-5">
						<LeetCodeIcon height="2rem" width="2rem" />
						<h3 className="ml-2 mt-1 text-xl">LeetCode</h3>
					</div>
				</div>
				<div>
					<button
						className="mr-4 flex flex-row rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
						onClick={() => setLeetCodeOpen(true)}
					>
						Edit <PencilIcon className="h-4 w-4 ml-2 mt-[2px]" />
					</button>
				</div>
			</div>
			{leetCodeOpen && (
				<Modal
					FormComponent={
						<LeetCodeForm userId={userId} setOpen={setLeetCodeOpen} />
					}
					open={leetCodeOpen}
					setOpen={setLeetCodeOpen}
				/>
			)}
			<LeetCodeStats stats={stats} />
		</div>
	);
};

export default LeetCodeProfileView;
