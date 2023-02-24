import { NextPage } from "next";

import TimelineDaysHeader from "./TimelineDaysHeader";
import TimelineHidariue from "./TimelineHidariue";
import TimelineTasks from "./TimelineTasks";
import TimelineViewer from "./TimelineViewer";

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
