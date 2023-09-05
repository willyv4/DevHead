import axios from "axios";
import { useEffect, useState } from "react";
import LeetCodeIcon from "../icon-components/LeetCodeIcon";
import TagList from "../TagList";

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

const LeetCodeView: React.FC<LeetCodeStatProps> = ({ leetcodeUsername }) => {
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
		tags: {
			advancedTags = [],
			intermediateTags = [],
			fundamentalTags = [],
		} = {},
	} = data || {};

	return (
		<div className="mt-16">
			<div className="border-b border-gray-950 pb-5">
				<h3 className="text-base font-semibold leading-6 text-gray-100">
					<div className="flex flex-row ml-5">
						<LeetCodeIcon height="2rem" width="2rem" />
						<p className="ml-2 mt-1 text-xl">LeetCode</p>
					</div>
				</h3>
			</div>

			<div>
				<dl className="mt-5 grid grid-cols-1 divide-y divide-gray-900 overflow-hidden rounded bg-gray-400/5 shadow md:grid-cols-4 md:divide-x md:divide-y-0">
					{overView.map((item: any) => (
						<div key={item.name} className="px-4 py-5 sm:p-6">
							<dt className="text-base font-bold  text-gray-300">
								{item.name} Problems
							</dt>
							<dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
								<div className="flex items-baseline text-xl font-semibold text-indigo-300 truncate">
									{item.solved} / {item.total}
								</div>

								<div className="inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0">
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

export default LeetCodeView;
