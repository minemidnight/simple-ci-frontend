import React from "react";

import NavbarBase from "../../components/navbar_base/NavbarBase";
import NotificationsIcon from "../../components/navbar_base/NotificationsIcon";

export default function Navbar(props) {
	return (
		<NavbarBase>
			<NotificationsIcon notifications={[]} />
		</NavbarBase>
	);
}
