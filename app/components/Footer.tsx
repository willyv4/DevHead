import { Link } from "@remix-run/react";
import GitHubIcon from "./utility/icon-components/GitHubIcon";
import LeetCodeIcon from "./utility/icon-components/LeetCodeIcon";
import LinkedInIcon from "./utility/icon-components/LinkedIn";
import logo from "../../public/devhead_logo.png";

const Footer = () => {
	return (
		<footer className="footer footer-center pt-40 p-10 mt-20 bg-gradient-to-t from-black/40 text-gray-400 rounded">
			<nav className="grid grid-flow-col gap-4">
				<Link to="/about" className="link link-hover">
					About Devhead
				</Link>
				<a href="mailto:will.valadez4@gmail.com" className="link link-hover">
					Contact
				</a>
			</nav>
			<nav>
				<div className="grid grid-flow-col gap-4">
					<Link
						to="https://github.com/willyv4"
						target="_blank"
						rel="noopener noreferrer"
					>
						<GitHubIcon height="2rem" width="2rem" />
					</Link>
					<Link
						to="https://leetcode.com/willyv4/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<LeetCodeIcon height="2rem" width="2rem" />
					</Link>
					<Link
						to="https://www.linkedin.com/in/williamvaladez/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<LinkedInIcon height="2rem" width="2rem" />
					</Link>
				</div>
			</nav>

			<aside className="flex flex-row">
				<img className="w-5 h-5" src={logo} alt="icon" />{" "}
				<p>2023 DevHead - Where Developers Connect and Code!</p>
			</aside>
		</footer>
	);
};

export default Footer;
