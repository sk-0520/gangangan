import { NextPage } from "next";
import { CSSProperties, useContext, useState } from "react";

import Timelines from "@/models/Timelines";
import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import GroupTimelineEditor from "./GroupTimelineEditor";
import TaskTimelineEditor from "./TaskTimelineEditor";
import * as Timeline from "../../../../models/data/setting/Timeline";
import TimelineNumber from "./TimelineNumber";
import TimelineControls, { MoveItemKind } from "./TimelineControls";
import * as throws from "../../../../models/core/throws";
import { Theme } from "@/models/data/setting/Theme";

interface Props {
	treeIndexes: Array<number>;
	parentGroup: Timeline.GroupTimeline | null;
	currentIndex: number;
	currentTimeline: Timeline.GroupTimeline;
	updateChildrenOrder: (kind: MoveItemKind, currentTimeline: Timeline.Timeline) => void;
}

const Component: NextPage<Props> = (props: Props) => {
	const locale = useLocale();
	const editContext = useContext(EditContext);

	const heightStyle: CSSProperties = {
		maxHeight: editContext.design.cell.maxHeight,
		minHeight: editContext.design.cell.minHeight,
		...getGroupStyles(props.treeIndexes.length, editContext.data.setting.theme)
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

	function handleControlMoveItem(kind: MoveItemKind) {
		props.updateChildrenOrder(kind, props.currentTimeline);
	}

	function handleControlAddItem(kind: Timeline.TimelineKind) {
		console.debug(kind);

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

		setChildren([
			...children,
			item,
		]);
		props.currentTimeline.children.push(item);
	}

	function handleControlDeleteItem() {
		console.debug('delete');
	}

	function handleUpdateChildrenOrder(kind: MoveItemKind, currentTimeline: Timeline.Timeline) {
		if (Timelines.moveTimelineOrder(props.currentTimeline.children, kind, currentTimeline)) {
			setChildren([...props.currentTimeline.children]);
		}
	}

	function handleAddNextSiblingItem(kind: Timeline.TimelineKind, currentTimeline: Timeline.Timeline): void {
		const currentIndex = children.findIndex(a => a === currentTimeline);

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

		props.currentTimeline.children.splice(currentIndex + 1, 0, item);
		setChildren([...props.currentTimeline.children]);
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
					<TimelineControls currentTimelineKind="group" moveItem={handleControlMoveItem} addItem={handleControlAddItem} deleteItem={handleControlDeleteItem} />
				</div>
			</div>
			{props.currentTimeline.children.length ? (
				<ul>
					{props.currentTimeline.children.map((a, i) => {
						return (
							<li key={a.id}>
								{
									a.kind === "group" ? (
										<GroupTimelineEditor treeIndexes={[...props.treeIndexes, props.currentIndex]} currentIndex={i} parentGroup={props.currentTimeline} currentTimeline={a} updateChildrenOrder={handleUpdateChildrenOrder} />
									) : <></>
								}
								{
									a.kind === "task" ? (
										<TaskTimelineEditor treeIndexes={[...props.treeIndexes, props.currentIndex]} currentIndex={i} parentGroup={props.currentTimeline} currentTimeline={a} updateChildrenOrder={handleUpdateChildrenOrder} addNextSiblingItem={handleAddNextSiblingItem} />
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

function getGroupStyles(level: number, theme: Readonly<Theme>): CSSProperties {
	if (theme.groups.length < level) {
		return {};
	}

	const color = theme.groups[level];

	return {
		backgroundColor: color,
	};
}
