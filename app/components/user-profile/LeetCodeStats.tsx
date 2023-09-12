import { PencilIcon } from "@heroicons/react/20/solid";
import { useFetcher } from "@remix-run/react";

import { useEffect, useState } from "react";
import LeetCodeIcon from "../icon-components/LeetCodeIcon";
import Modal from "../Modal";
import TagList from "../TagList";
import EmptyStatus from "./EmptyStatus";
import LeetCodeForm from "./forms/LeetCodeForm";

type Tag = {
	name: string;
	solved: number;
};

type Tags = {
	advancedTags: Tag[];
	intermediateTags: Tag[];
	fundamentalTags: Tag[];
};

type LeetCodeData = {
	leetCodeSummary: any[];
	rank: number;
	prefferedLanguage: {
		languageName: string;
	};
	tags: Tags;
};

interface LeetCodeStatProps {
	leetcodeUsername: string | null;
	userId: string | undefined;
}

const LeetCodeStats: React.FC<LeetCodeStatProps> = ({
	leetcodeUsername,
	userId,
}) => {
	const leetFetcher = useFetcher<LeetCodeData>();
	const [leetCodeOpen, setLeetCodeOpen] = useState<boolean>(false);
	const data = leetFetcher.data;
	const {
		leetCodeSummary: overView = [],
		tags: {
			advancedTags = [],
			intermediateTags = [],
			fundamentalTags = [],
		} = {},
	} = data || {};

	useEffect(() => {
		if (leetcodeUsername) {
			leetFetcher.load(`/api/leetcodedata/${leetcodeUsername}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [leetcodeUsername]);

	const LeetCodeModal = (
		<button
			className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
			onClick={() => setLeetCodeOpen(true)}
		>
			Connect LeetCode
		</button>
	);

	if (!leetFetcher.data)
		return (
			<div className="my-96 sm:my-32 animate-pulse">
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

			<div className="mx-auto max-w-7xl px-6 lg:px-8 mt-10">
				<dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded text-center sm:grid-cols-2 lg:grid-cols-4">
					{overView.map((item: any) => (
						<div key={item.name} className="bg-gray-400/5 px-4 py-5 sm:p-6">
							<dt className="text-base font-bold text-gray-300 mb-4">
								{item.name} Problems
							</dt>
							<dd className="mt-1 flex flex-row items-baseline justify-between lg:flex mb-4">
								<div className="flex text-l items-baseline font-semibold text-indigo-300 truncate md:-mb-7">
									{item.solved} / {item.total}
								</div>

								<div className="inline-flex rounded-full px-2.5 py-0.5 text-sm font-medium">
									<span
										className={`-mb-2 mr-0.5 flex-shrink-0 self-center py-1 px-2 text-xs font-medium mt-1 ${
											item.successRate > 50
												? " bg-emerald-400/10 text-emerald-500 ring-1 ring-inset ring-emerald-400/20"
												: "bg-yellow-400/10 text-yellow-500 ring-1 ring-inset ring-yellow-400/20"
										} ${item.successRate === undefined && "hidden"} rounded `}
									>
										{item.successRate !== undefined
											? `${
													item.successRate
														? `beats: ${item.successRate} %`
														: "Not Enough Data"
											  }`
											: ""}
									</span>
								</div>
							</dd>
							<div className="text-xs mt-2 -mb-6">
								completed: {((item.solved / item.total) * 100).toFixed(2)} %
							</div>
							<progress
								className="progress w-full -mb-4"
								value={(item.solved / item.total) * 100}
								max="100"
							></progress>
						</div>
					))}
				</dl>

				<div className="mt-5 grid grid-cols-1 divide-y divide-gray-950 overflow-hidden rounded-lg bg-gray-400/5 shadow md:grid-cols-3 md:divide-x md:divide-y-0">
					<TagList
						color={"emerald"}
						level={"Fundemental"}
						tags={fundamentalTags}
					/>
					<TagList
						color={"yellow"}
						level={"Intermediate"}
						tags={intermediateTags}
					/>
					<TagList color={"rose"} level={"Advanced"} tags={advancedTags} />
				</div>
			</div>
		</div>
	);
};

export default LeetCodeStats;
