import { SignedIn, SignedOut, useUser } from "@clerk/remix";
import { Link } from "@remix-run/react";
import logo from "../../public/devheadlogo.png";
import axios from "axios";
import { useEffect, useState } from "react";

const NavBar = () => {
	const [CURR_USER, SET_CURR_USER] = useState<any>(null);
	const { user } = useUser();
	console.log(CURR_USER);

	useEffect(() => {
		async function getUser() {
			const req = await axios.post("http://localhost:3000/api/getuser", {
				userId: user?.id,
			});

			SET_CURR_USER(req.data[0]);
		}

		if (!CURR_USER) getUser();
	}, [CURR_USER, user?.id]);

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
					<Link to={`/user/${CURR_USER?.id}`}>
						<img
							className="h-8 w-auto rounded-full"
							src={CURR_USER?.image_url}
							alt="profile"
						/>
					</Link>
				</SignedIn>
			</div>
		</div>
	);
};

export default NavBar;
