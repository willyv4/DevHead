import { Tab } from "@headlessui/react";
// import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

type BioUpdateFormProps = {
	handleSubmit: () => void;
	handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	userId: string | undefined;
	bio: string | null;
	bioPutFetcher: any;
};

const BioUpdateForm: React.FC<BioUpdateFormProps> = ({
	handleSubmit,
	handleChange,
	userId,
	bio,
	bioPutFetcher,
}) => {
	const text =
		bioPutFetcher.state === "submitting" || bioPutFetcher.state === "loading"
			? "Proccessing..."
			: "Submit Bio";

	useEffect(() => {
		if (bioPutFetcher?.data?.success) {
			handleSubmit();
		}
	}, [bioPutFetcher?.data?.success, bioPutFetcher.state, handleSubmit]);

	return (
		<bioPutFetcher.Form
			method="PUT"
			action="/api/userprofile"
			className="mb-10"
		>
			<Tab.Group>
				<Tab.Panels className="">
					<Tab.Panel className="-m-0.5 rounded-lg p-0.5">
						<div>
							<input defaultValue={userId} type="hidden" name="userId" />
							<textarea
								name="userBio"
								rows={7}
								className="overflow-scroll p-4 bg-gray-400/5 block w-full rounded-md py-1.5 text-gray-200 border border-gray-950 placeholder:text-gray-400 sm:text-sm sm:leading-6 overflow-hidden outline-none"
								placeholder={!bio ? "Add Bio Here..." : ""}
								value={bio || ""}
								onChange={handleChange}
							/>
						</div>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
			<div className="mt-2 flex justify-end">
				<button
					type="submit"
					className={`text-center rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 w-full  sm:w-fit`}
				>
					{!bio ? "Add Bio" : text}
				</button>
			</div>
		</bioPutFetcher.Form>
	);
};

export default BioUpdateForm;
