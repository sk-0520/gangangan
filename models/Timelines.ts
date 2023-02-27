import { v4 } from "uuid";

import { GroupTimeline, TaskTimeline, Timeline } from "./data/setting/Timeline";

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

	public static toIndexNumber(treeIndexes: ReadonlyArray<number>, currentIndex: number): string {
		const currentNumber = currentIndex + 1;

		if(treeIndexes.length) {
			return treeIndexes.map(a => a + 1).join(".") + "." + currentNumber;
		}

		return currentNumber.toString();
	}

	public static toLayoutLevel(treeIndexes: ReadonlyArray<number>): string
	{
		return treeIndexes.length + "ch";
	}
}
