import { SignUp } from "@clerk/remix";

export default function SignUpPage() {
	return (
		<div className="flex justify-center w-full mt-20">
			<SignUp routing={"path"} path={"/sign-up"} />
		</div>
	);
}
