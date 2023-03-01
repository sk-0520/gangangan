import { NextPage } from "next";

interface Props {
	moveItem: (dir: "up" | "down") => void,
	addItem: (dir: "group" | "task") => void,
	deleteItem: () => void,
}

const Component: NextPage<Props> = (_: Props) => {
	return (
		<ul className="line">
			<li><button className="simple">⬆️</button></li>
			<li><button className="simple">⬇️</button></li>
			<li><button className="simple">📂</button></li>
			<li><button className="simple">🪰</button></li>
			<li><button className="simple">🗑️</button></li>
		</ul>
	)
};

export default Component;
