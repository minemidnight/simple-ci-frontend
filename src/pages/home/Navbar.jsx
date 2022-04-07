import React from "react";

import NavbarBase from "../../components/navbar_base/NavbarBase";
import GithubLogin from "../../components/navbar_base/GithubLogin";

export default function Navbar(props) {
	return (
		<NavbarBase>
			<GithubLogin />
		</NavbarBase>
	);
}
