import { NextPage } from "next";
import { useContext, useState } from "react";

import { EditContext } from "@/models/data/context/EditContext";
import { useLocale } from "@/models/locales/locale";

import * as Timeline from "../../../../models/data/setting/Timeline";
import { TaskTimelineType } from "../../../../models/data/setting/Timeline";

interface Props {
	timeline: Timeline.TaskTimeline;
}

const Component: NextPage<Props> = (props: Props) => {
	const locale = useLocale();
	const editContext = useContext(EditContext);

	const [subject, setSubject] = useState(props.timeline.subject);
	const [type, setType] = useState(props.timeline.type);
	const [range, setRange] = useState(props.timeline.item.range);
	//const [range, setRange] = useState(props.timeline.item.);
	const [progress, setProgress] = useState(0);

	function handleChangeSubject(s: string) {
		setSubject(s);
		props.timeline.subject = s;
	}

	function handleChangeType(s: string) {
		if (["group", "item"].includes(s)) {
			const t = s as TaskTimelineType;
			setType(t);
			props.timeline.type = t;
		}
	}

	function handleChangeWorkload(n: number) {
		console.debug(n);
	}

	function handleChangeProgress(n: number) {
		setProgress(n);
		if (type === "item") {
			props.timeline.item.works.push({
				member: "",
				progress: n,
				state: "enabled",
			});
		}
	}

	return (
		<div className='task'>
			<div className='timeline-header'>
				<div className='timeline-id'>
					{props.timeline.id}
				</div>
				<div className='timeline-task'>
					<input
						type='text'
						value={subject}
						onChange={ev => handleChangeSubject(ev.target.value)}
					/>
				</div>
				<div className='timeline-kind'>
					<>
						<select
							value={type}
							onChange={ev => handleChangeType(ev.target.value)}
						>
							<option value="group">📁</option>
							<option value="item">👻</option>
						</select>
					</>
				</div>
				<div className='timeline-workload'>
					{
						type === "item" ? (
							<input
								type="number"
								min={0}
								value={range}
								onChange={ev => handleChangeWorkload(ev.target.valueAsNumber)}
							/>
						) : null
					}
				</div>
				<div className='timeline-resource'>
					{
						type === "item" ? (
							<button>list</button>
						) : null
					}
				</div>
				<div className='timeline-from'>
					{
						type === "group" ? (
							<time>start</time>
						) : null
					}
					{
						type === "item" ? (
							<time>start</time>
						) : null
					}
				</div>
				<div className='timeline-to'>
					<time>end</time>
				</div>
				<div className='timeline-progress'>
					{
						type === "group" ? (
							<span>
								<span>
									<input
										type="number"
										min={0}
										max={100}
										value={progress}
										onChange={ev => handleChangeProgress(ev.target.valueAsNumber)}
									/>
								</span>
								<span>%</span>
							</span>
						) : null
					}
					{
						type === "item" ? (
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
