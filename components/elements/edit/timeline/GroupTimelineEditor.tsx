import { NextPage } from "next";
import { useContext, useState } from "react";

import Timelines from "@/models/Timelines";
import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import GroupTimelineEditor from "./GroupTimelineEditor";
import TaskTimelineEditor from "./TaskTimelineEditor";
import * as Timeline from "../../../../models/data/setting/Timeline";

interface Props {
	treeIndexes: Array<number>;
	parent: Timeline.GroupTimeline | null;
	currentIndex: number;
	currentTimeline: Timeline.GroupTimeline;
}

const Component: NextPage<Props> = (props: Props) => {
	const locale = useLocale();
	const editContext = useContext(EditContext);

	const heightStyle = {
		maxHeight: editContext.design.cell.maxHeight,
		minHeight: editContext.design.cell.minHeight,
	};

	const [subject, setSubject] = useState(props.currentTimeline.subject);
	//const [kind, setKind] = useState(props.current.kind);
	//const [range, setRange] = useState(props.current.item.range);
	//const [range, setRange] = useState(props.timeline.item.);
	const [progress, setProgress] = useState(0);
	const [children, setChildren] = useState(props.currentTimeline.children);

	function handleChangeSubject(s: string) {
		setSubject(s);
		props.currentTimeline.subject = s;
	}

	function handleAddNewGroup() {
		const item = Timelines.createNewGroup();

		setChildren([
			...children,
			item,
		]);
		props.currentTimeline.children.push(item);
	}

	function handleAddNewTask() {
		const item = Timelines.createNewTask();

		setChildren([
			...children,
			item,
		]);
		props.currentTimeline.children.push(item);
	}

	return (
		<div className='group'>
			<div className='timeline-header' style={{...heightStyle, paddingLeft: Timelines.toLayoutLevel(props.treeIndexes)}}>
				<div className='timeline-id' title={props.currentTimeline.id}>
					{Timelines.toIndexNumber(props.treeIndexes, props.currentIndex)}
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
			{props.currentTimeline.children.length ? (
				<ul>
					{props.currentTimeline.children.map((a, i) => {
						return (
							<li key={a.id}>
								{
									a.kind === "group" ? (
										<GroupTimelineEditor treeIndexes={[...props.treeIndexes, i]} currentIndex={i} parent={props.currentTimeline} currentTimeline={a} />
									) : <></>
								}
								{
									a.kind === "task" ? (
										<TaskTimelineEditor treeIndexes={[...props.treeIndexes, i]} currentIndex={i} parent={props.currentTimeline} currentTimeline={a} />
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
