const ProjectList = (props: any) => {
	console.log(props);
	return (
		<div>
			<img src={props.image_url} alt={props.title} />
		</div>
	);
};

export default ProjectList;
