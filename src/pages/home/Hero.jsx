import React from "react";
export default function Hero() {
	return (
		<section>
			<div className="container px-6 py-16 mx-auto text-center">
				<div className="max-w-lg mx-auto">
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
						Agility with Simple CI
					</h1>
					<p className="mt-6 text-gray-500 dark:text-gray-300">
						Move as fast as your tests with real-time feedback.
						Custom tests for all of your GitHub repositories today.
					</p>
					<button
						className="px-6 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 md:mx-0 md:w-auto focus:outline-none"
					>
						Start testing
					</button>
					<p className="mt-3 text-sm text-gray-400 ">Completely free &#8211; no credit card required, ever</p>
				</div>
			</div>
		</section>
	);
}
