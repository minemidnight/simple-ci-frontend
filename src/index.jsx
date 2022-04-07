import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

import { updateTheme } from "./helpers/themeSwitcher";
import reportWebVitals from "./reportWebVitals";

// lazy load both App and 404 page, as we will only render one of these
const App = React.lazy(() => import("./App"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// loading page component for React.Suspense fallback
import LoadPage from "./components/LoadingPage";

// lazy load all pages
const Home = React.lazy(() => import("./pages/home/Home"));
const Account = React.lazy(() => import("./pages/account/Account"));

// Dashboard pages
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const Overview = React.lazy(() => import("./pages/dashboard/Overview"));

const Builds = React.lazy(() => import("./pages/dashboard/builds/Builds"));
const BuildList = React.lazy(() => import("./pages/dashboard/builds/BuildList"));
const Build = React.lazy(() => import("./pages/dashboard/builds/Build"));

const ReposList = React.lazy(() => import("./pages/dashboard/repos/ReposList"));
const AccountReposList = React.lazy(() => import("./pages/dashboard/repos/AccountReposList"));
const Repository = React.lazy(() => import("./pages/dashboard/repos/Repository"));

// create root with router
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<BrowserRouter>
	<Routes>
		<Route path="/" element={<LoadPage page={<App />} />}>
			<Route index element={<LoadPage page={<Home />} />} />
			<Route path="dashboard" element={<LoadPage page={<Dashboard />} />}>
				<Route index element={<LoadPage page={<Overview />} />} />
				<Route path="builds" element={<LoadPage page={<Builds />} />}>
					<Route index element={<LoadPage page={<BuildList />} />} />
					<Route path=":buildId" element={<LoadPage page={<Build />} />} />
				</Route>
				<Route path="repos">
					<Route index element={<LoadPage page={<ReposList />} />} />
					<Route path=":account">
						<Route index element={<LoadPage page={<AccountReposList />} />} />
						<Route path=":repo" element={<LoadPage page={<Repository />} />} />
					</Route>
				</Route>
			</Route>
			<Route path="account" element={<LoadPage page={<Account />} />} />
		</Route>
		<Route path="*" element={<LoadPage page={<NotFound />} />} />
	</Routes>
</BrowserRouter>);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
updateTheme();
