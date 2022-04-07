import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

TabLink.propTypes = {
	isActive: PropTypes.bool,
	children: PropTypes.node.isRequired,
	text: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired
};

export default function TabLink(props) {
	let notActiveClasses = "flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2  sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none";
	let activeClasses = notActiveClasses;

	activeClasses += " text-blue-600 border-blue-500 dark:border-blue-400 dark:text-blue-300";
	notActiveClasses += " text-gray-700 dark:text-white hover:border-gray-400 border-transparent";

	return (
		<NavLink end to={props.to} className={navProps => (navProps.isActive ? activeClasses : notActiveClasses)}>
			{props.children}

			<span className="mx-1 text-sm sm:text-base">
				{props.text}
			</span>
		</NavLink>
	);
}
