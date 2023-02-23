import { NextPage } from 'next';

const Component: NextPage = () => {
	Array.from(Array(5), (_, index) => console.log(index))
	return (
		<div id='tasks'>
			<ul>
				<>
					{Array.from(Array(400), (_, index) => {
						return (
							<li>
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
