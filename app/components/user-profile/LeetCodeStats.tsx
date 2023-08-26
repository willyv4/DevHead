import { PencilIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import LeetCodeIcon from "../icon-components/LeetCodeIcon";
import Modal from "../Modal";
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

const TagList = ({
	color,
	level,
	tags,
}: {
	color: string;
	level: string;
	tags: Tag[];
}) => (
	<div>
		<h1 className="p-2 text-base font-bold text-gray-900">{level}</h1>
		<div className="flex flex-row flex-wrap p-2">
			{tags.map((tag: Tag) => (
				<div key={tag.name} className="m-1">
					<p
						className={`bg-${color}-100 text-${color}-500 px-1 rounded text-xs`}
					>
						{tag.name} {tag.solved}
					</p>
				</div>
			))}
		</div>
	</div>
);

const LeetCodeStats: React.FC<LeetCodeStatProps> = ({
	leetcodeUsername,
	userId,
}) => {
	const [data, setData] = useState<LeetCodeData | undefined>();
	const [leetCodeOpen, setLeetCodeOpen] = useState(false);

	useEffect(() => {
		async function getLeetcodeData() {
			const { data } = await axios.get(
				`http://localhost:3000/api/leetcodedata/${leetcodeUsername}`
			);

			setData(data);
		}
		if (leetcodeUsername) getLeetcodeData();
	}, [leetcodeUsername]);

	const {
		leetCodeSummary: overView = [],
		tags: {
			advancedTags = [],
			intermediateTags = [],
			fundamentalTags = [],
		} = {},
	} = data || {};

	const LeetCodeModal = (
		<button
			className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			onClick={() => setLeetCodeOpen(true)}
		>
			Connect LeetCode
		</button>
	);

	if (!leetcodeUsername)
		return (
			<EmptyStatus
				Icon={<LeetCodeIcon height="2.5rem" width="2.5rem" />}
				ModalButton={LeetCodeModal}
			/>
		);

	return (
		<>
			<Modal
				FormComponent={<LeetCodeForm userId={userId} />}
				open={leetCodeOpen}
				setOpen={setLeetCodeOpen}
			/>

			<div className="border-t-2 pt-6 mt-6">
				<button
					className="flex flex-row rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-1"
					onClick={() => setLeetCodeOpen(true)}
				>
					Edit <PencilIcon className="h-4 w-4 ml-2 mt-[2px]" />
				</button>
			</div>

			<div className="font-bold tracking-tight sm:text-4xl text-gray-900">
				<div className="flex flex-row">
					<LeetCodeIcon height="2.5rem" width="2.5rem" />
					<p className="ml-2 text-3xl">LeetCode</p>
				</div>
			</div>

			<dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-4 md:divide-x md:divide-y-0">
				{overView.map((item: any) => (
					<div key={item.name} className="px-4 py-5 sm:p-6">
						<dt className="text-base font-bold text-gray-900">
							{item.name} Problems
						</dt>
						<dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
							<div className="flex items-baseline text-2xl font-semibold text-indigo-600">
								{item.solved} / {item.total}
							</div>

							<div
								className={
									"inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
								}
							>
								<span
									className={`-ml-3 mr-0.5 flex-shrink-0 self-center text-xs font-medium mt-1 ${
										item.successRate > 50
											? "text-emerald-500 bg-emerald-100 px-1"
											: "text-yellow-500 bg-yellow-100 px-1"
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

			{/* Tag Section */}
			<h1 className="mt-5">Skills</h1>
			<div className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
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
		</>
	);
};

export default LeetCodeStats;
