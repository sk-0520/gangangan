export type WeekDay =
	"monday"
	|
	"tuesday"
	|
	"wednesday"
	|
	"thursday"
	|
	"friday"
	|
	"saturday"
	|
	"sunday"
	;

export function getWeekDays(): Array<WeekDay> {
	return [
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
		"sunday",
	];
}

export function toWeekDay(index: number): WeekDay {
	switch (index) {
		case 0:
			return "sunday";
		case 1:
			return "monday";
		case 2:
			return "tuesday";
		case 3:
			return "wednesday";
		case 4:
			return "thursday";
		case 5:
			return "friday";
		case 6:
			return "saturday";
	}

	throw new Error();
}
