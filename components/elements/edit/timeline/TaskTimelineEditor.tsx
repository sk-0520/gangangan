import { NextPage } from "next";
import { useContext, useState } from "react";

import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import * as Timeline from "../../../../models/data/setting/Timeline";
import TimelineNumber from "./TimelineNumber";
import TimelineControls from "./TimelineControls";
import * as time from "@/models/core/time";
import { MoveItemKind } from "./TimelineControls";
import Timelines from "@/models/Timelines";
import * as throws from "../../../../models/core/throws";


interface Props {
	parentGroup: Timeline.GroupTimeline | null;
	treeIndexes: Array<number>;
	currentIndex: number;
	currentTimeline: Timeline.TaskTimeline;
	updateChildrenOrder: (kind: MoveItemKind, currentTimeline: Timeline.Timeline) => void;
	addNextSiblingItem: (kind: Timeline.TimelineKind, currentTimeline: Timeline.Timeline) => void;
	updateChildrenWorkload(): void;
	updateChildrenProgress(): void;
	callbackDeleteChildren(currentTimeline: Timeline.Timeline): void;
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
	const [workload, setWorkload] = useState(time.TimeSpan.parse(props.currentTimeline.workload).totalDays);
	//const [range, setRange] = useState(props.timeline.item.);
	const [progressPercent, setProgressPercent] = useState(props.currentTimeline.progress * 100.0);

	function handleChangeSubject(s: string) {
		setSubject(s);
		props.currentTimeline.subject = s;
	}

	function handleChangeWorkload(n: number) {
		setWorkload(n);
		props.currentTimeline.workload = time.TimeSpan.fromDays(n).toString("readable");

		props.updateChildrenWorkload();
	}

	function handleChangeProgress(n: number) {
		setProgressPercent(n);
		props.currentTimeline.progress = n / 100.0;

		props.updateChildrenProgress();
	}

	function handleControlMoveItem(kind: MoveItemKind) {
		props.updateChildrenOrder(kind, props.currentTimeline);
	}

	function handleControlAddItem(kind: Timeline.TimelineKind) {
		props.addNextSiblingItem(kind, props.currentTimeline);

		props.updateChildrenWorkload();
		props.updateChildrenProgress();
	}

	function handleControlDeleteItem() {
		console.debug('delete');

		props.callbackDeleteChildren(props.currentTimeline);
	}

	return (
		<div className='task' style={heightStyle}>
			<div className='timeline-header'>
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
						step="0.25"
						min={0}
						value={workload}
						onChange={ev => handleChangeWorkload(ev.target.valueAsNumber)}
					/>
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
					<input
						type="number"
						min={0}
						max={100}
						step={1}
						value={progressPercent}
						onChange={ev => handleChangeProgress(ev.target.valueAsNumber)}
					/>
				</div>
				<div className="timeline-controls">
					<TimelineControls currentTimelineKind="task" moveItem={handleControlMoveItem} addItem={handleControlAddItem} deleteItem={handleControlDeleteItem} />
				</div>
			</div>
		</div >
	);
};

export default Component;
