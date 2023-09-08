import { Tab } from "@headlessui/react";
import { Form } from "@remix-run/react";
import { UseFormClear } from "~/hooks/useFormClear";

type BioUpdateFormProps = {
	handleSubmit: () => void;
	handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	userId: string | undefined;
	bio: string | null;
};

const BioUpdateForm: React.FC<BioUpdateFormProps> = ({
	handleSubmit,
	handleChange,
	userId,
	bio,
}) => {
	const { ref: setFormRef } = UseFormClear("UPDATE_BIO");

	return (
		<Form ref={setFormRef} method="post" onSubmit={handleSubmit}>
			<Tab.Group>
				<Tab.Panels className="">
					<Tab.Panel className="-m-0.5 rounded-lg p-0.5">
						<div>
							<input defaultValue={userId} type="hidden" name="userId" />
							<textarea
								name="userBio"
								rows={7}
								className="p-4 bg-gray-400/5 block w-full rounded-md py-1.5 text-gray-400 border border-gray-950 placeholder:text-gray-400 sm:text-sm sm:leading-6 overflow-hidden outline-none"
								value={bio ? bio : ""}
								onChange={handleChange}
							/>
						</div>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
			<div className="mt-2 flex justify-end">
				<button
					type="submit"
					name="_action"
					value="UPDATE_BIO"
					className="absolute top-[502px] sm:top-[421px] mr-20 sm:mr-8 flex flex-row rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
				>
					Submit Edit
				</button>
			</div>
		</Form>
	);
};

export default BioUpdateForm;
