import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CommentForm from "./PostCommentForm";
import { Outlet } from "@remix-run/react";

type props = {
	userId: string | undefined;
	open: any;
	setOpen: any;
	viewProject: any;
	action: string;
};

const CommentSLider: React.FC<props> = ({
	userId,
	open,
	setOpen,
	viewProject,
	action,
}) => {
	return (
		<div className="absolute z-50 shadow-2xl">
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={setOpen}>
					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
										<div className="flex h-full flex-col overflow-y-scroll bg-gray-800 py-6 shadow-xl">
											<div className="fixed z-30 w-full top-0">
												<div className="flex items-start justify-between pb-24 bg-gradient-to-b from-gray-800 via-gray-800 h-12 top-0 pt-4 ">
													<div className="ml-8 flex h-7 items-center">
														<button
															type="button"
															className="relative rounded-md bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
															onClick={() => setOpen(false)}
														>
															<span className="absolute -inset-2.5" />
															<span className="sr-only">Close panel</span>
															<XMarkIcon
																className="h-6 w-6"
																aria-hidden="true"
															/>
														</button>
													</div>
													<Dialog.Title className="w-full pl-6 mb-1 text-xl font-bold text-gray-300">
														{viewProject?.title}
													</Dialog.Title>
												</div>
											</div>
											<div className="relative mt-12 flex-1 px-4 sm:px-5 absolute z-20 -top-2">
												<img
													src={viewProject?.image_url}
													alt="header"
													className="sticky -top-24 z-30 w-full h-[250px] inset-0 w-full bg-gray-50 object-cover rounded-tl-xl rounded-tr-xl mt-4 border-2 border-gray-950"
												/>
												<CommentForm
													postId={viewProject?.id}
													userId={userId}
													action={action}
												/>
												<Outlet />
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
};

export default CommentSLider;
