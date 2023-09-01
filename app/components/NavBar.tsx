import { SignedIn, SignedOut, SignOutButton } from "@clerk/remix";
import { Link } from "@remix-run/react";
import logo from "../../public/devheadlogo.png";

const NavBar = ({ currUser }: any) => {
	return (
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
					<SignOutButton />
					<Link to={`/user/${currUser?.id}`}>
						{!currUser?.image_ur ? (
							<img
								className="h-8 w-auto rounded-full"
								src={currUser?.image_url}
								alt="profile"
							/>
						) : (
							<img
								className="h-8 w-auto rounded-full"
								src="https://kansai-resilience-forum.jp/wp-content/uploads/2019/02/IAFOR-Blank-Avatar-Image-1.jpg"
								alt="profile"
							/>
						)}
					</Link>
				</SignedIn>
			</div>
		</div>
	);
};

export default NavBar;
