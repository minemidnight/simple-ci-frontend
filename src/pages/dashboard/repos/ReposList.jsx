import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
	CheckIcon, ExternalLinkIcon, RefreshIcon, XIcon
} from "@heroicons/react/solid";
import getElapsedTime from "../../../helpers/getElapsedTime";

function NoBuildDetails() {
	return (
		<div className="col-span-3 self-center">
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

ColumnHeader.propTypes = { title: PropTypes.string.isRequired };
function ColumnHeader(props) {
	const classes = "text-xs font-semibold tracking-tight uppercase text-gray-800 dark:text-gray-500";

	return (
		<p className={classes}>{props.title}</p>
	);
}

RepoInfo.propTypes = {
	name: PropTypes.string.isRequired,
	base: PropTypes.string.isRequired
};
function RepoInfo(props) {
	return (
		<div className="flex flex-col">
			{/* custom column header, don't use ColumnHeader */}
			<Link to={props.base} className="font-light hover:underline text-gray-600 dark:text-gray-400">{props.base}</Link>
			<Link to={`${props.base}/${props.name}`} className="hover:underline text-gray-700 dark:text-white">{props.name}</Link>
		</div>
	);
}

BuildDetails.propTypes = {
	buildNumber: PropTypes.number.isRequired,
	buildStatus: PropTypes.oneOf(["passed", "failed", "running"]).isRequired
};
function BuildDetails(props) {
	let Icon = RefreshIcon;
	let colorClasses = "text-gray-700 dark:text-white";

	if(props.buildStatus === "failed") {
		Icon = XIcon;
		colorClasses = "text-red-400";
	} else if(props.buildStatus === "passed") {
		Icon = CheckIcon;
		colorClasses = "text-green-600";
	}

	return (
		<div className="flex flex-col">
			<ColumnHeader title="Build" />
			<div className={`flex flex-row hover:underline items-center mt-2 ${colorClasses}`}>
				<Icon className={`mr-1 w-4 h-4 ${props.buildStatus === "running" ? "animate-spin" : ""}`} />
				<a href="#">#{props.buildNumber} {props.buildStatus}</a>
			</div>


		</div>
	);
}

CommitDetails.propTypes = { commit: PropTypes.string.isRequired };
function CommitDetails(props) {
	return (
		<div className="flex flex-col">
			<ColumnHeader title="Commit" />
			<p className="flex flex-row items-center mt-2 text-gray-700 dark:text-white font-mono">
				{props.commit}
				<a href="https://github.com/oxylbot/message-handler/commit/7c82fbc0e63d492d43876e11b5f97862851180a3" target="_blank" rel="noreferrer" className="ml-1 hover:border-b">
					<ExternalLinkIcon className="w-4 h-4" />
				</a>
			</p>
		</div>
	);
}

FinishedDetails.propTypes = { finishedAt: PropTypes.instanceOf(Date).isRequired };
function FinishedDetails(props) {
	return (
		<div className="flex flex-col">
			<ColumnHeader title="Finished" />
			<p className="mt-2 text-gray-700 dark:text-white">{getElapsedTime(props.finishedAt)}</p>
		</div>
	);
}

RepoCard.propTypes = { hasBuilds: PropTypes.bool.isRequired };
function RepoCard(props) {
	let detailsSection;

	if(!props.hasBuilds) {
		detailsSection = <NoBuildDetails />;
	} else {
		detailsSection = <>
			<BuildDetails buildNumber={3} buildStatus={"running"} />
			<CommitDetails commit={"7c82fbc"} />
			<FinishedDetails finishedAt={new Date("2022-04-06T14:27:39.186Z")} />
		</>;
	}

	return (
		// this div is necessary otherwise the inner div doesn't grow to the max width
		<div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
				<RepoInfo name={"oxyl"} base={"minemidnight"} />
				{detailsSection}
			</div>
		</div>

	);
}

export default function RepoListing() {
	return (
		<div className="flex flex-col flex-1 gap-y-3 mx-0 md:mx-12 lg:mx-32 xl:mx-48">
			<RepoCard hasBuilds={true} />
			<RepoCard hasBuilds={false} />
			<RepoCard hasBuilds={true} />
		</div>
	);
}
