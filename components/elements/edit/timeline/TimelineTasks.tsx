import { EditContext } from '@/models/data/context/EditContext';
import { useLocale } from '@/models/locales/locale';
import { NextPage } from 'next';
import { useContext } from 'react';

const Component: NextPage = () => {
	const locale = useLocale();
	const editContext = useContext(EditContext);

	const heightStyle = {
		maxHeight: editContext.design.cell.maxHeight,
		minHeight: editContext.design.cell.minHeight,
	}

	return (
		<div id='tasks'>
			<ul>
				<>
					{Array.from(Array(400), (_, index) => {
						return (
							<li style={ heightStyle }>
								<div className='timeline-header'>
									<div className='timeline-id'>{index}</div>
									<div className='timeline-task'>XX作業</div>
									<div className='timeline-kind'>種別</div>
									<div className='timeline-workload'>工数</div>
									<div className='timeline-resource'>割当</div>
									<div className='timeline-from'>開始</div>
									<div className='timeline-to'>終了</div>
									<div className='timeline-progress'>進捗</div>
								</div>
							</li>
						);
					})}
				</>
			</ul>
		</div>
	);
};

export default Component;
