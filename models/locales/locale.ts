import { useRouter } from "next/router";

import ja from "./ja";
import { WeekDay } from "../data/setting/WeekDay";

export interface Locale {
	language: string;
	calendar: {
		week: {
			long: { [key in WeekDay]: string };
			short: { [key in WeekDay]: string };
		};
	}
}

export function useLocale(): Locale {
	const router = useRouter();
	let locale: Locale | null = null;

	if (router.locale === "ja") {
		locale = ja;
	} else {
		locale = ja;
	}

	return locale;
}
