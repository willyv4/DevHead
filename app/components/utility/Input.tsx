type Props = {
	id: string | undefined;
	type: string;
	name: string;
	placeholder: string | undefined;
	onChange: any;
	value: any;
	title: string;
};

const Input: React.FC<Props> = ({
	id,
	type,
	name,
	placeholder,
	onChange,
	value,
	title,
}) => {
	return (
		<div className="relative mt-4 mb-4">
			<label className="absolute -top-2 left-2 inline-block bg-gray-700 px-1 text-xs font-medium text-gray-300">
				{title}
			</label>
			<input
				required
				id={id}
				type={type}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				className="pl-2 bg-gray-700 block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm border-[1px] border-gray-200 focus:ring-1 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		</div>
	);
};

export default Input;
