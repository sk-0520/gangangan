import { NextPage } from "next";
import { useContext, useState } from "react";

import Timelines from "@/models/Timelines";
import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import GroupTimelineEditor from "./GroupTimelineEditor";
import TaskTimelineEditor from "./TaskTimelineEditor";
import * as Timeline from "../../../../models/data/setting/Timeline";
import TimelineNumber from "./TimelineNumber";
import TimelineControls from "./TimelineControls";
import { MoveItemKind, AddItemKind } from "./TimelineControls";
import * as throws from "../../../../models/core/throws";

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

	function handleControlMoveItem(kind: MoveItemKind) {
		console.debug(kind);

		const currentChildren = props.parent?.children ?? editContext.data.setting.timelines;
		const currentIndex = currentChildren.findIndex(a => a === props.currentTimeline);
		console.debug("index", currentIndex)

		switch (kind) {
			case "up":
				if (currentIndex && 1 < currentChildren.length) {
					const nextIndex = currentIndex - 1;
					const tempItem = currentChildren[nextIndex];
					currentChildren[nextIndex] = props.currentTimeline;
					currentChildren[currentIndex] = tempItem;
					setChildren(currentChildren);
				}
				break;

			case "down":
				if (props.parent) {
				}
				break;

			default:
				throw new throws.NotImplementedError();
		}
	}
	function handleControlAddItem(kind: AddItemKind) {
		console.debug(kind);
	}
	function handleControlDeleteItem() {
		console.debug('delete');
	}

	return (
		<div className='group'>
			<div className='timeline-header' style={heightStyle}>
				<div className='timeline-id' title={props.currentTimeline.id}>
					<TimelineNumber treeIndexes={props.treeIndexes} currentIndex={props.currentIndex} />
				</div>
				<div className='timeline-subject'>
					<input
						type='text'
						value={subject}
						onChange={ev => handleChangeSubject(ev.target.value)}
					/>
				</div>
				<div className='timeline-workload'>
				</div>
				<div className='timeline-resource'>
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
				<div className="timeline-controls">
					<TimelineControls moveItem={handleControlMoveItem} addItem={handleControlAddItem} deleteItem={handleControlDeleteItem} />
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
										<GroupTimelineEditor treeIndexes={[...props.treeIndexes, props.currentIndex]} currentIndex={i} parent={props.currentTimeline} currentTimeline={a} />
									) : <></>
								}
								{
									a.kind === "task" ? (
										<TaskTimelineEditor treeIndexes={[...props.treeIndexes, props.currentIndex]} currentIndex={i} parent={props.currentTimeline} currentTimeline={a} />
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
