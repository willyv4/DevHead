import { Form } from "@remix-run/react";

const ProfilePostForm = ({userId}: {userId: string}) => {
	return (
		<Form method="post" className="flex flex-row">
			<input
				defaultValue={userId}
				type="hidden"
				name="userId"
				className="pl-2 bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>

			<input
				type="text"
				name="userTitle"
				placeholder="Add Header Here"
				className="pl-2 bg-white block w-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
			<button
				type="submit"
				className="mb-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-1"
			>
				Add Title
			</button>
		</Form>
	);
};

export default ProfilePostForm;
