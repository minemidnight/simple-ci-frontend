import React from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import {
	LockOpenIcon, CalendarIcon, ClockIcon, LockClosedIcon
} from "@heroicons/react/outline";
import {
	CheckIcon, ExternalLinkIcon, RefreshIcon, XIcon
} from "@heroicons/react/solid";

import getElapsedTime from "../../../helpers/getElapsedTime";

function NoBuildDetails() {
	return (
		<div className="justify-self-center grow">
			<div className="flex flex-row justify-center gap-6">
				<p className="mr-2 text-gray-400 dark:text-neutral-300">No builds for this repository yet</p>
				<button className="px-2 py-1
						font-medium text-white rounded-sm
						transition-colors duration-200 transform
						bg-gray-400 hover:bg-gray-300
						dark:bg-gray-600 dark:hover:bg-gray-700
						focus:outline-none focus:ring
						focus:ring-gray-200 dark:focus:ring-gray-500 focus:ring-opacity-80"
				>
					Trigger a build
				</button>
			</div>
		</div>
	);
}

RepoInfo.propTypes = { name: PropTypes.string.isRequired, public: PropTypes.bool.isRequired };
function RepoInfo(props) {
	const Icon = props.public ? LockOpenIcon : LockClosedIcon;

	return (
		<div className="flex flex-row items-center text-gray-700 dark:text-white">
			<Icon className="text-gray-500 w-4 h-4 mr-1.5" />
			<Link to={props.name} className="hover:underline text-xl">
				{props.name}
			</Link>
		</div>
	);
}

BuildDetails.propTypes = {
	commit: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	status: PropTypes.oneOf(["passed", "failed", "running"]).isRequired,
	finishedAt: PropTypes.instanceOf(Date).isRequired
};
function BuildDetails(props) {
	let Icon = RefreshIcon;
	let borderColor = "border-gray-300";

	if(props.status === "failed") {
		Icon = XIcon;
		borderColor = "border-red-400";
	} else if(props.status === "passed") {
		Icon = CheckIcon;
		borderColor = "border-green-600";
	}

	return (
		<div className={`flex-col p-2 border-2 text-gray-700 dark:text-white ${borderColor}`}>
			<div className="flex flex-row gap-4 mb-2">
				<div className="flex flew-row items-center hover:underline">
					<a href="#">Build #{props.number}</a>
					<Icon className={`ml-1 w-4 h-4 ${props.status === "running" ? "animate-spin" : ""}`} />
				</div>
				<div className="flex flex-row items-center">
					<ClockIcon className="mr-1 w-4 h-4" />
					<span>1 min 5 sec</span>
				</div>
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex flex-row items-center text-gray-700 dark:text-white font-mono">
					<span>{props.commit}</span>
					<a href="https://github.com/oxylbot/message-handler/commit/7c82fbc0e63d492d43876e11b5f97862851180a3" target="_blank" rel="noreferrer" className="ml-1 hover:border-b">
						<ExternalLinkIcon className="w-4 h-4" />
					</a>
				</div>
				<div className="flex flex-row items-center">
					<CalendarIcon className="mr-1 w-4 h-4" />
					<span>{getElapsedTime(props.finishedAt)}</span>
				</div>
			</div>
		</div>
	);
}

LatestBuilds.propTypes = { builds: PropTypes.arrayOf(PropTypes.object).isRequired };
function LatestBuilds(props) {
	const buildList = props.builds.map((build, i) => <ul key={build.number.toString()}>
		<BuildDetails
			number={build.number}
			finishedAt={build.finishedAt}
			status={build.status}
			commit={build.commit}
		/>
	</ul>);

	return (
		<ol className="grow flex xl:flex-row flex-col gap-1 justify-center">
			{buildList}
		</ol>
	);
}

RepoCard.propTypes = { hasBuilds: PropTypes.bool.isRequired, public: PropTypes.bool.isRequired };
function RepoCard(props) {
	let detailsSection;

	const builds = [
		{
			commit: "7c82fbc",
			finishedAt: new Date("2022-04-06T20:27:39.186Z"),
			number: 3,
			status: "running"
		}, {
			commit: "ac8fb3c",
			finishedAt: new Date("2022-04-06T18:27:39.186Z"),
			number: 2,
			status: "passed"
		}, {
			commit: "hczf23e",
			finishedAt: new Date("2022-04-06T16:27:39.186Z"),
			number: 1,
			status: "failed"
		}
	];

	if(!props.hasBuilds) detailsSection = <NoBuildDetails />;
	else detailsSection = <LatestBuilds builds={builds} />;

	return (
		// this div is necessary otherwise the inner div doesn't grow to the max width
		<div>
			<div className="relative flex flex-row gap-8 px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
				<RepoInfo name={"oxyl"} public={props.public} />
				{detailsSection}
			</div>
		</div>

	);
}

Header.propTypes = { account: PropTypes.string.isRequired };
function Header(props) {
	return (
		<div className="flex flex-row gap-3">
			<div>
				<img className="object-cover w-16 h-16 rounded-full" src="https://avatars.githubusercontent.com/u/15851689?v=4" alt="GitHub avatar" />
			</div>
			<div>
				<h2 className="font-light tracking-tight text-3xl text-gray-700 dark:text-white">John Silva</h2>
				<div className="flex flex-row items-center">
					<p className="text-gray-500">{props.account}</p>
					<a className="ml-1.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
						href={`https://github.com/${props.account}`} target="_blank" rel="noreferrer"
					>
						<svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
					</a>
				</div>
			</div>
		</div>
	);
}

export default function AccountReposList() {
	const params = useParams();

	return (
		<div className="flex flex-col flex-1 gap-y-3 mx-0 md:mx-12 lg:mx-32 xl:mx-48">
			<Header account={params.account} />

			{/* show last 3 builds */}
			<RepoCard hasBuilds={true} public={true} />
			<RepoCard hasBuilds={false} public={true} />
			<RepoCard hasBuilds={true} public={false} />
		</div>
	);
}
