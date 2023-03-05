import { NextPage } from "next";

import { ReactNode, useContext } from "react";
import { EditContext } from "@/models/data/context/EditContext";
import { Member, MemberId } from "@/models/data/setting/Member";

interface Props {
	selectedMemberId: MemberId;
	callbackChangeMember(userId: MemberId): void;
}

const Component: NextPage<Props> = (props: Props) => {
	const editContext = useContext(EditContext);

	const groups = [...editContext.data.setting.groups]
		.sort((a, b) => a.name.localeCompare(b.name))
		;

	function toMemberOptions(selectedMemberId: MemberId, members: ReadonlyArray<Member>): Array<ReactNode> {
		return (
			members.map(a => {
				return (
					<option
						key={a.id}
						selected={selectedMemberId === a.id}
					>
						{a.name}
					</option>
				);
			})
		);
	}

	function handleChangeOption(memberId: MemberId) {
		props.callbackChangeMember(memberId);
	}

	return (
		<select
			onChange={ev => handleChangeOption(ev.target.value)}
		>
			<option></option>

			{groups.map(a => {
				const members = [...a.members]
					.sort((a2, b2) => a2.name.localeCompare(b2.name))
					;

				return (
					a.name ?
						(
							<optgroup key={a.name} label={a.name}>
								<>{toMemberOptions(props.selectedMemberId, members)}</>
							</optgroup>
						)
						: (
							<>{toMemberOptions(props.selectedMemberId, members)}</>
						)
				)
			})}
		</select>
	);
};

export default Component;
