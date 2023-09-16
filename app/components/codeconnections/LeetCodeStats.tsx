import TagList from "./LeetTagList";
import type { LeetCodeData } from "../../types";

const LeetCodeStats = ({ stats }: { stats: LeetCodeData }) => {
	const {
		leetCodeSummary: overView = [],
		tags: {
			advancedTags = [],
			intermediateTags = [],
			fundamentalTags = [],
		} = {},
	} = stats || {};

	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8 mt-4">
			<dl className="mt-10 grid grid-cols-1 gap-0.5 overflow-hidden rounded text-center sm:grid-cols-2 lg:grid-cols-4">
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
						<div className="mt-8">
							<div className="text-xs -mb-4 text-indigo-300">
								Completed: {((item.solved / item.total) * 100).toFixed(2)} %
							</div>
							<progress
								className="progress progress-success w-full -mb-4"
								value={(item.solved / item.total) * 100}
								max="100"
							></progress>
						</div>
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
	);
};

export default LeetCodeStats;
