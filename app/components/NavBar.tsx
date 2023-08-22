import { SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { Link } from "@remix-run/react";
import logo from "../../public/devheadlogo.png";

const NavBar = () => (
	<div className="navbar bg-base-100">
		<div className="flex-1">
			<Link to="/" className="btn btn-ghost normal-case text-xl">
				<img src={logo} width="32" height="32" alt="Logo" />
				<span className="appName">DevHead</span>
			</Link>
		</div>
		<div className="flex-none">
			<SignedOut>
				<Link to="/sign-up">
					<div className="btn">Sign up</div>
				</Link>
				<Link to="/sign-in">
					<div className="btn ml-2">Sign in</div>
				</Link>
			</SignedOut>

			<SignedIn>
				<UserButton userProfileUrl="/user" afterSignOutUrl="/" />
			</SignedIn>
		</div>
	</div>
);

export default NavBar;
