import { NextPage } from "next";

import TimelineDaysHeader from "./TimelineDaysHeader";
import TimelineHidariue from "./TimelineHidariue";
import TimelineItems from "./TimelineItems";
import TimelineViewer from "./TimelineViewer";

const Component: NextPage = () => {
	return (
		<div id='timeline'>
			<TimelineHidariue />
			<TimelineDaysHeader />
			<TimelineItems />
			<TimelineViewer />
		</div>
	);
};

export default Component;
