import { NextPage } from "next";
import { useContext, useState } from "react";

import Timelines from "@/models/Timelines";
import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import GroupTimelineEditor from "./GroupTimelineEditor";
import TaskTimelineEditor from "./TaskTimelineEditor";
import * as Timeline from "../../../../models/data/setting/Timeline";

interface Props {
	parent: Timeline.GroupTimeline | null;
	current: Timeline.GroupTimeline;
}

const Component: NextPage<Props> = (props: Props) => {
	const locale = useLocale();
	const editContext = useContext(EditContext);

	const heightStyle = {
		maxHeight: editContext.design.cell.maxHeight,
		minHeight: editContext.design.cell.minHeight,
	};

	const [subject, setSubject] = useState(props.current.subject);
	//const [kind, setKind] = useState(props.current.kind);
	//const [range, setRange] = useState(props.current.item.range);
	//const [range, setRange] = useState(props.timeline.item.);
	const [progress, setProgress] = useState(0);
	const [children, setChildren] = useState(props.current.children);

	function handleChangeSubject(s: string) {
		setSubject(s);
		props.current.subject = s;
	}

	function handleAddNewGroup() {
		const item = Timelines.createNewGroup();

		setChildren([
			...children,
			item,
		]);
		props.current.children.push(item);
	}

	function handleAddNewTask() {
		const item = Timelines.createNewTask();

		setChildren([
			...children,
			item,
		]);
		props.current.children.push(item);
	}

	return (
		<div className='group'>
			<div className='timeline-header' style={heightStyle}>
				<div className='timeline-id'>
					{props.current.id}
				</div>
				<div className='timeline-task'>
					<input
						type='text'
						value={subject}
						onChange={ev => handleChangeSubject(ev.target.value)}
					/>
				</div>
				<div className='timeline-workload'>
				</div>
				<div className='timeline-resource'>
					<button>list</button>
				</div>
				<div className='timeline-from'>
					<time>start</time>
				</div>
				<div className='timeline-to'>
					<time>end</time>
				</div>
				<div className='timeline-progress'>
					<span>
						<span>{progress}</span>
						<span>%</span>
					</span>
				</div>
			</div>
			<button onClick={handleAddNewGroup}>G</button>
			<button onClick={handleAddNewTask}>T</button>
			{props.current.children.length ? (
				<ul>
					{props.current.children.map(a => {
						return (
							<li key={a.id}>
								{
									a.kind === "group" ? (
										<GroupTimelineEditor parent={props.current} current={a} />
									) : <></>
								}
								{
									a.kind === "task" ? (
										<TaskTimelineEditor parent={props.current} current={a} />
									) : <></>
								}
							</li>
						);
					})}
				</ul>
			) : null}
		</div >
	);
};

export default Component;
