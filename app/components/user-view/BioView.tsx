type Props = {
	userBio: string | null;
};

const BioView: React.FC<Props> = ({ userBio }) => {
	return (
		<>
			<div className="mt-20 border-b border-gray-950 pb-5">
				<h3 className="ml-5 mt-5 text-xl font-bold leading-6 text-gray-200">
					Bio
				</h3>
			</div>
			<div className="story-container m-1 p-4 sm:p-4 lg:m-4">
				{userBio?.split("\n")?.map((paragraph, index) => (
					<p key={index + "paragraph"} className="my-2 text-gray-400 ">
						{paragraph}
					</p>
				))}
			</div>
		</>
	);
};

export default BioView;
