const EmptyStatus = ({
	Icon,
	ModalButton,
}: {
	Icon: any;
	ModalButton: any;
}) => {
	return (
		<div className="p-2">
			<div className="relative block w-full rounded-lg border-2 border-dashed border-gray-400/5 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
				<div className="flex justify-center mb-2 p-2">{Icon}</div>
				{ModalButton}
			</div>
		</div>
	);
};

export default EmptyStatus;
