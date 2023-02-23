import { NextPage } from 'next';
import TimelineHidariue from './TimelineHidariue';
import TimelineDaysHeader from './TimelineDaysHeader';
import TimelineTasks from './TimelineTasks';
import TimelineViewer from './TimelineViewer';

const Component: NextPage = () => {
	return (
		<div id='timeline'>
			<TimelineHidariue />
			<TimelineDaysHeader />
			<TimelineTasks />
			<TimelineViewer />
		</div>
	);
};

export default Component;
