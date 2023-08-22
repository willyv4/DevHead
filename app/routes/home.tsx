import {
	BoltIcon,
	CalendarDaysIcon,
	UsersIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

const primaryFeatures = [
	{
		name: "Server monitoring",
		description:
			"Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.",
		href: "#",
		icon: BoltIcon,
	},
	{
		name: "Collaborate",
		description:
			"Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.",
		href: "#",
		icon: UsersIcon,
	},
	{
		name: "Task scheduling",
		description:
			"Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.",
		href: "#",
		icon: CalendarDaysIcon,
	},
];

export default function Example() {
	return (
		<div className="bg-gray-900">
			<main>
				<Link to="/delete">Delete Account</Link>
				{/* Hero section */}
				<div className="relative isolate overflow-hidden">
					<svg
						className="absolute inset-0 -z-10 h-full w-full stroke-white/5 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
						aria-hidden="true"
					>
						<defs>
							<pattern
								id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
								width={100}
								height={100}
								x="50%"
								y={-1}
								patternUnits="userSpaceOnUse"
							>
								<path d="M.5 200V.5H200" fill="none" />
							</pattern>
						</defs>
						<svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
							<path
								d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
								strokeWidth={0}
							/>
						</svg>
						<rect
							width="100%"
							height="100%"
							strokeWidth={0}
							fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
						/>
					</svg>
					<div
						className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
						aria-hidden="true"
					>
						<div
							className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
							style={{
								clipPath:
									"polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
							}}
						/>
					</div>
					<div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
						<div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
							<h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
								Deploy to the cloud with confidence
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-300">
								Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
								lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
								fugiat aliqua.
							</p>
							<div className="mt-10 flex items-center gap-x-6">
								<Link
									to="/posts"
									className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
								>
									Explore Projects
								</Link>
								<Link
									to="/users"
									className="text-sm font-semibold leading-6 text-white"
								>
									Connect with people <span aria-hidden="true">→</span>
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Logo cloud */}
				<div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
					<h2 className="text-center text-lg font-semibold leading-8 text-white">
						The world’s most innovative companies use our app
					</h2>
					<div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
						<img
							className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
							src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
							alt="Transistor"
							width={158}
							height={48}
						/>
						<img
							className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
							src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
							alt="Reform"
							width={158}
							height={48}
						/>
						<img
							className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
							src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
							alt="Tuple"
							width={158}
							height={48}
						/>
						<img
							className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
							src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg"
							alt="SavvyCal"
							width={158}
							height={48}
						/>
						<img
							className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
							src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
							alt="Statamic"
							width={158}
							height={48}
						/>
					</div>
				</div>

				{/* Feature section */}
				<div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-base font-semibold leading-7 text-indigo-400">
							Deploy faster
						</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
							Everything you need to deploy your app
						</p>
						<p className="mt-6 text-lg leading-8 text-gray-300">
							Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
							magnam voluptatum cupiditate veritatis in accusamus quisquam.
						</p>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
						<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
							{primaryFeatures.map((feature) => (
								<div key={feature.name} className="flex flex-col">
									<dt className="text-base font-semibold leading-7 text-white">
										<div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
											<feature.icon
												className="h-6 w-6 text-white"
												aria-hidden="true"
											/>
										</div>
										{feature.name}
									</dt>
									<dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
										<p className="flex-auto">{feature.description}</p>
										<p className="mt-6">
											<a
												href={feature.href}
												className="text-sm font-semibold leading-6 text-indigo-400"
											>
												Learn more <span aria-hidden="true">→</span>
											</a>
										</p>
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</main>
		</div>
	);
}
