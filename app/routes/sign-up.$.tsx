import { SignUp } from "@clerk/remix";

export default function SignUpPage() {
	return (
		<div className="flex justify-center items-center w-full h-screen">
			<SignUp routing={"path"} path={"/sign-up"} />
		</div>
	);
}
