import { NextPage } from "next";
import { useContext, useState } from "react";

import { EditContext } from "@/models/data/context/EditContext";
import { getWeekDays, toWeekDay } from "@/models/data/setting/WeekDay";
import { useLocale } from "@/models/locales/locale";

const Component: NextPage = () => {
	const locale = useLocale();
	const editContext = useContext(EditContext);

	const range = {
		from: new Date(editContext.data.setting.calendar.range.from),
		to: new Date(editContext.data.setting.calendar.range.to),
	};

	let diff = range.to.getTime() - range.from.getTime();
	const days = diff / (24 * 60 * 60 * 1000);

	const dates = Array.from(Array(days), (_, index) => {
		const date = new Date(range.from.getTime());
		date.setDate(date.getDate() + index);
		return date;
	});

	const yearMonthBucket: Array<{ year: number, month: number, length: number }> = [];
	for (const date of dates) {
		const yearTargets = yearMonthBucket.filter(a => a.year === date.getFullYear());
		if (yearTargets.length) {
			const target = yearTargets.find(a => a.month === date.getMonth());
			if (target) {
				target.length += 1;
			} else {
				yearMonthBucket.push({ year: date.getFullYear(), month: date.getMonth(), length: 1 });
			}
		} else {
			yearMonthBucket.push({ year: date.getFullYear(), month: date.getMonth(), length: 1 });
		}
	}
	yearMonthBucket.sort((a, b) => {
		const year = a.year - b.year;
		if(year) {
			return year;
		}
		return a.month - b.month;
	});

	const cellStyle = editContext.design.cell;

	return (
		<div id='days-header'>
			<table>
				<tbody>
					<thead>
						<tr className='year-month'>
							{yearMonthBucket.map(a => {

								const display = `${a.year}/${a.month + 1}`;

								return (
									<td className={"cell"} colSpan={a.length} style={cellStyle}>{display}</td>
								);
							})}
						</tr>
					</thead>
					<tbody>
						<tr className='day'>
							{dates.map(a => <td className='cell' style={cellStyle}>{a.getDate()}</td>)}
						</tr>
						<tr className='week'>
							{dates.map(a => <td className='cell' style={cellStyle}>{locale.calendar.week.short[toWeekDay(a.getDay())]}</td>)}
						</tr>
					</tbody>
					<tbody>
						<tr className='pin'>
							{dates.map(a => <td className='cell' style={cellStyle}>@</td>)}
						</tr>
					</tbody>
				</tbody>
			</table>
		</div>
	);
};

export default Component;
