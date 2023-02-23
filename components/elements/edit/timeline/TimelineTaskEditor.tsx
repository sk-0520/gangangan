import { EditContext } from '@/models/data/context/EditContext';
import { useLocale } from '@/models/locales/locale';
import { NextPage } from 'next';
import { useContext } from 'react';
import * as Timeline from "../../../../models/data/setting/Timeline";

interface Props {
	mode: 'edit' | 'new';
	timeline: Timeline.TaskTimeline;
}

const Component: NextPage<Props> = (props: Props) => {
	const locale = useLocale();
	const editContext = useContext(EditContext);

	return (
		<div className='task'>
			<div className='timeline-header'>
				<div className='timeline-id'>
					{props.mode === 'edit'
						? (
							<>{props.timeline.id}</>
						): (
							<></>
						)
					}
				</div>
				<div className='timeline-task'>
				{props.mode === 'edit'
						? (
							<input
								type='text'
								defaultValue={props.timeline.subject}
							/>
						): (
							<></>
						)
					}
				</div>
				<div className='timeline-kind'>種別</div>
				<div className='timeline-workload'>工数</div>
				<div className='timeline-resource'>割当</div>
				<div className='timeline-from'>開始</div>
				<div className='timeline-to'>終了</div>
				<div className='timeline-progress'>進捗</div>
			</div>
		</div>
	);
};

export default Component;
