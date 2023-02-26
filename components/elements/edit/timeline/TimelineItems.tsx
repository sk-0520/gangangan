import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import GroupTimelineEditor from "./GroupTimelineEditor";
import TaskTimelineEditor from "./TaskTimelineEditor";
import * as Timeline from "../../../../models/data/setting/Timeline";

interface Props {
}

const Component: NextPage<Props> = (props: Props) => {
	const locale = useLocale();
	const editContext = useContext(EditContext);

	const heightStyle = {
		maxHeight: editContext.design.cell.maxHeight,
		minHeight: editContext.design.cell.minHeight,
	};

	const [timelines, setTimelines] = useState(editContext.data.setting.timelines);

	function handleAddNewGroup() {
		const item: Timeline.GroupTimeline = {
			id: v4(),
			kind: "group",
			subject: "",
			children: [],
			comment: "",
		};
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
								<li key={a.id} style={heightStyle}>
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
			</>
		</div>
	);
};

export default Component;
