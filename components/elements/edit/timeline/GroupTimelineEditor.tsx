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
	callbackRefreshChildrenOrder: (kind: MoveItemKind, currentTimeline: Timeline.Timeline) => void;
	callbackRefreshChildrenWorkload(): void;
	callbackRefreshChildrenProgress(): void;
	callbackDeleteChildTimeline(currentTimeline: Timeline.Timeline): void;
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
	const [workload, setWorkload] = useState(Timelines.sumWorkloadByGroup(props.currentTimeline).totalDays);
	//const [range, setRange] = useState(props.current.item.range);
	//const [range, setRange] = useState(props.timeline.item.);
	const [progressPercent, setProgressPercent] = useState(Timelines.sumProgressByGroup(props.currentTimeline) * 100.0);
	const [children, setChildren] = useState(props.currentTimeline.children);

	function handleChangeSubject(s: string) {
		setSubject(s);
		props.currentTimeline.subject = s;
	}

	function handleControlMoveItem(kind: MoveItemKind) {
		props.callbackRefreshChildrenOrder(kind, props.currentTimeline);
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

		handleUpdateChildrenWorkload();
		handleUpdateChildrenProgress();

		props.callbackRefreshChildrenWorkload();
		props.callbackRefreshChildrenProgress();
	}

	function handleControlDeleteItem() {
		props.callbackDeleteChildTimeline(props.currentTimeline);
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

		props.callbackRefreshChildrenWorkload();
		props.callbackRefreshChildrenProgress();
	}

	function handleUpdateChildrenWorkload() {
		const summary = Timelines.sumWorkloadByGroup(props.currentTimeline);
		setWorkload(summary.totalDays);

		props.callbackRefreshChildrenWorkload();
	}

	function handleUpdateChildrenProgress() {
		const progress = Timelines.sumProgressByGroup(props.currentTimeline);
		setProgressPercent(progress * 100.0);

		props.callbackRefreshChildrenProgress();
	}

	function handleDeleteChildren(currentTimeline: Timeline.Timeline) {
		const nextTimelines = children.filter(a => a.id !== currentTimeline.id);
		setChildren(props.currentTimeline.children = nextTimelines);

		handleUpdateChildrenWorkload();
		handleUpdateChildrenProgress();

		props.callbackRefreshChildrenWorkload();
		props.callbackRefreshChildrenProgress();
	}

	return (
		<div className='group'>
			<div className='timeline-header' style={heightStyle}>
				<div className="timeline-kind">
					📂
				</div>
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
					<input
						type="number"
						step="0.01"
						readOnly={true}
						value={workload}
					/>
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
						<input
							type="number"
							readOnly={true}
							value={progressPercent}
						/>
					</span>
				</div>
				<div className="timeline-controls">
					<TimelineControls
						currentTimelineKind="group"
						moveItem={handleControlMoveItem}
						addItem={handleControlAddItem}
						deleteItem={handleControlDeleteItem}
					/>
				</div>
			</div>
			{props.currentTimeline.children.length ? (
				<ul>
					{props.currentTimeline.children.map((a, i) => {
						return (
							<li key={a.id}>
								{
									a.kind === "group" ? (
										<GroupTimelineEditor
											treeIndexes={[...props.treeIndexes, props.currentIndex]}
											currentIndex={i}
											parentGroup={props.currentTimeline}
											currentTimeline={a}
											callbackRefreshChildrenOrder={handleUpdateChildrenOrder}
											callbackRefreshChildrenWorkload={handleUpdateChildrenWorkload}
											callbackRefreshChildrenProgress={handleUpdateChildrenProgress}
											callbackDeleteChildTimeline={handleDeleteChildren}
										/>
									) : <></>
								}
								{
									a.kind === "task" ? (
										<TaskTimelineEditor
											treeIndexes={[...props.treeIndexes, props.currentIndex]}
											currentIndex={i}
											parentGroup={props.currentTimeline}
											currentTimeline={a}
											callbackRefreshChildrenOrder={handleUpdateChildrenOrder}
											callbackAddNextSiblingItem={handleAddNextSiblingItem}
											callbackRefreshChildrenWorkload={handleUpdateChildrenWorkload}
											callbackRefreshChildrenProgress={handleUpdateChildrenProgress}
											callbackDeleteChildTimeline={handleDeleteChildren}
										/>
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
