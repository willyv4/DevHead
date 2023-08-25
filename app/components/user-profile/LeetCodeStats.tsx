import axios from "axios";
import { useEffect, useState } from "react";
import LeetCodeIcon from "../icons/LeetCodeIcon";

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

const LeetCodeStats: React.FC<LeetCodeStatProps> = ({ leetcodeUsername }) => {
	const [data, setData] = useState<LeetCodeData | undefined>();

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
		rank,
		prefferedLanguage: { languageName: language } = { languageName: "" },
		tags: {
			advancedTags = [],
			intermediateTags = [],
			fundamentalTags = [],
		} = {},
	} = data || {};

	return (
		<>
			<div className="flex flex-row">
				<LeetCodeIcon />
				<p className="ml-2 mt-[.5px]">LEETCODE STATS</p>
			</div>
			<p className="ml-1">Primary language: {language}</p>
			<p className="ml-1">Rank: {rank}</p>
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
									className={`-ml-3 mr-0.5 flex-shrink-0 self-center text-xs font-medium mt-1  ${
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
