import { Tab } from "@headlessui/react";
import { Form } from "@remix-run/react";
import { UseFormClear } from "~/hooks/useFormClear";

const BioPostForm = ({ userId }: { userId: string | undefined }) => {
	const { ref: setFormRef, isAdding } = UseFormClear("POST_BIO");
	return (
		<Form ref={setFormRef} method="post" className="mt-6">
			<Tab.Group>
				<Tab.Panels className="mt-2">
					<Tab.Panel className="-m-0.5 rounded-lg p-0.5">
						<div>
							<input defaultValue={userId} type="hidden" name="userId" />
							<textarea
								rows={7}
								name="userBio"
								className="p-4 bg-gray-400/5 block w-full rounded-md py-1.5 text-gray-400 border border-gray-950 placeholder:text-gray-400 sm:text-sm sm:leading-6 overflow-hidden outline-none"
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
					name="_action"
					value="POST_BIO"
					className="absolute top-[490px] sm:top-[421px] mr-20 sm:mr-8 flex flex-row rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
				>
					{isAdding ? "Processing...." : "Add Bio"}
				</button>
			</div>
		</Form>
	);
};
export default BioPostForm;
