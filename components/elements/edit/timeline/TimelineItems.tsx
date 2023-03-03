import { NextPage } from "next";
import { useContext, useState } from "react";

import Timelines from "@/models/Timelines";
import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import GroupTimelineEditor from "./GroupTimelineEditor";
import TaskTimelineEditor from "./TaskTimelineEditor";
import { MoveItemKind } from "./TimelineControls";
import * as Timeline from "../../../../models/data/setting/Timeline";
import * as throws from "../../../../models/core/throws";

// interface Props {
// }

//const Component: NextPage<Props> = (props: Props) => {
const Component: NextPage = () => {
	const locale = useLocale();
	const editContext = useContext(EditContext);

	const [timelines, setTimelines] = useState(editContext.data.setting.timelines);

	function handleAddNewGroup() {
		const item = Timelines.createNewGroup();

		setTimelines([
			...timelines,
			item,
		]);
		editContext.data.setting.timelines.push(item);
	}

	function handleAddNewTask() {
		const item = Timelines.createNewTask();

		setTimelines([
			...timelines,
			item,
		]);
		editContext.data.setting.timelines.push(item);
	}

	function handleUpdateChildrenOrder(kind: MoveItemKind, currentTimeline: Timeline.Timeline) {
		if (Timelines.moveTimelineOrder(timelines, kind, currentTimeline)) {
			setTimelines(editContext.data.setting.timelines = [...timelines]);
		}
	}

	function handleAddNextSiblingItem(kind: Timeline.TimelineKind, currentTimeline: Timeline.Timeline) {
		const currentIndex = timelines.findIndex(a => a === currentTimeline);

		let item: Timeline.GroupTimeline | Timeline.TaskTimeline | null = null;
		switch (kind) {
			case "group":
				item = Timelines.createNewGroup();
				break;

			case "task":
				item = Timelines.createNewTask();
				break;

			default:
				throw new throws.NotImplementedError();
		}

		editContext.data.setting.timelines.splice(currentIndex + 1, 0, item);
		setTimelines([...editContext.data.setting.timelines]);
	}

	// function handleUpdateChildrenWorkload() {
	// 	const summary = Timelines.sumWorkloadByGroup(props.currentTimeline);
	// }


	return (
		<div id='timelines'>
			<>
				<ul>
					{timelines.map((a, i) => {
						return (
							<>
								<li key={a.id}>
									{
										a.kind === "group" ? (
											<GroupTimelineEditor
												treeIndexes={[]}
												currentIndex={i}
												parentGroup={null}
												currentTimeline={a as Timeline.GroupTimeline/*TODO: 型ガード*/}
												updateChildrenOrder={handleUpdateChildrenOrder}
												updateChildrenWorkload={() => { /*nop*/ }}
											/>
										) : <></>
									}
									{
										a.kind === "task" ? (
											<TaskTimelineEditor
												treeIndexes={[]}
												currentIndex={i}
												parentGroup={null}
												currentTimeline={a as Timeline.TaskTimeline/*TODO: 型ガード*/}
												updateChildrenOrder={handleUpdateChildrenOrder}
												addNextSiblingItem={handleAddNextSiblingItem}
												updateChildrenWorkload={() => { /*nop*/ }}
											/>
										) : <></>
									}
								</li>
							</>
						);
					})}
				</ul>

				<hr />

				<button type='button' onClick={handleAddNewGroup}>add new group</button>
				<button type='button' onClick={handleAddNewTask}>add new task</button>
			</>
		</div>
	);
};

export default Component;
