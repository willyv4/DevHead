type Props = {
	languages: string[];
	stats: Stat[];
};

type Stat = {
	name: string;
	value: number;
};

const GithubStat: React.FC<Props> = ({ languages, stats }) => {
	return (
		<div className="mx-auto max-w-7xl">
			<div className="mx-auto max-w-2xl lg:max-w-none">
				<dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded text-center sm:grid-cols-2 lg:grid-cols-4">
					{stats?.map((stat: any) => (
						<div key={stat.name} className="flex flex-col bg-gray-400/5 p-8">
							<dt className="text-sm font-bold leading-6 text-gray-400">
								{stat.name}
							</dt>
							<dd className="order-first text-3xl font-bold tracking-tight text-emerald-300">
								{stat.value}
							</dd>
						</div>
					))}
					<div className="flex flex-col bg-gray-400/5 p-8">
						<dd className="mt-2 flex flex-row justify-center order-first text-sm font-bold tracking-tight text-gray-950">
							{languages?.map((language: string) => (
								<span
									key={language}
									className="mx-1 inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/30"
								>
									{language}
								</span>
							))}
						</dd>
						<dt className="mt-1 text-sm font-bold leading-6 text-gray-400">
							Commonanly used languages
						</dt>
					</div>
				</dl>
			</div>
		</div>
	);
};

export default GithubStat;
