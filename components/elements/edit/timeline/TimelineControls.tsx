import { TimelineKind } from "@/models/data/setting/Timeline";
import { NextPage } from "next";

export type MoveItemKind = "up" | "down";

interface Props {
	currentTimelineKind: TimelineKind;
	moveItem: (dir: MoveItemKind) => void;
	addItem: (dir: TimelineKind) => void;
	deleteItem: () => void;
}

const Component: NextPage<Props> = (props: Props) => {
	return (
		<ul className="line">
			<li><button className="simple" onClick={_ => props.moveItem("up")}>⬆️</button></li>
			<li><button className="simple" onClick={_ => props.moveItem("down")}>⬇️</button></li>
			<li><button className="simple" onClick={_ => props.addItem("group")}>📂</button></li>
			<li><button className="simple" onClick={_ => props.addItem("task")}>🪰</button></li>
			<li><button className="simple" onClick={_ => props.deleteItem()}>🗑️</button></li>
		</ul>
	)
};

export default Component;
