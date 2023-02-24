import { Color } from "./Color";
import { HolidayKind } from "./Holiday";
import { WeekDay } from "./WeekDay";

export interface Theme {
	holiday: {
		regulars: { [key in WeekDay]?: Color };
		events: { [key in HolidayKind]: Color };
	},
	groups: Array<Color>;
	completed: Color;
}
