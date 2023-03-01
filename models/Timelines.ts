import { v4 } from "uuid";

import { GroupTimeline, TaskTimeline, Timeline } from "./data/setting/Timeline";
import * as time from "@/models/core/time";

export default abstract class Timelines {
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
		const workload = time.TimeSpan.fromDays(1);
		const item: TaskTimeline = {
			id: v4(),
			kind: "task",
			subject: "",
			comment: "",
			previous: [],
			workload: workload.toString("readable"),
			works: [],
		};

		return item;
	}

	public static toIndexNumber(treeIndexes: ReadonlyArray<number>, currentIndex: number): string {
		const currentNumber = currentIndex + 1;

		if (treeIndexes.length) {
			return treeIndexes.map(a => a + 1).join(".") + "." + currentNumber;
		}

		return currentNumber.toString();
	}
}
