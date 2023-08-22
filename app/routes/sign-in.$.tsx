import { SignIn } from "@clerk/remix";

export default function SignInPage() {
	return (
		<div className="flex justify-center mt-20">
			<SignIn routing={"path"} path={"/sign-in"} />
		</div>
	);
}
