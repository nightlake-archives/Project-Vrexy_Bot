import { readdirSync } from 'fs';
import { Locales, LocaleStrings, LocaleType } from 'src/types/Locale.type';

export default class LocaleManager {
	locales: Record<keyof Locales, LocaleType>;

	constructor() {
		this.locales = {} as Record<keyof Locales, LocaleType>;

		const localeFiles = readdirSync(`${process.cwd()}/i18n`).filter((file: string) => file.endsWith('.json'));
		localeFiles.forEach(async localeFile => {
			const name = localeFile.split('.')[0];

			this.locales[name as keyof Locales] = await import(`${process.cwd()}/i18n/${localeFile}`);
		});
	}

	get(locale: keyof Locales, localeString: LocaleStrings, variables: Record<string, unknown> = {}): LocaleType[LocaleStrings] {
		const loc = this.locales[locale as keyof Locales] ?? this.locales['en-US' as keyof Locales];
		let translatedString = loc[localeString];

		for (const [key, value] of Object.entries(variables)) {
			translatedString = translatedString.replaceAll(`{${key}}`, value.toString());
		}

		return translatedString;
	}
}