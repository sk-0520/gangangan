import { v4 } from "uuid";

import { GroupTimeline, TaskTimeline, Timeline } from "./data/setting/Timeline";
import * as time from "@/models/core/time";
import { MoveItemKind } from "@/components/elements/edit/timeline/TimelineControls";
import * as throws from "@/models/core/throws";

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

	public static moveTimelineOrder(timelines: Array<Timeline>, kind: MoveItemKind, currentTimeline: Timeline): boolean {
		const currentIndex = timelines.findIndex(a => a === currentTimeline);

		switch (kind) {
			case "up":
				if (currentIndex && timelines.length) {
					const nextIndex = currentIndex - 1;
					const tempTimeline = timelines[nextIndex];
					timelines[nextIndex] = currentTimeline;
					timelines[currentIndex] = tempTimeline;
					return true;
				}
				break;

			case "down":
				if (currentIndex < timelines.length - 1) {
					const nextIndex = currentIndex + 1;
					const tempTimeline = timelines[nextIndex];
					timelines[nextIndex] = currentTimeline;
					timelines[currentIndex] = tempTimeline;
					return true;
				}
				break;

			default:
				throw new throws.NotImplementedError();
		}

		return false;
	}

	public static sumWorkloads(timelines: Array<GroupTimeline | TaskTimeline>): time.TimeSpan {
		const workloads: Array<time.TimeSpan> = [];

		for (const timeline of timelines) {
			if (timeline.kind === "group") {
				const span = this.sumWorkloads(timeline.children)
				workloads.push(span);
			} else if (timeline.kind === "task") {
				const span = time.TimeSpan.parse(timeline.workload);
				workloads.push(span);
			}
		}

		const sumMs = workloads.reduce(
			(r, a) => r + a.totalMilliseconds,
			0
		);

		return time.TimeSpan.fromMilliseconds(sumMs);
	}

	public static sumWorkloadByGroup(groupTimeline: GroupTimeline): time.TimeSpan {
		return this.sumWorkloads(groupTimeline.children);
	}

}
