import React from "react";
import { Outlet } from "react-router-dom";

export default function Builds() {
	return (
		<div>
			<h1>Build Pages Wrapper</h1>

			<Outlet />
		</div>
	);
}
