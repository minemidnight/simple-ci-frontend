const MILLISECONDS_IN_SECONDS = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAYS = 24;
const DAYS_IN_MONTH = 30; // not exact, doesn't need to be though
const MONTHS_IN_YEAR = 12;

export default function getElapsedTime(startTime) {
	let timeElapsed = Date.now() - startTime.getTime();

	timeElapsed = Math.floor(timeElapsed / MILLISECONDS_IN_SECONDS);

	const seconds = timeElapsed % SECONDS_IN_MINUTE;

	timeElapsed = Math.floor(timeElapsed / SECONDS_IN_MINUTE);

	const minutes = timeElapsed % MINUTES_IN_HOUR;

	timeElapsed = Math.floor(timeElapsed / MINUTES_IN_HOUR);

	const hours = timeElapsed % HOURS_IN_DAYS;

	timeElapsed = Math.floor(timeElapsed / HOURS_IN_DAYS);

	const days = timeElapsed % DAYS_IN_MONTH;

	timeElapsed = Math.floor(timeElapsed / DAYS_IN_MONTH);

	const months = timeElapsed % MONTHS_IN_YEAR;

	timeElapsed = Math.floor(timeElapsed / MONTHS_IN_YEAR);

	const years = timeElapsed;

	if(years >= 1) {
		if(months > 9) return `about ${years + 1} years ago`;
		else if(years === 1) return "a year ago";
		else return `${years} years ago`;
	} else if(months >= 1) {
		if(months > 10) return "about a year ago";
		else if(months === 1) return "a month ago";
		else return `${months} months ago`;
	} else if(days >= 1) {
		if(days >= 28) return "about a month ago";
		else if(days === 1) return "a day ago";
		else return `${days} days ago`;
	} else if(hours >= 1) {
		if(hours === 1) return "an hour ago";
		else return `${hours} hours ago`;
	} else if(minutes >= 1) {
		if(minutes === 1) return "a minute ago";
		else return `${minutes} minutes ago`;
	} else if(seconds > 55) {
		return "about a minute ago";
	} else if(seconds < 5) {
		return "just now";
	} else {
		return `${seconds} seconds ago`;
	}
}
