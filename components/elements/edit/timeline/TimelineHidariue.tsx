import { EditContext } from '@/models/data/context/EditContext';
import { NextPage } from 'next';
import { useContext } from 'react';

const Component: NextPage = () => {
	const editContext = useContext(EditContext);

	return (
		<div id='hidariue'>
			<h1>{editContext.data.setting.name}</h1>
			<div className='timeline-header'>
				<div className='timeline-id'>ID</div>
				<div className='timeline-task'>作業</div>
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
