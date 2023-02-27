import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

import Timelines from "@/models/Timelines";
import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import GroupTimelineEditor from "./GroupTimelineEditor";
import TaskTimelineEditor from "./TaskTimelineEditor";

interface Props {
}

const Component: NextPage<Props> = (props: Props) => {
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

	return (
		<div id='timelines'>
			<>
				<ul>
					{timelines.map(a => {
						return (
							<>
								<li key={a.id}>
									{
										a.kind === "group" ? (
											<GroupTimelineEditor parent={null} current={a} />
										) : <></>
									}
									{
										a.kind === "task" ? (
											<TaskTimelineEditor parent={null} current={a} />
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
