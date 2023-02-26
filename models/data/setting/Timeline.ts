import * as ISO8601 from "./ISO8601";
import * as Member from "./Member";
import * as Version from "./Version";

export type TimelineId = string;

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
	id: "group";
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

export interface TaskTimelineWork {
	member: Member.MemberId;
	state: TaskTimelineWorkState;
	progress: TaskTimelineWorkProgress;
}

export interface TaskTimeline extends Timeline {
	id: "task";
	static?: string;
	previous: Array<TimelineId>;
	range: ISO8601.Time;
	works: Array<TaskTimelineWork>;
}

