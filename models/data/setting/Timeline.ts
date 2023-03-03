import * as ISO8601 from "./ISO8601";
import * as Member from "./Member";
import * as Version from "./Version";

export type TimelineId = string;
export type Progress = number;
export type TimelineKind =
	"group"
	|
	"task"
	;

export interface Timeline {
	id: TimelineId;
	kind: TimelineKind;
	subject: string;
	comment: string;
}

export interface GroupTimeline extends Timeline {
	kind: "group";
	children: Array<GroupTimeline | TaskTimeline>;
}

type TaskTimelineWorkState =
	"enabled"
	|
	"disabled"
	|
	"sleep"
	;

type TaskTimelineWorkProgress = number;

export interface TaskTimelineWorkHistory {
	progress: TaskTimelineWorkProgress;
	version: Version.VersionId;
	more: ISO8601.Time;
}

export interface TaskTimeline extends Timeline {
	kind: "task";
	static?: ISO8601.DateTime;
	previous: Array<TimelineId>;
	workload: ISO8601.Time;
	progress: Progress;
}

