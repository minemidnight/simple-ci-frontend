import React from "react";
import PropTypes from "prop-types";

import { BellIcon as BellIconSolid } from "@heroicons/react/solid";
import { BellIcon as BellIconOutline } from "@heroicons/react/outline";

// TODO: badges and dropdown about job status
export default function NotificationsIcon(props) {
	const iconClasses = "h-4 mr-3 sm:h-6";
	let notifications;

	if(props.notifications.length) {
		notifications = <>
			<BellIconSolid className={iconClasses} />
			<span className="absolute -top-1 left-3.5 px-1.5 bg-yellow-500 rounded-full text-xs">{props.notifications.length}</span>
		</>;
	} else {
		notifications = <BellIconOutline className={iconClasses} />;
	}

	return (
		<div>
			<button className="relative block text-gray-700 hover:text-gray-100 dark:text-gray-200 dark:hover:text-white" alt="Notifications">
				{notifications}
			</button>
		</div>
	);
}

NotificationsIcon.propTypes = { notifications: PropTypes.arrayOf(PropTypes.object) };

NotificationsIcon.defaultProps = { notifications: [] };
