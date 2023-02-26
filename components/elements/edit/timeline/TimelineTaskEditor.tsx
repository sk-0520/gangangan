import { NextPage } from "next";
import { useContext, useState } from "react";

import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import * as Timeline from "../../../../models/data/setting/Timeline";

interface Props {
	group: Timeline.TaskTimeline | null;
	current: Timeline.GroupTimeline |Timeline.TaskTimeline;
}

const Component: NextPage<Props> = (props: Props) => {
	const locale = useLocale();
	const editContext = useContext(EditContext);

	const [subject, setSubject] = useState(props.current.subject);
	const [kind, setKind] = useState(props.current.kind);
	//const [range, setRange] = useState(props.current.item.range);
	//const [range, setRange] = useState(props.timeline.item.);
	const [progress, setProgress] = useState(0);

	function handleChangeSubject(s: string) {
		setSubject(s);
		props.current.subject = s;
	}

	return (
		<div className='task'>
			<div className='timeline-header'>
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
				<div className='timeline-kind'>
				</div>
				<div className='timeline-workload'>
					{
						kind === "task" ? (
							<input
								type="number"
								min={0}
								// value={range}
								// onChange={ev => handleChangeWorkload(ev.target.valueAsNumber)}
							/>
						) : null
					}
				</div>
				<div className='timeline-resource'>
					{
						kind === "task" ? (
							<button>list</button>
						) : null
					}
				</div>
				<div className='timeline-from'>
					{
						kind === "group" ? (
							<time>start</time>
						) : null
					}
					{
						kind === "task" ? (
							<time>start</time>
						) : null
					}
				</div>
				<div className='timeline-to'>
					<time>end</time>
				</div>
				<div className='timeline-progress'>
					{
						kind === "group" ? (
							<span>
								<span>
									<input
										type="number"
										min={0}
										max={100}
										//value={progress}
										//onChange={ev => handleChangeProgress(ev.target.valueAsNumber)}
									/>
								</span>
								<span>%</span>
							</span>
						) : null
					}
					{
						kind === "task" ? (
							<span>
								<span>{progress}</span>
								<span>%</span>
							</span>
						) : null
					}
				</div>
			</div>
		</div >
	);
};

export default Component;
