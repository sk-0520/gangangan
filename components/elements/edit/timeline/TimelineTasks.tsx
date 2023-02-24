import { NextPage } from "next";
import { useContext, useState } from "react";
import { v4 } from "uuid";

import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import TimelineTaskEditor from "./TimelineTaskEditor";
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

	//const [newTimeline, setNewTimeline] = useState<Timeline.TaskTimeline>();
	const newTimeline = createEmptyTimeline();

	function handleAddTask() {
		console.log(newTimeline);
	}

	return (
		<div id='tasks'>
			<>
				<ul>
					{editContext.data.setting.timelines.map(a => {
						return (
							<>
								<li key={a.id} style={heightStyle}>
									<TimelineTaskEditor group={null} current={a} />
								</li>
							</>
						);
					})}
				</ul>

				<hr />

				<button type='button' onClick={handleAddTask}>add new task</button>
			</>
		</div>
	);
};

export default Component;

function createEmptyTimeline(): Timeline.TaskTimeline {
	const result: Timeline.TaskTimeline = {
		id: "",
		kind: "task",
		subject: "NEW",
		comment: "",
		type: "group",
		group: {
			parentGroupId: "",
		},
		item: {
			prev: {
				items: [],
			},
			range: "1.00:00:00.0",
			works: [],
		}
	};

	return result;
}
