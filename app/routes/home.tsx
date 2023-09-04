import { InboxIcon, TrashIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import screenshot from "../../public/screen_shot.png";

const features = [
	{
		name: "Stream line a portfolio",
		description:
			"Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.",
		href: "#",
		icon: InboxIcon,
	},
	{
		name: "Connect GitHub",
		description:
			"Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.",
		href: "#",
		icon: UsersIcon,
	},
	{
		name: "Connect LeetCode",
		description:
			"Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.",
		href: "#",
		icon: TrashIcon,
	},
];

export default function Example() {
	return (
		<div className="bg-gray-900">
			<div className="relative isolate pt-14">
				<div
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
				<div className="py-24 sm:py-32 lg:pb-40">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-2xl text-center">
							<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
								Connect, Code, Collaborate.
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-300">
								DevHead is your gateway to a thriving developer community!
								Connect with fellow developers, integrate your LeetCode and
								GitHub profiles, and share portfolio pieces. Whether you're
								seeking inspiration, learning opportunities, or simply a place
								to share your coding journey, DevHead has you covered.
							</p>

							<div className="mt-10 flex items-center justify-center gap-x-6">
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
						<img
							src={screenshot}
							alt="App screenshot"
							width={2432}
							height={1442}
							className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
						/>
					</div>
				</div>
				<div
					className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
			</div>

			{/* features */}

			<div className="-mt-24">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h2 className="text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">
							Streamline Your Portfolio Site.
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Unlock your potential with DevHead. Showcase your skills
							effortlessly and make your mark in the world of tech.
						</p>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
						<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
							{features.map((feature) => (
								<div key={feature.name} className="flex flex-col">
									<dt className="text-base font-semibold leading-7 text-gray-900">
										<div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
											<feature.icon
												className="h-6 w-6 text-white"
												aria-hidden="true"
											/>
										</div>
										{feature.name}
									</dt>
									<dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-400">
										<p className="flex-auto">{feature.description}</p>
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
		</div>
	);
}
