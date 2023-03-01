import { NextPage } from "next";
import { useContext, useState } from "react";

import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import * as Timeline from "../../../../models/data/setting/Timeline";
import TimelineNumber from "./TimelineNumber";
import * as time from "@/models/core/time";

interface Props {
	parent: Timeline.GroupTimeline | null;
	treeIndexes: Array<number>;
	currentIndex: number;
	currentTimeline: Timeline.TaskTimeline;
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
	const [progress, setProgress] = useState(0);

	function handleChangeSubject(s: string) {
		setSubject(s);
		props.currentTimeline.subject = s;
	}

	function handleChangeWorkload(n: number) {
		setWorkload(n);
		props.currentTimeline.workload = time.TimeSpan.fromDays(n).toString("readable");
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
					<span>
						<span>{progress}</span>
						<span>%</span>
					</span>
				</div>
			</div>
		</div >
	);
};

export default Component;
