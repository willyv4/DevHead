type Props = {
	userBio: string | null;
};

const BioView: React.FC<Props> = ({ userBio }) => {
	return (
		<>
			<div className="border-b border-gray-200 pb-5">
				<h3 className="ml-5 mt-5 text-base font-semibold leading-6 text-gray-700">
					Bio
				</h3>
			</div>
			<div className="story-container p-5">
				{userBio?.split("\n")?.map((paragraph, index) => (
					<p key={index + "paragraph"} className="my-2 text-gray-500">
						{paragraph}
					</p>
				))}
			</div>
		</>
	);
};

export default BioView;
