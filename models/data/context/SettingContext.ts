import { createContext } from "react";

import { Color } from "../setting/Color";
import * as ISO8601 from "../setting/ISO8601";
import * as Member from "../setting/Member";
import { WeekDay } from "../setting/WeekDay";

export type UUID = string;

export interface MemberSetting {
	key: UUID;
	id: Member.MemberId;
	name: string;
	color: Color;
}

export interface GroupSetting {
	key: UUID;
	name: string;
	members: Array<MemberSetting>;
}

export interface CalendarSetting {
	range: {
		from: ISO8601.Date;
		to: ISO8601.Date;
	};
	holiday: {
		regulars: { [key in WeekDay]: boolean };
		events: {
			holidays: string;
			specials: string;
		}
	};
}

export interface ThemeSetting {
	holiday: {
		regulars: { [key in WeekDay]: Color },
		events: {
			holiday: Color,
			special: Color,
		}
	};
	groups: Array<{ key: UUID, value: Color }>;
	completed: Color;

}

export interface SettingContext {
	groups: Array<GroupSetting>,
	calendar: CalendarSetting;
	theme: ThemeSetting;
}

export const SettingContext = createContext<SettingContext>({} as SettingContext);
