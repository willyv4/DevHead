import { Tab } from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";
import { useState } from "react";

const BioSection = ({
	userId,
	userBio,
}: {
	userId: string | undefined;
	userBio: string | null;
}) => {
	const [buttonClicked, setButtonClicked] = useState(false);
	const [data, setData] = useState(userBio || "");

	const handleChange = (evt: any) => setData(evt.target.value);

	const handleSubmit = () => {
		setData(data);
		setButtonClicked(false);
	};

	const handleClick = () => {
		buttonClicked ? setButtonClicked(false) : setButtonClicked(true);
	};

	if (userBio) {
		return !buttonClicked ? (
			<div className="border-t-2 border-gray-200 mt-12">
				<div className="flex flex-row justify-between mb-4">
					<p className="text-xl font-bold mt-4">Bio</p>
					<div className="mt-2 flex justify-end">
						<button
							onClick={() => handleClick()}
							type="submit"
							className="flex flex-row rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-1"
						>
							Edit <PencilIcon className="h-4 w-4 ml-2 mt-[2px]" />
						</button>
					</div>
				</div>
				<div className="story-container">
					{userBio?.split("\n")?.map((paragraph, index) => (
						<p key={index + "paragraph"} className="my-2 text-gray-500">
							{paragraph}
						</p>
					))}
				</div>
			</div>
		) : (
			<>
				<div className="flex flex-row justify-between mb-4">
					<p className="text-xl font-bold mt-4">Bio</p>
					<div className="mt-2 flex justify-end">
						<button
							onClick={() => handleClick()}
							type="submit"
							className="flex flex-row rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 float-right mt-1"
						>
							Cancel
						</button>
					</div>
				</div>

				<Form method="post" className="mt-6" onSubmit={handleSubmit}>
					<Tab.Group>
						<Tab.Panels className="mt-2">
							<Tab.Panel className="-m-0.5 rounded-lg p-0.5">
								<div>
									<input
										defaultValue={userId}
										type="hidden"
										name="userId"
										className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									<textarea
										name="userBio"
										rows={7}
										className="pl-2 bg-white block w-full rounded-md py-1.5 text-gray-900 border border-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6 overflow-hidden outline-none"
										value={data}
										onChange={handleChange}
									/>
								</div>
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
					<div className="mt-2 flex justify-end">
						<button
							type="submit"
							className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Edit Bio
						</button>
					</div>
				</Form>
			</>
		);
	}

	return (
		<>
			<p className="text-xl font-bold">Bio</p>
			<Form method="post" className="mt-6">
				<Tab.Group>
					<Tab.Panels className="mt-2">
						<Tab.Panel className="-m-0.5 rounded-lg p-0.5">
							<div>
								<input
									defaultValue={userId}
									type="hidden"
									name="userId"
									className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
								<textarea
									rows={7}
									name="userBio"
									className="pl-2 bg-white block w-full rounded-md py-1.5 text-gray-900 border border-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6"
									placeholder="Add Bio Here"
									defaultValue={""}
								/>
							</div>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
				<div className="mt-2 flex justify-end">
					<button
						type="submit"
						className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Add Bio
					</button>
				</div>
			</Form>
		</>
	);
};

export default BioSection;
