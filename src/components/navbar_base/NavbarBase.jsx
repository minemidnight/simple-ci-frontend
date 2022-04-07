import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { MenuAlt3Icon } from "@heroicons/react/solid";

import ThemeToggler from "./ThemeToggler";

export default function NavbarBase(props) {
	return (
		<nav className="h-20 container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
			<div className="flex items-center justify-between">
				<div>
					<Link to="/"
						className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
					>
						Simple CI
					</Link>
				</div>

				{/* Mobile menu button */}
				<div className="flex lg:hidden">
					<button type="button"
						className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
						aria-label="toggle menu"
					>
						<MenuAlt3Icon className="w-6 h-6 fill-current" />
					</button>
				</div>
			</div>

			{/* Mobile Menu open: "block", Menu closed: "hidden" */}
			<div className="flex flex-col mt-4 space-y-2 lg:mt-0 lg:flex-row lg:-px-8 lg:space-y-0">
				<Link
					to="/"
					className="mx-8 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
				>
					Home
				</Link>
				<Link
					to="/dashboard"
					className="mx-8 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500"
				>
					Dashboard
				</Link>
			</div>

			<div className="flex items-center mt-4 md:mt-0">
				<ThemeToggler />
				{props.children}
			</div>
		</nav>
	);
}

NavbarBase.propTypes = { children: PropTypes.node.isRequired };

