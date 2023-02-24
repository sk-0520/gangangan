import { DateRange } from "@/models/data/setting/DateRange";
import { Holiday } from "@/models/data/setting/Holiday";

interface SettingCalendar {
	range: DateRange;
	holiday: Holiday;
}

export default SettingCalendar;
