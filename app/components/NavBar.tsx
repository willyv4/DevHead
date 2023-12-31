import { SignedIn, SignedOut, SignOutButton } from "@clerk/remix";
import { Link, NavLink, useNavigate, useNavigation } from "@remix-run/react";
import logo from "../../public/devhead_logo.png";
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

const NavBar = ({ currUser, userId }: any) => {
	const [isSignedOut, setIsSignedOut] = useState<boolean>(false);
	const navigate = useNavigate();
	const navigation = useNavigation();
	const handleCLick = () => setIsSignedOut(true);

	useEffect(() => {
		if (isSignedOut) {
			setIsSignedOut(false);
			return navigate("/");
		}
	}, [isSignedOut, navigate]);

	return (
		<Disclosure
			as="nav"
			className="bg-gradient-to-b from-black/40 absolute top-0 z-10 w-full pb-16"
		>
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>

							{/* LARGE SCREEN VISIBLE NAVLINKS */}
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										<NavLink to="/" prefetch="render">
											<img src={logo} width="32" height="32" alt="Logo" />
										</NavLink>
										<SignedIn>
											<NavLink
												to="/users"
												prefetch="render"
												className={(p) =>
													"bg-gray-900/10 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800/90"
												}
											>
												{(p) => (p.isPending ? "loading..." : "Devs")}
											</NavLink>
											<NavLink
												to="/posts"
												prefetch="render"
												className="bg-gray-900/10 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800/90"
											>
												{(p) => (p.isPending ? "loading..." : "Posts")}
											</NavLink>
										</SignedIn>
									</div>
								</div>
							</div>

							{/* PROFILE MENU AND SIGN OUT BUTTON */}
							<div className="absolute z-20 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<SignedIn>
									<Menu as="div" className="relative ml-3">
										<div>
											<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
												<span className="absolute -inset-1.5" />
												<span className="sr-only">Open user menu</span>
												{navigation.state === "submitting" ||
												navigation.state === "loading" ? (
													<ArrowPathIcon className="w-9 h-9 p-1 animate-spin rounded-full bg-gray-300 p-2 text-gray-950 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200" />
												) : (
													<img
														className="h-10 w-10 rounded-full object-cover"
														src={
															currUser?.image_url
																? currUser?.image_url
																: "https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg"
														}
														alt="profile"
													/>
												)}
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<Link
															to={`/user/${userId}`}
															prefetch="render"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															My Profile
														</Link>
													)}
												</Menu.Item>
												<SignOutButton>
													<Menu.Item>
														{({ active }) => (
															<div
																onClick={() => handleCLick()}
																className={classNames(
																	active ? "bg-gray-100" : "",
																	"block px-4 py-2 text-sm text-gray-700"
																)}
															>
																Sign out
															</div>
														)}
													</Menu.Item>
												</SignOutButton>
											</Menu.Items>
										</Transition>
									</Menu>
								</SignedIn>

								<SignedOut>
									<Link to="/sign-up">
										<div className="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
											Sign up
										</div>
									</Link>

									<Link to="/sign-in">
										<div className="ml-4 bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
											Sign in
										</div>
									</Link>
								</SignedOut>
							</div>
						</div>
					</div>

					{/* SMALL SCREEN VISIBLE NAVLINKS WHEN CLICKING HAMBUGER MENU */}
					<Disclosure.Panel className="sm:hidden ">
						<div className="flex flex-col m-2 justify-between bg-gray-900 p-4 rounded">
							<Disclosure.Button>
								<NavLink
									className="bg-white/10 text-white block rounded-md px-3 py-2 text-base font-medium w-full mb-1"
									to="/"
								>
									{(p) => (p.isPending ? "loading..." : "Home")}
								</NavLink>
							</Disclosure.Button>
							<SignedIn>
								<Disclosure.Button>
									<NavLink
										to="/users"
										className="bg-white/10 text-white block rounded-md px-3 py-2 text-base font-medium w-full mb-1"
									>
										{(p) => (p.isPending ? "loading..." : "Devs")}
									</NavLink>
								</Disclosure.Button>
								<Disclosure.Button>
									<NavLink
										to="/posts"
										className="bg-white/10 text-white block rounded-md px-3 py-2 text-base font-medium w-full mb-1"
									>
										{(p) => (p.isPending ? "loading..." : "Posts")}
									</NavLink>
								</Disclosure.Button>
							</SignedIn>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default NavBar;
