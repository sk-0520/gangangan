import { v4 } from "uuid";

import { GroupTimeline, TaskTimeline } from "./data/setting/Timeline";

export default class Timelines {
	public static createNewGroup(): GroupTimeline {
		const item: GroupTimeline = {
			id: v4(),
			kind: "group",
			subject: "",
			children: [],
			comment: "",
		};

		return item;
	}

	public static createNewTask(): TaskTimeline {
		const item: TaskTimeline = {
			id: v4(),
			kind: "task",
			subject: "",
			comment: "",
			previous: [],
			range: "1.00:00:00",
			works: [],
		};

		return item;
	}
}
