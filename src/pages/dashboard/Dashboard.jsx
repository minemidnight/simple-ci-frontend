import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Tabs from "./Tabs";

export default function Dashboard() {
	return (
		<>
			<Navbar />
			{
				// border on bottom to separate footer on dashboard page
				// on home page, we want the footer and main content not to be split
			}
			<div className="flex flex-col grow border-b dark:border-gray-600 pt-2 pb-4">
				<div className="mx-2 md:mx-6 lg:mx-8 xl:mx-12">
					<Tabs />
					<div className="mx-0 md:mx-1 lg:mx-2">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}
