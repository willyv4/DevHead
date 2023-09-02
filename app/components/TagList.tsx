type Tag = {
	name: string;
	solved: number;
};

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
		<h1 className="p-2 text-base font-bold text-gray-300 ml-2">{level}</h1>
		<div className="flex flex-row flex-wrap p-2">
			{tags.map((tag: Tag) => (
				<div key={tag.name} className="m-1">
					<p
						className={`bg-${color}-400/10 text-${color}-500 ring-1 ring-inset ring-${color}-400/20 py-1 px-2 rounded text-xs`}
					>
						{tag.name} {tag.solved}
					</p>
				</div>
			))}
		</div>
	</div>
);

export default TagList;
