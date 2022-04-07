import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "./components/footer/Footer";

function App() {
	return (
		<div className="transition-colors duration-300
				flex flex-col antialiased min-h-screen
				bg-neutral-50 dark:bg-slate-800"
		>
			<Outlet />
			<Footer />
		</div>
	);
}

export default App;
