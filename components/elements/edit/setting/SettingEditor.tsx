import { NextPage } from "next";
import { FormEvent, useContext, useState } from "react";
//import { useForm } from "react-hook-form";
import { EditContext } from "@/models/data/context/EditContext";
import { WeekDay } from "@/models/data/setting/WeekDay";
import { useForm } from "react-hook-form";
import WeekSettingEditor from "./WeekSettingEditor";
import { SettingContext } from "@/models/data/context/SettingContext";
import { Setting } from "@/models/data/setting/Setting";
import * as Storage from "@/models/Storage";
import HolidaySettingEditor from "./HolidaySettingEditor";
import * as ISO8601 from "@/models/data/setting/ISO8601";
import { HolidayKind, HolidayEvent } from "@/models/data/setting/Holiday";

const Component: NextPage = () => {
	const editContext = useContext(EditContext);

	const setting = toContext(editContext.data.setting);

	function onSubmit(event: FormEvent) {
		event.preventDefault();

		editContext.data.setting = fromContext(editContext.data.setting, setting);
		console.debug(setting);
		Storage.saveEditData(editContext.data);
	}

	return (
		<SettingContext.Provider value={setting}>
			<form onSubmit={onSubmit}>
				<dl className="inputs">
					<dt className="general">基本</dt>
					<dd className="general"></dd>

					<dt className="member">メンバー</dt>
					<dd className="member"></dd>

					<dt className="calendar">カレンダー</dt>
					<dd className="calendar">
						<dl className="inputs">
							<dt>曜日設定</dt>
							<dd className="week"><WeekSettingEditor /></dd>

							<dt>祝日</dt>
							<dd className="holiday"><HolidaySettingEditor /></dd>
						</dl>

					</dd>

					<dt className="theme">テーマ</dt>
					<dd className="theme"></dd>

				</dl>

				<button className="action">submit</button>
			</form>
		</SettingContext.Provider>
	);
};

export default Component;

function toCalendarHolidayEventContext(kind: HolidayKind, items: { [key: ISO8601.Date]: HolidayEvent }): string {
	return Object.entries(items)
		.filter(([k, v]) => v.kind === kind)
		.map(([k, v]) => ({ date: new Date(k), display: v.display }))
		.sort((a, b) => a.date.getTime() - b.date.getTime())
		.map(a => `${a.date.toDateString()}\t${a.display}`)
		.join("\r\n")
		;

}

function toContext(setting: Setting): SettingContext {
	return {
		calendar: {
			range: {
				from: setting.calendar.range.from,
				to: setting.calendar.range.to,
			},
			holiday: {
				week: {
					monday: setting.calendar.holiday.regulars.includes('monday'),
					tuesday: setting.calendar.holiday.regulars.includes('tuesday'),
					wednesday: setting.calendar.holiday.regulars.includes('wednesday'),
					thursday: setting.calendar.holiday.regulars.includes('thursday'),
					friday: setting.calendar.holiday.regulars.includes('friday'),
					saturday: setting.calendar.holiday.regulars.includes('saturday'),
					sunday: setting.calendar.holiday.regulars.includes('sunday'),
				},
				holidays: toCalendarHolidayEventContext('holiday', setting.calendar.holiday.events),
				specials: toCalendarHolidayEventContext('special', setting.calendar.holiday.events),
			},
		}
	};
}

function fromCalendarHolidayEventContext(kind: HolidayKind, context: string): { [key: ISO8601.Date]: HolidayEvent } {
	const result: { [key: ISO8601.Date]: HolidayEvent } = {};

	return result;
}

function fromContext(source: Setting, context: SettingContext): Setting {
	return {
		name: source.name,
		calendar: {
			range: {
				from: context.calendar.range.from,
				to: context.calendar.range.to,
			},
			holiday: {
				regulars: new Array<{ week: WeekDay, value: boolean }>().concat([
					{ week: 'sunday', value: context.calendar.holiday.week.sunday },
					{ week: 'monday', value: context.calendar.holiday.week.monday },
					{ week: 'tuesday', value: context.calendar.holiday.week.tuesday },
					{ week: 'wednesday', value: context.calendar.holiday.week.wednesday },
					{ week: 'thursday', value: context.calendar.holiday.week.thursday },
					{ week: 'friday', value: context.calendar.holiday.week.friday },
					{ week: 'saturday', value: context.calendar.holiday.week.saturday },
				]).filter(a => a.value).map(a => a.week),
				events: {
					...fromCalendarHolidayEventContext('holiday', context.calendar.holiday.holidays),
					...fromCalendarHolidayEventContext('special', context.calendar.holiday.specials),
				}
			}
		},
		theme: {
			holiday: {
				regulars: {
					monday: '#000',
					tuesday: '#f00',
					wednesday: '#0f0',
					thursday: '#00f',
					friday: '#ff0',
					saturday: '#0ff',
					sunday: '#f0f',
				},
				events: {}
			},
			groups: [
				'#444',
			],
			end: '#123',
		},
		timelines: [],
		versions: []
	};
}
