import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CommentForm from "./forms/CommentForm";
import { Outlet } from "@remix-run/react";

type props = {
	userId: string | undefined;
	open: any;
	setOpen: any;
	viewProject: any;
	comments: any;
};

const CommentSLider: React.FC<props> = ({
	userId,
	open,
	setOpen,
	viewProject,
	comments,
}) => {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<div className="fixed inset-0" />

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
									<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
										<div className="px-4 sm:px-6">
											<div className="flex items-start justify-between fixed z-30 bg-white w-[400px] h-12 top-0 pt-4 -ml-2">
												<Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
													{viewProject?.title}
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
														onClick={() => setOpen(false)}
													>
														<span className="absolute -inset-2.5" />
														<span className="sr-only">Close panel</span>
														<XMarkIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>
										</div>
										<div className="relative mt-6 flex-1 px-4 sm:px-6 absolute z-20 -top-2">
											<img
												src={viewProject?.image_url}
												alt="header"
												className="w-full h-[275px] inset-0 w-full bg-gray-50 object-cover rounded-lg"
											/>
											<CommentForm postId={viewProject?.id} userId={userId} />
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
	);
};

export default CommentSLider;
