import { XMarkIcon } from "@heroicons/react/24/solid";

type AlertProps = {
	message: string;
	setMessage: (message: string | null) => void;
};

const Alert: React.FC<AlertProps> = ({ message, setMessage }) => {
	return (
		<div className="absolute -ml-4 sm:-ml-6 w-full top-0 rounded-tr-md rounded-tl-md bg-rose-50 p-4 shadow-2xl shadow-gray-950">
			<div className="flex">
				<div className="flex-shrink-0">
					<p className="text-lg" aria-hidden="true">
						🙁
					</p>
				</div>
				<div className="ml-3">
					<p className="text-sm font-medium text-rose-800">{message}</p>
				</div>
				<div className="ml-auto pl-3">
					<div className="-mx-1.5 -my-1.5">
						<button
							onClick={() => setMessage(null)}
							type="button"
							className="inline-flex rounded-md bg-rose-50 p-1.5 text-rose-500 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2 focus:ring-offset-rose-50"
						>
							<span className="sr-only">Dismiss</span>
							<XMarkIcon className="h-5 w-5" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Alert;
