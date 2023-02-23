import Calendar from "./Calendar";
import { Group } from "./Group";
import { Theme } from "./Theme";
import * as Timeline from "./Timeline";
import * as Version from "./Version";

export interface Setting {
	name: string;
	calendar: Calendar;
	theme: Theme;
	groups: Array<Group>;
	timelines: Array<Timeline.TaskTimeline>;
	versions: Array<Version.VersionItem>;
}
