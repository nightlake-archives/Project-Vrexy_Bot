import { readdirSync } from 'fs';
import { Locales, LocaleStrings, LocaleType } from 'src/types/Locale.type';

export default class LocaleManager {
	locales: Record<keyof Locales, LocaleType>;

	constructor() {
		this.locales = {} as Record<keyof Locales, LocaleType>;

		const localeFiles = readdirSync(`${process.cwd()}/../i18n`);
		localeFiles.forEach(async localeFile => {
			const cleanName = localeFile.split('.');
			const name: Locales = cleanName[0];

			this.locales[name] = await import(`${process.cwd()}/i18n/${localeFile}`);
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get(localeString: LocaleStrings, variables: Record<string, any>): LocaleType[LocaleStrings] {
		// not implemented
		return 'META_ABOUT_TITLE';
	}
}