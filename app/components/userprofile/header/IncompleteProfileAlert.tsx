import { useEffect, useState } from "react";

type Props = {
	isCompleteProfile: boolean | string | null;
};

const IncompleteProfileAlert: React.FC<Props> = ({ isCompleteProfile }) => {
	const [profileComplete, setProfileComplete] = useState(true);

	useEffect(() => {
		if (!isCompleteProfile) setProfileComplete(false);
	}, [isCompleteProfile]);

	return !profileComplete && !isCompleteProfile ? (
		<span className="absolute ml-2 mt-2 flex flex-row transform sm:text-xs inline-flex items-center gap-x-0.5 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
			Complete your profile to enable it to be searchable
			<button
				type="button"
				onClick={() => setProfileComplete(true)}
				className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-red-600/20"
			>
				<span className="sr-only">Remove</span>
				<svg
					viewBox="0 0 14 14"
					className="h-3.5 w-3.5 stroke-red-600/50 group-hover:stroke-red-600/75"
				>
					<path d="M4 4l6 6m0-6l-6 6" />
				</svg>
				<span className="absolute -inset-1" />
			</button>
		</span>
	) : null;
};

export default IncompleteProfileAlert;
