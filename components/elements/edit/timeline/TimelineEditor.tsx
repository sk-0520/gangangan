import { NextPage } from 'next';
import TimelineHidariue from './TimelineHidariue';
import TimelineDaysHeader from './TimelineDaysHeader';
import TimelineTasks from './TimelineTasks';

const Component: NextPage = () => {
	return (
		<div id='timeline'>
			<TimelineHidariue />
			<TimelineDaysHeader />
			<TimelineTasks />
		</div>
	);
};

export default Component;
