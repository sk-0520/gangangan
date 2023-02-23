import { EditContext } from '@/models/data/context/EditContext';
import { toWeekDay } from '@/models/data/setting/WeekDay';
import { useLocale } from '@/models/locales/locale';
import { NextPage } from 'next';
import { useContext, useState } from 'react';
// import TimelineHidariue from './TimelineHidariue';
// import TimelineTimeHeader from './TimelineTimeHeader';

const Component: NextPage = () => {
	const locale = useLocale();
	const editContext = useContext(EditContext);

	const [rangeFrom] = useState(new Date(editContext.data.setting.calendar.range.from));
	const [rangeTo] = useState(new Date(editContext.data.setting.calendar.range.to));
	console.log(rangeFrom);
	console.log(rangeTo);

	var diff = rangeTo.getTime() - rangeFrom.getTime();
	const days = diff / (24 * 60 * 60 * 1000);

	const prev = {
		year: rangeTo.getFullYear(),
		month: rangeTo.getMonth(),
	}

	const dates = Array.from(Array(days), (_, index) => {
		const date = new Date(rangeFrom.getTime())
		date.setDate(date.getDate() + index);
		return date;
	});


	return (
		<div id='timeline'>
			{/* <TimelineHidariue /> */}
			{/* <TimelineTimeHeader /> */}

			<table>
				<thead id='time-header'>
					<tr className='year-month'>
						<>
							<th colSpan={8}>{editContext.data.setting.name}</th>

							{dates.map(i => {
								const year = i.getFullYear();
								const yearEquals = prev.year === year;
								prev.year = year;

								const month = i.getMonth();
								const monthEquals = prev.month === month;
								prev.month = month;

								return (
									<td className={'cell' + (yearEquals && monthEquals ? ' equals' : '')}>{year}/{i.getMonth() + 1}</td>
								);
							})}
						</>
					</tr>
					<tr className='day'>
						<>
							<th colSpan={8}>
								<time>{editContext.data.setting.calendar.range.from}</time>
								&nbsp;-&gt;&nbsp;
								<time>{editContext.data.setting.calendar.range.to}</time>
							</th>

							{dates.map(i => {
								return (
									<td className='cell'>{i.getDate()}</td>
								);
							})}
						</>
					</tr>
					<tr className='week'>
						<>
							<th colSpan={8}></th>

							{dates.map(i => {
								return (
									<td className='cell'>{locale.calendar.week.short[toWeekDay(i.getDay())]}</td>
								);
							})}
						</>
					</tr>
					<tr className='util'>
						<>
							<th className='timeline id'>#</th>
							<th className='timeline task'>タスク</th>
							<th className='timeline kind'>先行</th>
							<th className='timeline workload'>工数</th>
							<th className='timeline resource'>割当</th>
							<th className='timeline from'>開始</th>
							<th className='timeline to'>終了</th>
							<th className='timeline percent'>進捗</th>

							{dates.map(i => {
								return (
									<td className='cell'>@</td>
								);
							})}
						</>
					</tr>
				</thead>
				<tbody>
					{Array.from(Array(120), (_, __) => {
						return (
							<tr>
								<td className='timeline id'>#</td>
								<td className='timeline task'>task</td>
								<td className='timeline kind'>kind</td>
								<td className='timeline workload'>workload</td>
								<td className='timeline resource'>resource</td>
								<td className='timeline from'>from</td>
								<td className='timeline to'>to</td>
								<td className='timeline percent'>percent</td>

								{dates.map(i => {
									return (
										<td className='cell'></td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Component;
