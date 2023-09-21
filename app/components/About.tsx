import { FireIcon, LightBulbIcon, PhoneIcon } from "@heroicons/react/20/solid";
import logo from "../../public/devhead_logo.png";

const cards = [
	{
		name: "Features",
		description:
			"Connect GitHub and LeetCode for stats, showcase projects, skills, bio, and engage with likes, comments, and follows.",
		icon: FireIcon,
	},
	{
		name: "Tech Specs",
		description:
			"Built with React, Remix, TypeScript, PostgreSQL, SQL, Clerk Auth, GitHub API, LeetCode API, Cloudinary API, styled with Tailwind, Tested with Jest.",
		icon: LightBulbIcon,
	},
];

const About = () => {
	return (
		<div className="relative py-56 overflow-hidden overflow-y-clip">
			<img
				src={logo}
				alt=""
				className="absolute right-0 -top-10 -z-10 object-fit object-left opacity-5"
			/>
			<div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
				<div
					className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
			<div className="absolute -top-96 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
				<div
					className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0">
					<h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
						About DevHead
					</h2>
					<p className="mt-6 text-md leading-8 text-gray-300">
						Welcome to DevHead—a social media app, empowering developers to
						showcase their projects, skills, and stats all in one place. I have
						ideas for new features, such as adding/connecting work history and a
						personalized AI-powered resume builder based on your profile, (let
						me know if that would be useful for you). Your ideas matter—please
						share them! Whether you're a seasoned DevHead or just starting out,
						DevHead is your tech hub.
					</p>
				</div>
				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
					<div className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
						<PhoneIcon
							className="h-7 w-5 flex-none text-indigo-400"
							aria-hidden="true"
						/>
						<div className="text-base leading-7">
							<a
								href="mailto:will.valadez4@gmail.com"
								className="font-semibold text-white hover:underline"
							>
								Contact
							</a>
							<p className="mt-2 text-gray-300">
								Open for work and interested in hiring? Have recommendations for
								the site? Feel free to contact me!
							</p>
						</div>
					</div>
					{cards.map((card) => (
						<div
							key={card.name}
							className="flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10"
						>
							<card.icon
								className="h-7 w-5 flex-none text-indigo-400"
								aria-hidden="true"
							/>
							<div className="text-base leading-7">
								<h3 className="font-semibold text-white">{card.name}</h3>
								<p className="mt-2 text-gray-300">{card.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default About;
