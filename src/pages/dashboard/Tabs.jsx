import React from "react";

import TabLink from "./TabLink";

import { BadgeCheckIcon, DocumentTextIcon, FolderIcon } from "@heroicons/react/solid";

export default function Tabs() {
	return (
		<div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
			<TabLink to="/dashboard" text="Dashboard">
				<DocumentTextIcon className="w-4 h-4 mx-1 sm:w-6 sm:h-6" />
			</TabLink>

			<TabLink to="/dashboard/repos" isActive={false} text="Repositories">
				<FolderIcon className="w-4 h-4 mx-1 sm:w-6 sm:h-6" />
			</TabLink>

			<TabLink to="/dashboard/builds" isActive={false} text="Builds">
				<BadgeCheckIcon className="w-4 h-4 mx-1 sm:w-6 sm:h-6" />
			</TabLink>
		</div>
	);
}
